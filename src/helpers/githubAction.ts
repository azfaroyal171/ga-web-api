import fetch from 'node-fetch';

const generateUrl = ({
  workflowId,
  repoOwner,
  repoName,
}: {
  workflowId: string;
  repoOwner: string;
  repoName: string;
}) => {
  return `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowId}/dispatches`;
};

type Props = {
  workflowId: string;
  inputs?: Record<string, string>;
  ref?: string;
  repoOwner: string;
  repoName: string;
  token: string;
};

export const trigger = async ({
  workflowId,
  repoOwner,
  repoName,
  token,
  inputs,
  ref = 'main',
}: Props) => {
  const res = await fetch(generateUrl({workflowId, repoOwner, repoName}), {
    method: 'POST',
    body: JSON.stringify({
      ref,
      ...(inputs ? {inputs} : {}),
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json"',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (res.status >= 400 && res.status <= 599) {
    console.log(await res.json());

    throw new Error('Failed to send email');
  }
};
