import "bootstrap/dist/css/bootstrap.min.css";
import { useGeolocation } from "react-use";
import { Button, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMemo } from "react";
import { distm, Point } from "../../services/geo";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { GoalResponse } from "../../interfaces/goalResponse";

const Hint = () => {
  const state = useGeolocation();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<GoalResponse[]>(`/api/goal?id=${id}`, fetcher);

  if (!data) return <div>loading...</div>;
  console.log(data);

  const { latitude, longitude } = state;
  const quest = data[0];
  const questData = quest.data;
  const goalPoint = { lat: questData.lat, lng: questData.lng };

  const from = latitude && longitude ? { lat: latitude, lng: longitude } : null;
  const dist = distm(from, goalPoint);

  return (
    <Container>
      <Row>
        <h1>id: {id}</h1>
      </Row>
      <Row>
        <h2>lat: {state.latitude}</h2>
        <h2>lon: {state.longitude}</h2>
        <h2>距離: {dist}m</h2>
      </Row>
      <Row>
        {/* {questData.hints.map((h) => (
          <p>{}</p>
        ))} */}
      </Row>
      <Row>
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
