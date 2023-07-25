import {
  Event,
  isAdminAddsDoughInventoryEvent,
  isAdminAddsToppingInventoryEvent,
  isAdminAdjustsDoughPriceEvent,
  isAdminAdjustsToppingPriceEvent,
  isAdminCreatesToppingEvent,
  isNewUserConnectedEvent,
  isUserAddsPizzaEvent,
  isUserAddsToppingEvent,
  isUserRemovesPizzaEvent,
  isUserRemovesToppingEvent,
} from '@event-sourced-pizza/events';

export interface AppState {
  users: {
    [userId: string]: { [pizzaId: string]: { [toppingId: string]: boolean } };
  };
  toppings: {
    [toppingId: string]: { name: string; price: number; inventory: number };
  };
  dough: { price: number; inventory: number };
}

export const initialAppState: AppState = {
  users: {},
  toppings: {},
  dough: { price: 0, inventory: 0 },
};

export const appReducer = (
  state: AppState = initialAppState,
  event: Event
): AppState => {
  if (isNewUserConnectedEvent(event)) {
    const { userId } = event;
    return {
      ...state,
      users: {
        ...state.users,
        [userId]: {},
      },
    };
  } else if (isUserAddsPizzaEvent(event)) {
    const { userId, pizzaId } = event;
    return {
      ...state,
      users: {
        ...state.users,
        [userId]: {
          ...state.users[userId],
          [pizzaId]: {},
        },
      },
    };
  } else if (isUserRemovesPizzaEvent(event)) {
    const { userId, pizzaId } = event;
    const { [pizzaId]: _, ...rest } = state.users[userId];
    return {
      ...state,
      users: {
        ...state.users,
        [userId]: rest,
      },
    };
  } else if (isUserAddsToppingEvent(event)) {
    const { userId, pizzaId, toppingId } = event;
    return {
      ...state,
      users: {
        ...state.users,
        [userId]: {
          ...state.users[userId],
          [pizzaId]: {
            ...state.users[userId][pizzaId],
            [toppingId]: true,
          },
        },
      },
    };
  } else if (isUserRemovesToppingEvent(event)) {
    const { userId, pizzaId, toppingId } = event;
    const { [toppingId]: _, ...rest } = state.users[userId][pizzaId];
    return {
      ...state,
      users: {
        ...state.users,
        [userId]: {
          ...state.users[userId],
          [pizzaId]: rest,
        },
      },
    };
  } else if (isAdminCreatesToppingEvent(event)) {
    const { toppingId, toppingName, toppingPrice, count } = event;
    return {
      ...state,
      toppings: {
        ...state.toppings,
        [toppingId]: {
          name: toppingName,
          price: toppingPrice,
          inventory: count,
        },
      },
    };
  } else if (isAdminAddsToppingInventoryEvent(event)) {
    const { toppingId, count } = event;
    return {
      ...state,
      toppings: {
        ...state.toppings,
        [toppingId]: {
          ...state.toppings[toppingId],
          inventory: state.toppings[toppingId].inventory + count,
        },
      },
    };
  } else if (isAdminAddsDoughInventoryEvent(event)) {
    const { count } = event;
    return {
      ...state,
      dough: {
        ...state.dough,
        inventory: state.dough.inventory + count,
      },
    };
  } else if (isAdminAdjustsToppingPriceEvent(event)) {
    const { toppingId, newPrice } = event;
    return {
      ...state,
      toppings: {
        ...state.toppings,
        [toppingId]: {
          ...state.toppings[toppingId],
          price: newPrice,
        },
      },
    };
  } else if (isAdminAdjustsDoughPriceEvent(event)) {
    const { newPrice } = event;
    return {
      ...state,
      dough: {
        ...state.dough,
        price: newPrice,
      },
    };
  }
  return state;
};

export function selectDoughPrice(state: AppState) {
  return state.dough.price;
}

export function selectRemainingDoughInventory(state: AppState) {
  let inUseCount = 0;
  const users = Object.values(state.users);
  for (const user of users) {
    inUseCount += Object.values(user).length;
  }
}
