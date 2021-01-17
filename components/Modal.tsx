import React, { MouseEventHandler } from "react";
import { Button, Modal, Image } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide?: MouseEventHandler<any>;
  // id: number;
  title: string;
  content: string;
  imageSrc: string;
}

const style = `
  .modal-header,
  .modal-footer {
    border: none;
  }
  .modal-footer {
    justify-content: center;
  }
  .modalTitle {
    width: 100%;
    height: 75px;
    background-image: url("/ribbon.png");
    background-size: cover;
  }
`;

const CenterModal: React.FC<Props> = (props) => {
  return (
    <>
      <style>{style}</style>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="modalTitle"
          >
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
          <Button variant="link" onClick={props.onHide}>
            戻る
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CenterModal;
