import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Button, Container, Row, ListGroup } from "react-bootstrap";
import { useGeolocation } from "react-use";
import useSWR from "swr";
import { GoalResponse } from "../interfaces/goalResponse";
import { fetcher } from "../services/fetcher";

const IndexPage = () => {
  const { data, error } = useSWR<GoalResponse[]>("/api/goal", fetcher);
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const questList = data.map((d: GoalResponse) => {
    return {
      id: d.id,
      name: d.data ? d.data.mission_title : "",
    };
  });
  console.log(questList);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>富山 トレジャーハント</h1>
      </Row>
      <Row className="justify-content-md-center">
        <ListGroup>
          {questList.map((q) => (
            <ListGroup.Item>
              <Link href={`/hint/${q.id}`}>{q.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default IndexPage;
