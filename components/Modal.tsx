import React, { MouseEventHandler } from "react";
import { Button, Modal, Image } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: MouseEventHandler<any>;
  // id: number;
  title: string;
  content: string;
  imageSrc: string;
}

const CenterModal: React.FC<Props> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.content}</p>
        {props.imageSrc && (
          <Image src={props.imageSrc} rounded thumbnail={true} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CenterModal;
