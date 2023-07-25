// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dispatch } from '@event-sourced-pizza/admin-dispatch-client';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import {
  adminAddsDoughInventoryEvent,
  adminAdjustsDoughPriceEvent,
  Event,
} from '@event-sourced-pizza/events';
import { createAdminDataClient } from '@event-sourced-pizza/admin-data-client';
import { useEffect, useRef, useState } from 'react';
import {
  AppState,
  selectDoughPrice,
  selectRemainingDoughInventory,
} from '@event-sourced-pizza/app-state';

export function App() {
  return (
    <div>
      <DoughInventory />
      <DoughPrice />
      <hr />
      <Ledger />
    </div>
  );
}
const { getEvents, getState, getStates } = createAdminDataClient();

function DoughInventory() {
  const [serverTotal, setServerTotal] = useState<number>(0);
  const [serverRemaining, setServerRemaining] = useState<number>(0);
  const [formValue, setFormValue] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    const sub = getState().subscribe((state) => {
      setServerTotal(state.dough.inventory);
      setServerRemaining(selectRemainingDoughInventory(state));
    });
    return () => sub.unsubscribe();
  }, [inputRef]);
  return (
    <form
      onSubmit={(event) => {
        dispatch(
          adminAddsDoughInventoryEvent({
            count: +(event.target as any).addDough.value,
          })
        );
        inputRef.current!.value = 0 as any;
      }}
    >
      <label htmlFor="serverTotal">Total Dough Inventory: </label>
      <span id="serverTotal">{serverTotal}</span>
      <br />
      <label htmlFor="serverRemaining">Remaining Dough: </label>
      <span id="serverRemaining">{serverRemaining}</span>
      <br />
      <label htmlFor="addDough">Add Dough: </label>
      <input
        type="number"
        id="addDough"
        ref={inputRef}
        onChange={(event) => {
          setFormValue(+event.target.value);
        }}
      />
      <button type="submit">Add Dough</button>
    </form>
  );
}

function DoughPrice() {
  const [serverDoughPrice, setServerDoughPrice] = useState<number | null>();
  const [formDoughPrice, setFormDoughPrice] = useState<number | null>();
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    const sub = getState().subscribe((state) => {
      const tempDoughPrice = selectDoughPrice(state);
      if (tempDoughPrice === serverDoughPrice) return;
      setServerDoughPrice(tempDoughPrice);
      inputRef.current!.value = tempDoughPrice as any;
    });
    return () => sub.unsubscribe();
  }, [inputRef, serverDoughPrice]);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const doughPrice = +event.target.doughPrice.value;
        dispatch(adminAdjustsDoughPriceEvent({ newPrice: doughPrice }));
      }}
    >
      <label htmlFor="doughPrice">Dough Price</label>
      <input
        type="number"
        id="doughPrice"
        ref={inputRef}
        onChange={(event) => {
          setFormDoughPrice(+event.target.value);
        }}
      />

      <button type="submit" disabled={formDoughPrice === serverDoughPrice}>
        Submit
      </button>
    </form>
  );
}

function Ledger() {
  const [events, setEvents] = useState<Event[]>([]);
  const [states, setStates] = useState<AppState[]>([]);
  useEffect(() => {
    const sub = getEvents().subscribe((events) => {
      setEvents(events);
    });
    return () => sub.unsubscribe();
  }, []);
  useEffect(() => {
    const sub = getStates().subscribe((states) => {
      setStates(states);
    });
    return () => sub.unsubscribe();
  }, []);
  const indexes = [];
  for (let i = 0; i < events.length; i++) {
    indexes.unshift(i);
  }
  return (
    <div className="p-2 border-4 border-blue-400 rounded-sm m-4">
      <h2 className="text-center text-3xl"> Ledger</h2>
      <div className="grid grid-cols-2">
        <h3 className="text-center text-xl">Event</h3>
        <h3 className="text-center text-xl">State</h3>
      </div>
      {indexes.map((index) => (
        <div key={index} className="grid grid-cols-2">
          <pre
            p-2
            className="border-4 border-gray-600 bg-gray-800 text-white font-mono rounded-sm m-4 p-4"
          >
            {JSON.stringify(events[index], null, 2)}
          </pre>
          <pre
            p-2
            className="border-4 border-gray-600 bg-gray-800 text-white font-mono rounded-sm m-4 p-4"
          >
            {JSON.stringify(states[index], null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}

export default App;
