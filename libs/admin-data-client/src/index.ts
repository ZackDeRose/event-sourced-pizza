import { AppState, initialAppState } from '@event-sourced-pizza/app-state';
import { Event } from '@event-sourced-pizza/events';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');
const events$ = new BehaviorSubject<Event[]>([
  { type: 'store startup' } as any,
]);
const states$ = new BehaviorSubject<AppState[]>([]);
const state$ = new BehaviorSubject<AppState>(initialAppState);
socket.connect();
socket.on('event', (event) => {
  console.log('event', event);
  events$.next([...events$.value, event]);
});
socket.on('state', (state) => {
  console.log('state', state);
  states$.next([...states$.value, state]);
  state$.next(state);
});

export const createAdminDataClient = () => {
  return {
    getEvents() {
      return events$;
    },
    getState() {
      return state$;
    },
    getStates() {
      return states$;
    },
  };
};
