import React from "react";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { ServiceSignalList } from "../../../interface/ServicesInterface";
import config from "../../../../config";
import { ContextAuth } from "../../Context/App";
import { number } from "echarts";
import {
  SignalTypeResult,
  SignalTypeStatus,
  parseMd,
  prettyDate,
  ucfirst,
} from "../../../Helper/helps";
import { SkeltonSignalFind } from "../../Skelton/SkeltonSignalFind";

interface ModalSignals {
  show: boolean;
  callback: Function;
  items: any;
  close: Function;
}
export default function ModalSignal(props: ModalSignals) {
  const ClearDataModal = () => {
    props.callback(false);
    props.close(null);
  };

  const [modalDesc, setModalDesc] = React.useState(false);
  const [description, setDescription] =   React.useState('');

  const handleModalDesc = (text: any) => {
    props.callback(false);
    props.close(null);
    setModalDesc(true);
    setDescription(text)
  }
  return (
    <React.Fragment>
      <Modal
          dialogClassName="modal-md"
          show={modalDesc}
          onHide={async () => setModalDesc(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header>
             Description Oxalus Signal
          </Modal.Header>
          <Modal.Body>
            <p dangerouslySetInnerHTML={{ __html: parseMd(description as any),}}></p>
            <Modal.Footer>
               <Button className="float-end" size={'lg'} onClick={() => setModalDesc(false)}>
                  Close Description
               </Button>
            </Modal.Footer>
          </Modal.Body>
      </Modal>
      <Modal
        dialogClassName="modal-md"
        show={props?.show as any}
        onHide={async () => ClearDataModal()}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props?.items?.pair}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-6">
          {!props?.items && <SkeltonSignalFind />}

          {props?.items && (
            <React.Fragment>
              <ListGroup>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <span>Pair Spot</span>
                    <span className="fw-bold">{props?.items?.pair}</span>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <span className="align-self-center">Type Open</span>
                    <div
                      className={`d-flex gap-2 ${props?.items?.signals_type === "buy"
                          ? "text-success"
                          : "text-danger"
                        }`}>
                      <span>
                        {props?.items?.signals_type === "buy" ? (
                          <>
                            <i className="bi bi-arrow-up-circle text-success"></i>
                          </>
                        ) : (
                          <i className="bi bi-arrow-down-circle text-danger"></i>
                        )}
                      </span>
                      <span className="align-self-center">
                        {ucfirst(props?.items?.signals_type)}
                      </span>
                    </div>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <span className="align-self-center">On Price</span>
                    <span className="fw-bold">{props?.items?.entry_price}</span>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <span className="align-self-center">Stop Loss</span>
                    <span className="text-danger">
                      {ucfirst(props?.items?.stop_loss)}
                    </span>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <span className="align-self-center">Take Profit</span>
                    <span className="text-success">
                      {ucfirst(props?.items?.take_profit)}
                    </span>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <span className="align-self-center fw-bold">Description</span>
                  </div>
                  <Button
                    variant="success"
                    className="mx-auto d-block mt-3"
                    size={'lg'}
                    onClick={async() => handleModalDesc(parseMd(props?.items?.description as any))}>See description</Button>
                </ListGroupItem>
              </ListGroup>

              <div className="mt-3">
                <h6>Result of Signal</h6>
              </div>

              <ListGroupItem>
                <div className="d-flex justify-content-between">
                  <span className="align-self-center">Status</span>
                  <SignalTypeStatus type={props?.items?.status} />
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="d-flex justify-content-between">
                  <span>Result</span>
                  <SignalTypeResult type={props?.items?.result} />
                </div>
              </ListGroupItem>
            </React.Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={async () => ClearDataModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
