import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, Figure } from "react-bootstrap";

const style = `
.container {
  // background: url("/bg.png") no-repeat;
  background: #fff;
  margin: 20px;
 }
 .title {
   font-size: 20px;
 }
`

const Good = () => {
  return (
    <>
      <style>{style}</style>
      <Container className="container">
        <Row>
          <h1 className="title">おめでとう！</h1>
        </Row>
        <Row>
        <Figure>
          <Figure.Image
            width={90}
            height={90}
            alt="good"
            src="/kaizoku_takara.png"
          />
        </Figure>
        </Row>
        <Row>
          <p>富山城にたどり着いたね！</p>
        </Row>
        <Row>
          <p>
          今いるところは、富山城址公園の一角に建つ富山城。実はこの富山城、 戦国時代に築城されました。そう、現在にいたるまで、400年以上にわたる歴史があるのです。<br />
          <br />
          今見ている富山城の天守閣は、残念ながら戦災後(1954年)に建設されたものです。<br />
          <br />
          築城されてから現在に至るまでの歴史は、今あなたがいるところの横にある富山市郷土博物館で、模型や動画などで見ることができるよ。<br />
          <br />
          せっかく来たのだからよかったら立ち寄ってみてね。
          </p>
        </Row>
        <Button variant="outline-primary">戻る</Button>
      </Container>
    </>
  );
};

export default Good;