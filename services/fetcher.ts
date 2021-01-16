const host = "http://localhost:3000";
// const host = 'https://toyama-fe.vercel.app/'
export const fetcher = (url: string) =>
  fetch(`${host}${url}`).then((r) => r.json());
