import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Figure } from "react-bootstrap";

const Bad = () => {
  return (
    <Container>
      <Row>
        <h1>残念！</h1>
      </Row>
      <Figure>
        <Figure.Image
          width={90}
          height={90}
          alt="bad"
          src="/kaizoku_mark.png"
        />
      </Figure>
      <Row>
        <h1>写真をもう一度確認してみよう！</h1>
      </Row>
      <Row>
        <Button variant="warning">もう一度送る</Button>
      </Row>
      <Row>
        <Button variant="outline-primary">戻る</Button>
      </Row>
    </Container>
  );
};

export default Bad;
