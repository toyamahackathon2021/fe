import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState } from 'react';
import { Container, Row, ListGroup, Button } from "react-bootstrap";
import useSWR from "swr";
import { GoalResponse } from "../interfaces/goalResponse";
import { fetcher } from "../services/fetcher";
import SelectTreasureInfo from "../components/test"

const IndexPage = () => {
  const { data, error } = useSWR<GoalResponse[]>("/api/goal", fetcher);
  console.log(data);
  const [mission, setMission] = useState({id: 0, mission_title: "", duration: ""});

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const questList = data.map((d: GoalResponse) => {
    return {
      id: d.id,
      name: d.data ? d.data.mission_title : "",
      duration: d.data ? d.data.duration : "",
    };
  });

  let handleTreasureClick = (treasure) => {
    if(!treasure) return;
    setMission({id: treasure.id, mission_title: treasure.name, duration: treasure.duration})
  };
  console.log(questList);

  return (
    <Container fluid="lg">
      <Row className="col-12 justify-content-md-center">
        <h1>富山 トレジャーハント</h1>
      </Row>
      <Row className="col-12 justify-content-md-center">
        <ListGroup>
          {questList.map((q) => (
            <ListGroup.Item>
              <Button onClick={() => handleTreasureClick(q)} key={q}>{q.name}</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      <SelectTreasureInfo id={mission.id} mission_title={mission.mission_title} duration={mission.duration}></SelectTreasureInfo>
    </Container>
  );
};

export default IndexPage;
