// new user connects
export const newUserConnectedEventType = '[User] new user connected' as const;
export const newUserConnectedEvent = (userId: string) => ({
  type: newUserConnectedEventType,
  userId,
});
export type NewUserConnectedEvent = ReturnType<typeof newUserConnectedEvent>;
export const isNewUserConnectedEvent = (
  event: Event
): event is NewUserConnectedEvent => event.type === newUserConnectedEventType;

// user disconnects
export const userDisconnectedEventType = '[User] user disconnected' as const;
export const userDisconnectedEvent = (userId: string) => ({
  type: userDisconnectedEventType,
  userId,
});
export type UserDisconnectedEvent = ReturnType<typeof userDisconnectedEvent>;
export const isUserDisconnectedEvent = (
  event: Event
): event is UserDisconnectedEvent => event.type === userDisconnectedEventType;

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
export const isUserAddsPizzaEvent = (
  event: Event
): event is UserAddsPizzaEvent => event.type === userAddsPizzaEventType;

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
export const isUserRemovesPizzaEvent = (
  event: Event
): event is UserRemovesPizzaEvent => event.type === userRemovesPizzaEventType;

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
export const isUserAddsToppingEvent = (
  event: Event
): event is UserAddsToppingEvent => event.type === userAddsToppingEventType;

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
export const isUserRemovesToppingEvent = (
  event: Event
): event is UserRemovesToppingEvent =>
  event.type === userRemovesToppingEventType;

// admin creates a topping
export const adminCreatesToppingEventType = '[Admin] topping created' as const;
export const adminCreatesToppingEvent = ({
  toppingId,
  toppingName,
  toppingPrice,
  count,
}: {
  toppingId: string;
  toppingName: string;
  toppingPrice: number;
  count: number;
}) => ({
  type: adminCreatesToppingEventType,
  toppingId,
  toppingName,
  toppingPrice,
  count,
});
export type AdminCreatesToppingEvent = ReturnType<
  typeof adminCreatesToppingEvent
>;
export const isAdminCreatesToppingEvent = (
  event: Event
): event is AdminCreatesToppingEvent =>
  event.type === adminCreatesToppingEventType;

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
export const isAdminAddsToppingInventoryEvent = (
  event: Event
): event is AdminAddsToppingInventoryEvent =>
  event.type === adminAddsToppingInventoryEventType;

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
export const isAdminAddsDoughInventoryEvent = (
  event: Event
): event is AdminAddsDoughInventoryEvent =>
  event.type === adminAddsDoughInventoryEventType;

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
export const isAdminAdjustsToppingPriceEvent = (
  event: Event
): event is AdminAdjustsToppingPriceEvent =>
  event.type === adminAdjustsToppingPriceEventType;

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
export const isAdminAdjustsDoughPriceEvent = (
  event: Event
): event is AdminAdjustsDoughPriceEvent =>
  event.type === adminAdjustsDoughPriceEventType;

// export user events
export type UserEvent =
  | NewUserConnectedEvent
  | UserDisconnectedEvent
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
  | UserDisconnectedEvent
  | UserAddsPizzaEvent
  | UserRemovesPizzaEvent
  | UserAddsToppingEvent
  | UserRemovesToppingEvent
  | AdminCreatesToppingEvent
  | AdminAddsToppingInventoryEvent
  | AdminAddsDoughInventoryEvent
  | AdminAdjustsToppingPriceEvent
  | AdminAdjustsDoughPriceEvent;
