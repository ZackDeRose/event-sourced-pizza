import { AdminEvent } from '@event-sourced-pizza/events';

export async function dispatch(event: AdminEvent) {
  fetch('http://localhost:3000/dispatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}
