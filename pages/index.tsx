import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useGeolocation } from "react-use";

const IndexPage = () => {
  const state = useGeolocation();

  return (
    <>
      <h1>ブリ キャッシング</h1>
      <Link href="/main">
        <Button variant="primary">
          <a>ブリ main</a>
        </Button>
      </Link>
      <Link href="/goal">
        <Button variant="primary">
          <a>ブリ goal</a>
        </Button>
      </Link>
      <h2>lat: {state.latitude}</h2>
      <h2>lon: {state.longitude}</h2>
    </>
  );
};

export default IndexPage;
