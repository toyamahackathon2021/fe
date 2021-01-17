import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Button, Image } from "react-bootstrap";

const style = `
* {
  text-align: center;
}
.container {
  background-color: #fff;
  padding: 10px;
 }
 .wrapper {
  height: 100vh;
  padding: 20px;
  background-image: url("/bg.png");
  background-color: rgba(0, 0, 0, 0.2);
 }
 .title {
  font-size: 20px;
  font-weight: bold;
 }
`

const Bad = () => {
  return (
    <>
      <style>{style}</style>
      <div className="wrapper">
      <Container>
        <br/>
        <Row>
          <Col md="auto" className="center">
            <h1 className="title">残念！</h1>
          </Col>
        </Row>
          <Col md="auto" className="center">
            <Image
              width={107}
              height={91}
              alt="bad"
              src="/kaizoku_mark.png"
            />
          </Col>
        <Row>
          <Col md="auto" className="center">
            <p>写真をもう一度確認してみよう！</p>
          </Col>
        </Row>
        <Row>
          <Col md="auto" className="center">
            <Button variant="warning">もう一度送る</Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md="auto" className="center">
            <Button variant="link">戻る</Button>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default Bad;
