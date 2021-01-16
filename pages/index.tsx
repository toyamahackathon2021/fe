import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Button, Container, Row, ListGroup } from "react-bootstrap";
import { useGeolocation } from "react-use";

const IndexPage = () => {
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
      <Row>
        <h1>富山 トレジャーハント</h1>
      </Row>
      {/* <Row>
        <Link href="/main">
          <Button variant="primary">
            <a>ブリ main</a>
          </Button>
        </Link>
        <Link href="/goal">
          <Button variant="primary">
            <a>ブリ goal</a>
          </Button>
        </Link>
      </Row> */}
      <Row>
        <ListGroup>
          {questList.map((q) => (
            <ListGroup.Item>
              <Link href="/main">{q.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default IndexPage;
