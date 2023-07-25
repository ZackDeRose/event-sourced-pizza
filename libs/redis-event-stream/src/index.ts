import { Event } from '@event-sourced-pizza/events';
import { commandOptions, createClient } from 'redis';
import { Observable, Observer, shareReplay } from 'rxjs';

export const eventStream$ = (replayMessages = true) =>
  new Observable<Event>((async (observer: Observer<Event>) => {
    const redis = createClient({
      socket: {
        host: 'localhost',
        port: 6379,
      },
    });
    await redis.connect();
    let currentId = '0-0';
    const response = await redis.xRead(
      commandOptions({
        isolated: true,
      }),
      [
        // XREAD can read from multiple streams, starting at a
        // different ID for each...
        {
          key: 'event-store',
          id: currentId,
        },
      ],
      {
        // Read 1 entry at a time, block for 5 seconds if there are none.
        COUNT: 1,
        BLOCK: 5000,
      }
    );

    if (response) {
      // Response is an array of streams, each containing an array of
      // entries:
      // [
      //   {
      //     "name": "mystream",
      //     "messages": [
      //       {
      //         "id": "1642088708425-0",
      //         "message": {
      //           "num": "999"
      //         }
      //       }
      //     ]
      //   }
      // ]
      console.log(JSON.stringify(response));

      // Get the ID of the first (only) entry returned.
      currentId = response[0].messages[0].id;
      console.log(currentId);
      for (const entry of response) {
        for (const message of entry.messages) {
          observer.next(message.message as Event);
        }
      }
    } else {
      // Response is null, we have read everything that is
      // in the stream right now...
      console.log('No new stream entries.');
    }
  }) as any);

export function readEventStream$(): Observable<Event> {
  return eventStream$().pipe(shareReplay());
}

// export function listenForEvent(
//   predicate: (event: Event) => boolean
// ): Promise<Event> {
//   return new Promise((resolve) => {
//     eventStream$().subscribe((event) => {
//       if (predicate(event.message)) {
//         resolve(event.message);
//       }
//     });
//   });
// }
