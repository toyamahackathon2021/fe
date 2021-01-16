const host = "http://localhost:3000";
// const host = '.'
export const fetcher = (url: string) =>
  fetch(`${host}${url}`).then((r) => r.json());
