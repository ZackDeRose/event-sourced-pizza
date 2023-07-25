// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ClientState,
  createUserDataClient,
  initialClientState,
} from '@event-sourced-pizza/user-data-client';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import { useEffect, useState } from 'react';
import { dispatch } from '@event-sourced-pizza/user-dispatch-client';
import {
  newUserConnectedEvent,
  userAddsPizzaEvent,
  userDisconnectedEvent,
} from '@event-sourced-pizza/events';
import { initialAppState } from '@event-sourced-pizza/app-state';
import { Observable } from 'rxjs';

const userId = window.crypto.randomUUID();
window.addEventListener('beforeunload', () => {
  dispatch(userDisconnectedEvent(userId));
});
let getState: () => Observable<ClientState>;
dispatch(newUserConnectedEvent(userId)).then(() => {
  const client = createUserDataClient(userId);
  getState = client.getState;
});

export function App() {
  useEffect(() => {
    getState().subscribe((state) => {
      console.log(state);
    });
  }, []);
  return (
    <div>
      <NewPizzaButton />
    </div>
  );
}

export function NewPizzaButton() {
  const [state, setState] = useState<ClientState>(initialClientState);
  useEffect(() => {
    getState().subscribe((state) => {
      setState(state);
    });
  }, []);
  return (
    <button
      onClick={() => {
        const pizzaId = window.crypto.randomUUID();
        dispatch(userAddsPizzaEvent({ userId, pizzaId }));
      }}
      disabled={state.remainingDough === 0}
    >
      New Pizza
    </button>
  );
}

export default App;
