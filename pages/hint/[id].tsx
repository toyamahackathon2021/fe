import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import {
  Button,
  Container,
  Col,
  ListGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { distm } from "../../services/geo";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { GoalResponse } from "../../interfaces/goalResponse";
import React from "react";
import { reverse } from "lodash";

const style = `
* {
  text-align: center;
}
.container {
//   background-color: #fff;
//   padding: 10px;
padding-top: 50px;
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
 .navWrapper {
  text-align: left;
  background-color: #291F16;
  color: #fff;
 }
 .navText {
   font-size: 1.4rem;
 }
 .hintWrapper {
  margin-top: 10px;
  padding: 20px;
  background-color: #291F16;
 }
 .hintListWrapper {
  margin: 0 auto 20px;
  padding: 20px;
  background-color: #291F16;
  position: relative;
 }
 .hintListWrapper:after {
  content: "";
  width: 4px;
  height: 30px;
  position: absolute;
  left: 50%;
  bottom: -30px;
  background-color: #291F16;
 }
 .hintItem {
  background-color: #291F16;
  color: #fff;
  border: none;
 }
`;
const Hint = () => {
  const state = useGeolocation();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<GoalResponse[]>(`/api/goal?id=${id}`, fetcher);
  const { latitude, longitude } = state;
  const currentPoint =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  if (!data) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;

  console.log(data);
  const quest = data[0];
  const questData = quest.data;
  const goalPoint = { lat: questData.lat, lng: questData.lng };
  const dist = distm(currentPoint, goalPoint);

  return (
    <>
      <style>{style}</style>
      <div className="wrapper">
        <Container>
          <Navbar fixed="top" className="navWrapper">
            Mission
            <br />
            {questData.mission_title}
          </Navbar>
          {reverse(questData.hints).map((h, idx) => {
            const length = questData.hints.length;

            if (idx === length - 1) {
              return (
                <Row className="hintWrapper">
                  <Col md="auto" className="center">
                    <Button variant={"warning"} size="lg" block>
                      ヒント1を見る
                    </Button>
                  </Col>
                </Row>
              );
            }

            const isInGeoFence = dist && dist <= h.trigger.dist ? true : false;

            return (
              <Row>
                <ListGroup
                  horizontal={true}
                  className="my-2 hintListWrapper"
                  key={idx}
                >
                  <ListGroup.Item className="hintItem">
                    <Button
                      variant={isInGeoFence ? "warning" : "secondary"}
                      active={isInGeoFence}
                    >
                      ヒント{length - idx}を見る
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item className="hintItem">
                    宝まで
                    <br />
                    {h.trigger.dist}m<br />
                    以内で開放
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            );
          })}
          {/* {questData.hints.map((h) => (
        <Row>
          <h3>{h.name}</h3>
          <p>トリガー: {h.trigger.dist}</p>
          <h2>
            範囲内判定: {dist && dist <= h.trigger.dist ? "範囲内" : "範囲外"}
          </h2>
        </Row>
      ))} */}
          {/* <Row>
        <Link href={`/send/${id}`}>
          <Button variant="primary">
            <a>写真送信</a>
          </Button>
        </Link>
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
      <Row>
        {currentPoint && (
          <>
            <h2>lat: {currentPoint.lat}</h2>
            <h2>lon: {currentPoint.lng}</h2>
            <h2>距離: {dist}m</h2>
          </>
        )}
      </Row> */}
        </Container>
      </div>
    </>
  );
};

export default Hint;
