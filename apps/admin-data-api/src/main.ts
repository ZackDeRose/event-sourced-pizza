import { eventStream$ } from '@event-sourced-pizza/supabase-event-stream';
// import { eventStream$ } from '@event-sourced-pizza/redis-event-stream';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { scan, shareReplay, startWith } from 'rxjs';
import { appReducer, initialAppState } from '@event-sourced-pizza/app-state';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();
const httpServer = createServer(app);

const socketServer = new Server(httpServer, {
  cors: { origin: true },
});
app.use(
  cors({
    origin: true,
  })
);

socketServer.on('connection', (socket) => {
  console.log('admin connected');
  const events$ = eventStream$().pipe(shareReplay());
  const state$ = events$.pipe(
    scan(appReducer, initialAppState),
    startWith(initialAppState)
  );
  events$.subscribe((event) => {
    socket.emit('event', event);
  });
  state$.subscribe((state) => {
    socket.emit('state', state);
  });
});

httpServer.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
