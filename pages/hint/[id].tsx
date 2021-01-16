import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import { Button, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { distm } from "../../services/geo";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { GoalResponse } from "../../interfaces/goalResponse";

const Hint = () => {
  const state = useGeolocation();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<GoalResponse[]>(`/api/goal?id=${id}`, fetcher);
  const { latitude, longitude } = state;
  const currentPoint =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  if (!data || !currentPoint) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;

  console.log(data);
  const quest = data[0];
  const questData = quest.data;
  const goalPoint = { lat: questData.lat, lng: questData.lng };
  const dist = distm(currentPoint, goalPoint);

  return (
    <Container>
      <Row>
        <h1>id: {id}</h1>
      </Row>
      <Row>
        {currentPoint && (
          <>
            <h2>lat: {currentPoint.lat}</h2>
            <h2>lon: {currentPoint.lng}</h2>
            <h2>距離: {dist}m</h2>
          </>
        )}
      </Row>
      {questData.hints.map((h) => (
        <Row>
          <h3>{h.name}</h3>
          <p>トリガー: {h.trigger.dist}</p>
          <h2>
            範囲内判定: {dist && dist <= h.trigger.dist ? "範囲内" : "範囲外"}
          </h2>
        </Row>
      ))}
      <Row>
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
    </Container>
  );
};

export default Hint;
