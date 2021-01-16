import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import { Button, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

const Hint = () => {
  const state = useGeolocation();
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <Row>
        <h1>id: {id}</h1>
      </Row>
      <Row>
        <h2>lat: {state.latitude}</h2>
        <h2>lon: {state.longitude}</h2>
      </Row>
      <Row>
        <Link href="/good">
          <Button variant="primary">
            <a>正解画面遷移</a>
          </Button>
        </Link>
        <Link href="/bad">
          <Button variant="primary">
            <a>失敗画面遷移</a>
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Hint;
