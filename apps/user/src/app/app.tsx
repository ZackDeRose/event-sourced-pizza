// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ClientState,
  createUserDataClient,
  initialClientState,
  selectPizzaPrice,
  selectTotalPrice,
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
  const [state, setState] = useState<ClientState>(initialClientState);
  useEffect(() => {
    getState().subscribe((state) => {
      setState(state);
    });
  }, []);
  return (
    <div>
      <TotalPrice />
      {(state.pizzas ? Object.keys(state.pizzas) : []).map((pizzaId) => (
        <Pizza pizzaId={pizzaId} />
      ))}
      <NewPizzaButton />
    </div>
  );
}

export function Pizza({ pizzaId }: { pizzaId: string }) {
  const [state, setState] = useState<ClientState>(initialClientState);
  useEffect(() => {
    getState().subscribe((state) => {
      setState(state);
    });
  }, []);
  return (
    <div>
      <h3>Pizza {pizzaId}</h3>
      <h4>Toppings</h4>
      <h4>Single Price: ${selectPizzaPrice(pizzaId)(state)}</h4>
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

export function TotalPrice() {
  const [state, setState] = useState<ClientState>(initialClientState);
  useEffect(() => {
    getState().subscribe((state) => {
      setState(state);
    });
  }, []);
  return <h2>Total Price: ${selectTotalPrice(state)}</h2>;
}

export default App;
