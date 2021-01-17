import * as React from 'react';
import Link from "next/link";

interface Props {
  id: number,
  mission_title: string,
  duration: string
}
interface State {}

const styleGenerator = ({ mission_title }) => ({
  display: mission_title !== "" ? 'initial' : 'initial',
  border: "none",
  padding: "0 16px",
  color: "#fff",
  background: "#000",
  position: "absolute",
  bottom: 0
});

const buttonStyleGenerator = ({ button }) => ({
  background: "#FF9933"
});

class SelectTreasureInfo extends React.Component<Props, State> {

  render() {
    return (
      <div className="col-12 justify-content-md-center" style={styleGenerator(this.props.mission_title)} >
        <h4 className="col-12 justify-content-md-center" >{this.props.mission_title}</h4>
        <div className="col-12 justify-content-md-center" >{this.props.duration}</div>
        <button className="col-12 justify-content-md-center" style={buttonStyleGenerator(this.props.mission_title)}>
          <Link href={`/hint/${this.props.id}`}>宝探しを始める</Link>
        </button>
      </div>
    );
  }
};
export default SelectTreasureInfo;