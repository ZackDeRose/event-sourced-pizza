import { UserEvent } from '@event-sourced-pizza/events';

export async function dispatch(event: UserEvent) {
  fetch('http://localhost:3003/dispatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}
