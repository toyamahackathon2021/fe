import { useRouter } from "next/router";
import * as React from "react";
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
  color: "#fff",
  background: "#000",
  position: "absolute",
  bottom: 0,
});

const buttonStyleGenerator = (button: string) => ({
  background: "#FF9933",
});

const SelectTreasureInfo: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <div
      className="col-12 justify-content-md-center"
      style={styleGenerator(props.mission_title)}
    >
      <h4 className="col-12 justify-content-md-center">
        {props.mission_title}
      </h4>
      <div className="col-12 justify-content-md-center">{props.duration}</div>
      <button
        className="col-12 justify-content-md-center"
        style={buttonStyleGenerator(props.mission_title)}
        onClick={() => {
          props.id && router.push(`/hint/${props.id}`);
        }}
      >
        宝探しを始める
      </button>
    </div>
  );
};
export default SelectTreasureInfo;
