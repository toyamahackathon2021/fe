import { useRouter } from "next/router";
import * as React from "react";
import { Button, Container, Col, Row, Navbar } from "react-bootstrap";
interface Props {
  mission_title: string;
  duration: string;
  id: number | null;
}
interface State {}

const styleGenerator = (mission_title: string): React.CSSProperties => ({
  display: mission_title ? "initial" : "initial",
  border: "none",
  padding: "0 16px",
  // color: "#fff",
  // background: "#000",
  // position: "absolute",
  // bottom: 0,
});

const style = `
.navCoponentWrapper {
  background-color: #291F16;
 }
.navWrapper {
  text-align: left;
  background-color: #291F16;
  color: #fff;
 }
 .navText {
   font-size: 1.4rem;
 }
 .missionTitle, .missionDuration {
   margin-left: 1em;
 }
 .alert {
   background-color: #fff;
   color: #291F16;
  }
`

const SelectTreasureInfo: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <Navbar fixed="bottom" className="navWrapper">
      <style>{style}</style>
      <Container
        className="navCoponentWrapper"
        style={styleGenerator(props.mission_title)}
      >
        <br/>
        <Row>
          <p className="alert">
          ⚠︎ 混雑注意！
          <br/>
          現在多くの人が宝箱付近にいます。
          <br/>
          安全のため時間を置いてからの参加をおすすめします。
          </p>
        </Row>
        <Row>
          Mission:
          <h4 className="missionTitle justify-content-md-center">
            {props.mission_title}
          </h4>
        </Row>
        <Row>
          所要時間:
          <div className="missionDuration justify-content-md-center">{props.duration}</div>
        </Row>
        <br/>
        <Row>
          <Button
            variant="warning"
            className="col-12 justify-content-md-center"
            onClick={() => {
              props.id && router.push(`/hint/${props.id}`);
            }}
          >
            宝探しを始める
          </Button>
        </Row>
        <br/>
      </Container>
    </Navbar>
  );
};
export default SelectTreasureInfo;
