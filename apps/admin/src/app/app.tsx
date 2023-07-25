// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dispatch } from '@event-sourced-pizza/admin-dispatch-client';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import { adminAdjustsDoughPriceEvent } from '@event-sourced-pizza/events';

export function App() {
  return (
    <div>
      <DoughPrice />
    </div>
  );
}

function DoughPrice() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const doughPrice = event.target.doughPrice.value;
        console.log(doughPrice);
        dispatch(adminAdjustsDoughPriceEvent({ newPrice: doughPrice }));
      }}
    >
      <label htmlFor="doughPrice">Dough Price</label>
      <input type="number" id="doughPrice" />
      <button type="submit">Submit</button>
    </form>
  );
}
export default App;
