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
  const repoOwner = process.env.REPO_OWNER;
  const repoName = process.env.REPO_NAME;
  const token = process.env.GITHUB_TOKEN;

  const body = req.body;

  if (!body || !repoOwner || !repoName || !token) {
    res.status(400).send('Invalid request');
    return;
  }

  try {
    await trigger({
      workflowId: body.workflowId,
      inputs: body.inputs,
      repoOwner,
      repoName,
      token,
    });

    res.send('Github Action triggered');
  } catch (error) {
    res.status(500).send('Error triggering Github Action');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
