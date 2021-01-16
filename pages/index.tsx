import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Button, Container, Row, ListGroup } from "react-bootstrap";
import { useGeolocation } from "react-use";
import useSWR from "swr";
import { fetcher } from "../services/fetcher";

const IndexPage = () => {
  const { data, error } = useSWR("/api/images?name=buri", fetcher);
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const questList = [
    {
      name: "富山城",
      id: 1,
    },
    {
      name: "ブリ",
      id: 2,
    },
    {
      name: "スタバ",
      id: 3,
    },
  ];

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
      <h1>{JSON.stringify(data)}</h1>
    </Container>
  );
};

export default IndexPage;
