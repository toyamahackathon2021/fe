import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import { Button, Container, Row } from "react-bootstrap";

const Hint = () => {
  const state = useGeolocation();

  return (
    <Container>
      <Row>
        <h2>lat: {state.latitude}</h2>
        <h2>lon: {state.longitude}</h2>
      </Row>
    </Container>
  );
};

export default Hint;
