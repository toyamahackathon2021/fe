import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useState } from "react";
import { Container, Row, ListGroup, Button } from "react-bootstrap";
import useSWR from "swr";
import { GoalResponse } from "../interfaces/goalResponse";
import { fetcher } from "../services/fetcher";
import SelectTreasureInfo from "../components/SelectTreasureInfo";

type missionType = {
  mission_title: string;
  duration: string;
};

const IndexPage = () => {
  const { data, error } = useSWR<GoalResponse[]>("/api/goal", fetcher);
  const crowdData = useSWR("/api/crowd", fetcher);

  console.log(data);
  console.log("added::", crowdData.data);

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

  const formattedDateForCSVField = (dt) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    const h = ('00' + dt.getHours()).slice(-2);
    const mm = (Math.floor(dt.getMinutes() / 10) * 10);

    return (y + '-' + m + '-' + d + " " + h + mm);
  }
  // 雑に書いておく
  const estimateCrowdLevel = () => {
    const formattedNowDate = formattedDateForCSVField(new Date());

    console.log("aaaaaaa----", formattedDateForCSVField)
    return crowdDate.data.filter((row) => row.datetime === formattedNowDate);
    // const crowdLevelByTime = crowdData.data.datetime[]

  }

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
