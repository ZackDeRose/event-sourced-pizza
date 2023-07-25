// new user connects
export const newUserConnectedEventType = '[User] new user connected' as const;
export const newUserConnectedEvent = (userId: string) => ({
  type: newUserConnectedEventType,
  userId,
});
export type NewUserConnectedEvent = ReturnType<typeof newUserConnectedEvent>;

// user adds a pizza
export const userAddsPizzaEventType = '[User] pizza added' as const;
export const userAddsPizzaEvent = ({
  userId,
  pizzaId,
}: {
  userId: string;
  pizzaId: string;
}) => ({
  type: userAddsPizzaEventType,
  userId,
  pizzaId,
});
export type UserAddsPizzaEvent = ReturnType<typeof userAddsPizzaEvent>;

// user removes a pizza
export const userRemovesPizzaEventType = '[User] pizza removed' as const;
export const userRemovesPizzaEvent = ({
  userId,
  pizzaId,
}: {
  userId: string;
  pizzaId: string;
}) => ({
  type: userRemovesPizzaEventType,
  userId,
  pizzaId,
});
export type UserRemovesPizzaEvent = ReturnType<typeof userRemovesPizzaEvent>;

// user adds a topping
export const userAddsToppingEventType =
  '[User] topping added to pizza' as const;
export const userAddsToppingEvent = ({
  userId,
  pizzaId,
  toppingId,
}: {
  userId: string;
  pizzaId: string;
  toppingId: string;
}) => ({
  type: userAddsToppingEventType,
  userId,
  pizzaId,
  toppingId,
});
export type UserAddsToppingEvent = ReturnType<typeof userAddsToppingEvent>;

// user removes a topping
export const userRemovesToppingEventType =
  '[User] topping removed from pizza' as const;
export const userRemovesToppingEvent = ({
  userId,
  pizzaId,
  toppingId,
}: {
  userId: string;
  pizzaId: string;
  toppingId: string;
}) => ({
  type: userRemovesToppingEventType,
  userId,
  pizzaId,
  toppingId,
});
export type UserRemovesToppingEvent = ReturnType<
  typeof userRemovesToppingEvent
>;

// admin creates a topping
export const adminCreatesToppingEventType = '[Admin] topping created' as const;
export const adminCreatesToppingEvent = ({
  toppingId,
  toppingName,
  toppingPrice,
}: {
  toppingId: string;
  toppingName: string;
  toppingPrice: number;
}) => ({
  type: adminCreatesToppingEvent,
  toppingId,
  toppingName,
  toppingPrice,
});
export type AdminCreatesToppingEvent = ReturnType<
  typeof adminCreatesToppingEvent
>;

// admin adds topping inventory
export const adminAddsToppingInventoryEventType =
  '[Admin] topping inventory added' as const;
export const adminAddsToppingInventoryEvent = ({
  toppingId,
  count,
}: {
  toppingId: string;
  count: number;
}) => ({
  type: adminAddsToppingInventoryEventType,
  toppingId,
  count,
});
export type AdminAddsToppingInventoryEvent = ReturnType<
  typeof adminAddsToppingInventoryEvent
>;

// admin adds dough to inventory
export const adminAddsDoughInventoryEventType =
  '[Admin] dough inventory added' as const;
export const adminAddsDoughInventoryEvent = ({ count }: { count: number }) => ({
  type: adminAddsDoughInventoryEventType,
  count,
});
export type AdminAddsDoughInventoryEvent = ReturnType<
  typeof adminAddsDoughInventoryEvent
>;

// admin adjusts topping price
export const adminAdjustsToppingPriceEventType =
  '[Admin] topping price adjusted' as const;
export const adminAdjustsToppingPriceEvent = ({
  toppingId,
  newPrice,
}: {
  toppingId: string;
  newPrice: number;
}) => ({
  type: adminAdjustsToppingPriceEventType,
  toppingId,
  newPrice,
});
export type AdminAdjustsToppingPriceEvent = ReturnType<
  typeof adminAdjustsToppingPriceEvent
>;

// admin adjusts dough price
export const adminAdjustsDoughPriceEventType =
  '[Admin] dough price adjusted' as const;
export const adminAdjustsDoughPriceEvent = ({
  newPrice,
}: {
  newPrice: number;
}) => ({
  type: adminAdjustsDoughPriceEventType,
  newPrice,
});
export type AdminAdjustsDoughPriceEvent = ReturnType<
  typeof adminAdjustsDoughPriceEvent
>;

// export user events
export type UserEvent =
  | NewUserConnectedEvent
  | UserAddsPizzaEvent
  | UserRemovesPizzaEvent
  | UserAddsToppingEvent
  | UserRemovesToppingEvent;

// export admin events
export type AdminEvent =
  | AdminCreatesToppingEvent
  | AdminAddsToppingInventoryEvent
  | AdminAddsDoughInventoryEvent
  | AdminAdjustsToppingPriceEvent
  | AdminAdjustsDoughPriceEvent;

// export union of all events
export type Event =
  | NewUserConnectedEvent
  | UserAddsPizzaEvent
  | UserRemovesPizzaEvent
  | UserAddsToppingEvent
  | UserRemovesToppingEvent
  | AdminCreatesToppingEvent
  | AdminAddsToppingInventoryEvent
  | AdminAddsDoughInventoryEvent
  | AdminAdjustsToppingPriceEvent
  | AdminAdjustsDoughPriceEvent;
