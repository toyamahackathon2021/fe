import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useState } from "react";
import { Container, Col, Row, ListGroup, Button, Image } from "react-bootstrap";
import useSWR from "swr";
import { GoalResponse } from "../interfaces/goalResponse";
import { fetcher } from "../services/fetcher";
import SelectTreasureInfo from "../components/test";
type missionType = {
  mission_title: string;
  duration: string;
};

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
  background-image: url("/map_top.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.2);
 }
 .title {
  display: none;
  font-size: 20px;
 }
 .headerWrapper {
   margin: 0 auto;
   padding: 10px;
   background-color: #fff;
 }
 .mission {
   width: 100%;
   margin-bottom: 0;
 }
 .missionLists {
  position: relative;
 }
 .missionList {
    position: absolute;
 }
 .missionList:nth-child(1) {
  top: 20vw;
  left: 10vw;
}
 .missionList:nth-child(2) {
  top: 50vw;
  left: 40vw;
 }
  .missionTrigger {
  }
`

const IndexPage = () => {
  const { data, error } = useSWR<GoalResponse[]>("/api/goal", fetcher);
  console.log(data);

  const [mission, setMission] = useState<missionType>({
    mission_title: "",
    duration: "",
  });
  const [missionId, setMissionId] = useState<number | null>(null);

  const handleTreasureClick = useCallback(
    (treasure: any) => {
      if (!treasure) return;
      setMission({ mission_title: treasure.name, duration: treasure.duration });
      setMissionId(treasure.id);
    },
    [setMission]
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const questList = data.map((d: GoalResponse) => {
    return {
      id: d.id,
      name: d.data ? d.data.mission_title : "",
      duration: d.data ? d.data.duration : "",
    };
  });

  console.log(questList);

  return (
    <>
      <style>{style}</style>
      <div className="wrapper">
    <Container fluid="lg">
      <Row className="col-12 justify-content-md-center headerWrapper">
        <h1 className="title">富山 トレジャーハント</h1>
        <p className="mission">
          探しに行く
          <br/>宝を選んでください
        </p>
      </Row>
      <Row className="col-12 justify-content-md-center">
        <div className="missionLists">
          {questList.map((q, id) => (
            <div className="missionList">
              <Button  variant="link" className="missionTrigger" onClick={() => handleTreasureClick(q)} key={id}>
                {/* {q.name} */}
                <Image
                  width={45}
                  height={45}
                  alt="mission"
                  src="/kaizoku_takarabako.png"
                />
              </Button>
              {/*
              <Link href={`/hint/${q.id}`}>{q.name}</Link>
              */}
            </div>
          ))}
        </div>
      </Row>
      <SelectTreasureInfo
        mission_title={mission.mission_title}
        duration={mission.duration}
        id={missionId}
      ></SelectTreasureInfo>
    </Container>
      </div>
    </>
  );
};

export default IndexPage;
