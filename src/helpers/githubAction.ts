import fetch from 'node-fetch';

const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ACTION_ENDPOINT = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows`;

const generateUrl = (workflowId: string) => {
  return `${GITHUB_ACTION_ENDPOINT}/${workflowId}/dispatches`;
};

type Props = {
  workflowId: string;
  token: string;
  inputs?: Record<string, string>;
  ref?: string;
};

export const trigger = async ({workflowId, inputs, ref = 'main'}: Props) => {
  await fetch(generateUrl(workflowId), {
    method: 'POST',
    body: JSON.stringify({
      ref,
      ...(inputs ? inputs : {}),
    }),
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json"',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
};
