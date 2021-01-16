import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, ListGroup } from "react-bootstrap";
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
              <Link href={`/hint/${q.id}`}>{q.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      <SelectTreasureInfo mission_title="みっしょん" duration="20分ぐらい？"></SelectTreasureInfo>
    </Container>
  );
};

export default IndexPage;
