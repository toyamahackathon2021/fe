import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
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
  background-image: url("/bg.png");
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px;
 }
 .title {
   font-size: 20px;
   font-weight: bold;
  }
 .center {
   text-align: center;
 }
 .thumnail {
   margin: 0 auto;
 }
 p {
   text-align: left;
 }
`;

const Good = () => {
  const router = useRouter();
  return (
    <>
      <style>{style}</style>
      <div className="wrapper">
        <Container>
          <br/>
          <Row className="">
            <Col md="auto" className="center">
              <h1 className="title">おめでとう！</h1>
            </Col>
          </Row>
          <Row>
            <Image
              width={90}
              height={90}
              alt="good"
              src="/kaizoku_takara.png"
              className="thumnail"
            />
          </Row>
          <Row>
            <Col md="auto" className="center">
              <h4 className="title">富山城にたどり着いたね！</h4>
            </Col>
          </Row>
          <Row>
            <Col md="auto" className="center">
              <p>
                今いるところは、富山城址公園の一角に建つ富山城。実はこの富山城、
                戦国時代に築城されました。そう、現在にいたるまで、400年以上にわたる歴史があるのです。
                <br />
                <br />
                今見ている富山城の天守閣は、残念ながら戦災後(1954年)に建設されたものです。
                <br />
                <br />
                築城されてから現在に至るまでの歴史は、今あなたがいるところの横にある富山市郷土博物館で、模型や動画などで見ることができるよ。
                <br />
                <br />
                せっかく来たのだからよかったら立ち寄ってみてね。
              </p>
            </Col>
          </Row>
          <Button
            variant="link"
            onClick={() => {
              router.push("/");
            }}
          >
            戻る
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Good;
