export * from './lib/user-data-client';
import { AppState, initialAppState } from '@event-sourced-pizza/app-state';
import { Event } from '@event-sourced-pizza/events';
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
