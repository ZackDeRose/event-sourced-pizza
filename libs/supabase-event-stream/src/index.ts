import { Event } from '@event-sourced-pizza/events';
import { createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

const supabase = createClient(
  'http://localhost:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
);

export function eventStream$(): Observable<Event> {
  return new Observable<Event>((subscriber) => {
    supabase
      .from('events')
      .select('*')
      .then((resp) => {
        console.log(resp);
        const data = resp.data;

        data
          ?.map((x) => x.payload)
          .forEach((event) => {
            subscriber.next(event);
          });
        const channelB = supabase
          .channel('table-db-changes')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'events',
            },
            (payload) => {
              // console.log(payload)
              const event = payload.new['payload'];
              subscriber.next(event);
            }
          )
          .subscribe();
      });
  });
}
