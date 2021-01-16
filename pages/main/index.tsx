
import useSWR from 'swr';
import { fetcher } from '../../services/fetcher';

const Main= () => {
  const { data, error } = useSWR('/api/images?name=buri', fetcher);
  console.log(data)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
  <>
    <h1>ブリ キャッシング Main</h1>
    <h1>{JSON.stringify(data)}</h1>
  </>
  )
}

export default Main
