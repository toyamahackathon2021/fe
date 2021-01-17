import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useState } from "react";
import { Container, Row, ListGroup, Button } from "react-bootstrap";
import useSWR from "swr";
import { GoalResponse } from "../interfaces/goalResponse";
import { fetcher } from "../services/fetcher";
import SelectTreasureInfo from "../components/SelectTreasureInfo";
import path from "path";

type missionType = {
  mission_title: string;
  duration: string;
};

const IndexPage = () => {
  const { data, error } = useSWR<GoalResponse[]>("/api/goal", fetcher);
  const { crowdData, dataError } = useSWR("/api/crowd", fetcher);

  console.log(data);
  console.log(crowdData);

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
    <Container fluid="lg">
      <Row className="col-12 justify-content-md-center">
        <h1>富山 トレジャーハント</h1>
      </Row>
      <Row className="col-12 justify-content-md-center">
        <ListGroup>
          {questList.map((q, id) => (
            <ListGroup.Item>
              <Button onClick={() => handleTreasureClick(q)} key={id}>
                {q.name}
              </Button>
              {/*
              <Link href={`/hint/${q.id}`}>{q.name}</Link>
              */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      <SelectTreasureInfo
        mission_title={mission.mission_title}
        duration={mission.duration}
        id={missionId}
      ></SelectTreasureInfo>
    </Container>
  );
};

export default IndexPage;
