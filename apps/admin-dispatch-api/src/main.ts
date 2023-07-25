import { dispatch } from '@event-sourced-pizza/supabase-dispatcher';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/dispatch', (req, res) => {
  const event = req.body;
  dispatch(event).then((x) => {
    console.log(x);
    res.send('ok');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
