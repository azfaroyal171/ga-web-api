import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {trigger} from './helpers/githubAction';

const app: Express = express();
const port = 1026;

dotenv.config();
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.post('/trigger', async (req: Request, res: Response) => {
  const body = req.body;
  const workflowId: string = body.workflowId.toString();
  const inputs: Record<string, string> = JSON.parse(body.inputs);

  if (!workflowId || !inputs || !process.env.GITHUB_TOKEN) {
    res.status(400).send('Invalid request');
    return;
  }

  try {
    await trigger({
      workflowId,
      inputs,
      token: process.env.GITHUB_TOKEN,
    });
    res.send('Github Action triggered');
  } catch (error) {
    res.status(500).send('Error triggering Github Action');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
