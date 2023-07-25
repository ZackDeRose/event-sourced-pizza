import {
  appReducer,
  initialAppState,
  selectDoughPrice,
  selectRemainingDoughInventory,
  selectRemainingToppingInventory,
  selectUserPizzas,
  selectUserToppingData,
} from '@event-sourced-pizza/app-state';
import { eventStream$ } from '@event-sourced-pizza/supabase-event-stream';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { map, scan, shareReplay, startWith } from 'rxjs';
import { Server } from 'socket.io';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3002;

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

const events$ = eventStream$().pipe(shareReplay());
const state$ = events$.pipe(
  scan(appReducer, initialAppState),
  startWith(initialAppState),
  shareReplay(1)
);

socketServer.on('connection', (socket) => {
  socket.on('user id', (userId) => {
    const userState$ = state$.pipe(
      map((state) => {
        return {
          pizzas: selectUserPizzas(userId)(state),
          remainingToppings: selectRemainingToppingInventory(state),
          toppingData: selectUserToppingData(state),
          doughPrice: selectDoughPrice(state),
          remainingDough: selectRemainingDoughInventory(state),
        };
      })
    );
    userState$.subscribe((state) => {
      socket.emit('state', state);
    });
  });
});

httpServer.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
