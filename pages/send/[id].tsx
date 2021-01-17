import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { Container, Col, Row, Button, Image } from "react-bootstrap";
import Webcam from "react-webcam";
import useSWR from "swr";
import { post } from "../../services/fetcher";

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
 }
`;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const Send = () => {
  const router = useRouter();
  const { id } = router.query;

  const webcamRef = useRef<Webcam | null>(null);

  const [cameraFlag, setCameraFlag] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data } = useSWR<any>(imageUrl, post);

  const capture = React.useCallback(() => {
    if (webcamRef.current === null) {
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    setImageUrl(imageSrc);
    // router.push(`/good/${id}`);
    // console.log(imageSrc);
  }, [webcamRef, setImageUrl]);

  console.log(data);

  return (
    <>
      <style>{style}</style>
      <div className="wrapper">
        <Container>
          <Row>
            <Col md="auto" className="center">
              <h1 className="title">
                写真を送信して
                <br />
                宝箱を開けよう！
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md="auto" className="center">
              <Image
                width={90}
                height={90}
                alt="takarabako"
                src="/kaizoku_takarabako.png"
              />
            </Col>
          </Row>
          {!cameraFlag ? (
            <Row>
              <Col md="auto" className="center">
                <Button variant="warning" onClick={() => setCameraFlag(true)}>
                  写真を撮る
                </Button>
              </Col>
            </Row>
          ) : (
            <>
              <Row>
                <Button variant="warning" onClick={capture}>
                  写真を送信する
                </Button>
              </Row>
              <Row>
                <Webcam
                  audio={false}
                  height={400}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                  videoConstraints={videoConstraints}
                />
              </Row>
            </>
          )}
          {data && (
            <Button
              variant="primary"
              onClick={() => {
                router.push(`/good/${id}`);
              }}
            >
              正解に進む
            </Button>
          )}
          {/* {data && data.predictions.map((p: any) => <p>P:{p.probability}</p>)} */}
          <Row>{data && JSON.stringify(data)}</Row>
          <br />
          <Row>
            <Col md="auto" className="center">
              <Button
                variant="outline-primary"
                onClick={() => {
                  router.back();
                }}
              >
                戻る
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Send;
