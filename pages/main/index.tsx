import useSWR from "swr";
import { fetcher } from "../../services/fetcher";

const Main = () => {
  return (
    <>
      <h1>ブリ キャッシング Main</h1>
      <h1>{JSON.stringify(data)}</h1>
    </>
  );
};

export default Main;
