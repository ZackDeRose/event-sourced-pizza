import { dispatch } from '@event-sourced-pizza/supabase-dispatcher';
// import { dispatch } from '@event-sourced-pizza/redis-dispatcher';
const express = require('express');
const cors = require('cors');

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3003;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/dispatch', (req, res) => {
  const event = req.body;
  dispatch(event).then((x) => {
    console.log('user message dispatched', x);
    res.send('ok');
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
