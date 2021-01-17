import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import {
  Button,
  Container,
  Col,
  Image,
  ListGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { distm } from "../../services/geo";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { GoalResponse } from "../../interfaces/goalResponse";
import React, { useCallback, useRef } from "react";
import { reverse } from "lodash";
import CenterModal from "../../components/Modal";
import Buri from "../../components/buri";

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
  // height: 100vh;
  padding: 20px;
  background-image: url("/bg.png");
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.2);
 }
 .title {
  font-size: 20px;
 }
 .navWrapper {
  text-align: left;
  background-color: #291F16;
  color: #fff;
  border-bottom: 1px solid #ffffff;
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
  margin-bottom: 20px;
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
 .hintItemText {
  color: #fff;
  border: none;
  text-align: left;
  white-space: nowrap;
 }
`;

const inGeoFence = (dist: number | null, geoFence: number) => {
  console.log(dist);
  console.log(geoFence);
  return true;
  // const result = dist != null && dist >= 0 && dist <= geoFence ? true : false;
  // console.log(result);
  // return result;
};

const Hint = () => {
  const state = useGeolocation();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<GoalResponse[]>(`/api/goal?id=${id}`, fetcher);
  const [modalShow, setModalShow] = React.useState(false);
  const modalId = useRef<number>();
  const modalTitle = useRef<string>("");
  const modalContent = useRef<string>("");
  const imageSrc = useRef<string>("");
  const showModal = useCallback(
    (id: number, title: string, content: string, image: string | undefined) => {
      setModalShow(true);
      modalId.current = id;
      modalTitle.current = title;
      modalContent.current = content;
      imageSrc.current = image ?? "";
    },
    [setModalShow]
  );
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
  console.log(dist);

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
          {true && (
            <Row className="hintListWrapper">
              <Col md="auto" className="center">
                <Image
                  width={90}
                  height={90}
                  alt="takara"
                  src="/kaizoku_takarabako.png"
                  className="thumnail"
                />
              </Col>
              <ListGroup horizontal={true} className="my-2">
                <ListGroup.Item className="hintItem">
                  <Button
                    variant={inGeoFence(dist, 10) ? "warning" : "secondary"}
                    active={inGeoFence(dist, 10)}
                    onClick={() => {
                      if (inGeoFence(dist, 10)) {
                        router.push(`/send/${id}`);
                      }
                    }}
                  >
                    宝箱を開ける!
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className="hintItem hintItemText">
                  宝まで
                  <br />
                  {10}m<br />
                  以内で開放
                </ListGroup.Item>
              </ListGroup>
            </Row>
          )}
          {reverse(questData.hints).map((h, idx) => {
            const length = questData.hints.length;

            if (idx === length - 1) {
              return (
                <Row className="">
                  <ListGroup horizontal={true} className="my-2" key={idx}>
                    <ListGroup.Item className="hintItem">
                      <Col md="1" className="center">
                        <Button
                          variant={"warning"}
                          size="lg"
                          block
                          onClick={() =>
                            showModal(1, h.name, h.contents, h.image_url)
                          }
                        >
                          ヒント1を見る
                        </Button>
                      </Col>
                    </ListGroup.Item>
                    <ListGroup.Item className="hintItem hintItemText"></ListGroup.Item>
                  </ListGroup>
                </Row>
              );
            }

            const isInGeoFence = inGeoFence(dist, h.trigger.dist);

            return (
              <Row className="hintListWrapper">
                <ListGroup horizontal={true} className="my-2" key={idx}>
                  <ListGroup.Item className="hintItem">
                    <Button
                      variant={isInGeoFence ? "warning" : "secondary"}
                      active={isInGeoFence}
                      onClick={() => {
                        if (isInGeoFence) {
                          showModal(1, h.name, h.contents, h.image_url);
                        }
                      }}
                    >
                      ヒント{length - idx}を見る
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item className="hintItem hintItemText">
                    宝まで
                    <br />
                    {h.trigger.dist}m<br />
                    以内で開放
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            );
          })}
          <CenterModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            // id={modalId.current ?? ""}
            title={modalTitle.current ?? ""}
            content={modalContent.current ?? ""}
            imageSrc={imageSrc.current ?? ""}
          ></CenterModal>
        </Container>
      </div>
      <Buri buruburu={true} poyooon={true}></Buri>
    </>
  );
};

export default Hint;
