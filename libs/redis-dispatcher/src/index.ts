import { Event } from '@event-sourced-pizza/events';
import { createClient } from 'redis';

const redis = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});
redis.connect();

export function dispatch(event: Event) {
  redis.xAdd('event-store' as any, '*', event as any, {
    TRIM: { strategy: 'MAXLEN', strategyModifier: '~', threshold: 100 },
  });
}
