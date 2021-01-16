import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import { Button, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";

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
    </Container>
  );
};

export default Hint;
