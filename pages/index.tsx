import Link from 'next/link'
import {useGeolocation} from 'react-use'

const IndexPage = () => {
  const state = useGeolocation();

  return (
  <>
    <h1>ブリ キャッシング</h1>
      <Link href="/main">
        <a>ブリ main</a>
      </Link>
      <Link href="/goal">
        <a>ブリ goal</a>
      </Link>
      <h2>
        lat: {state.latitude}
      </h2>
      <h2>
        lon: {state.longitude}
      </h2>
  </>
  )
}

export default IndexPage
