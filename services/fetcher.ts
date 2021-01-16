const getHost = (): string => {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    return "https://toyama-fe.vercel.app/";
  }
  return "http://localhost:3000";
};

export const fetcher = (url: string) => {
  const host = getHost();
  return fetch(`${host}${url}`).then((r) => r.json());
};
