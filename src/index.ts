import express, {Express} from 'express';

const app: Express = express();
const port = 1026;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
