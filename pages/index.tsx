import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, ListGroup, Button } from "react-bootstrap";
import useSWR from "swr";
import { GoalResponse } from "../interfaces/goalResponse";
import { fetcher } from "../services/fetcher";
import SelectTreasureInfo from "../components/test"

const IndexPage = () => {
  const { data, error } = useSWR<GoalResponse[]>("/api/goal", fetcher);
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const questList = data.map((d: GoalResponse) => {
    return {
      id: d.id,
      name: d.data ? d.data.mission_title : "",
      duration: d.data ? d.data.duration : "",
    };
  });

  type selectedTreasureType = {
    mission_title: string;
    duration: string;
  };

  let selectedTreasure:selectedTreasureType = {
    mission_title: "",
    duration: ""
  }

  let handleTreasureClick = (treasure) => {
    console.log("handleeeeeeeeed::", treasure.name);
    if(!treasure) return;
    console.log("代入")
    selectedTreasure.mission_title = treasure.name;
    selectedTreasure.duration = treasure.duration;
    
    console.log(selectedTreasure)
  };
  console.log(questList);

  return (
    <Container fluid="l">
      <Row className="col-12 justify-content-md-center">
        <h1>富山 トレジャーハント</h1>
      </Row>
      <Row className="col-12 justify-content-md-center">
        <ListGroup>
          {questList.map((q) => (
            <ListGroup.Item>
              <Button onClick={() => handleTreasureClick(q)} key={q}>{q.name}</Button>
              {/*
              <Link href={`/hint/${q.id}`}>{q.name}</Link>
              */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      <SelectTreasureInfo mission_title={selectedTreasure.mission_title} duration={selectedTreasure.duration}></SelectTreasureInfo>
    </Container>
  );
};

export default IndexPage;
