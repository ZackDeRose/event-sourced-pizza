export * from './lib/user-data-client';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

export interface ClientState {
  pizzas: {
    [pizzaId: string]: {
      [toppingId: string]: boolean;
    };
  };
  remainingToppings: {
    [toppingId: string]: number;
  };
  toppingData: {
    [toppingId: string]: {
      name: string;
      id: string;
      price: number;
    };
  };
  doughPrice: number;
  remainingDough: number;
}

export const initialClientState: ClientState = {
  pizzas: {},
  remainingToppings: {},
  toppingData: {},
  doughPrice: 0,
  remainingDough: 0,
};

export const selectPizzaPrice = (pizzaId: string) => (state: ClientState) => {
  if (!state.pizzas) {
    return 0;
  }
  const pizza = state.pizzas[pizzaId];
  if (!pizza) {
    return 0;
  }
  let price = state.doughPrice;
  for (const [toppingId, isPresent] of Object.entries(pizza)) {
    if (isPresent) {
      const toppingPrice = state.toppingData[toppingId].price;
      price += toppingPrice;
    }
  }
  console.log('price', price);
  return price;
};

export const selectTotalPrice = (state: ClientState) => {
  if (!state.pizzas) {
    return 0;
  }
  const pizzaIds = Object.keys(state.pizzas);
  return pizzaIds
    .map((id) => selectPizzaPrice(id)(state))
    .reduce((a, b) => a + b, 0);
};

const socket = io('http://localhost:3002');
const state$ = new BehaviorSubject<ClientState>(initialClientState);
socket.connect();
socket.on('state', (state) => {
  state$.next(state);
});
let initialized = false;

export const createUserDataClient = (userId: string) => {
  if (!initialized) {
    socket.emit('user id', userId);
    initialized = true;
  }
  return {
    getState() {
      return state$;
    },
  };
};

export const selectToppings = (state: ClientState) => {
  return state.toppingData;
};

export const selectRemainingToppings = (state: ClientState) => {
  return state.remainingToppings;
};
