import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { ServiceSignalList } from "../../interface/ServicesInterface";
import { prettyDate, ucfirst } from "../../Helper/helps";
import config from "../../../config";
import { ContextAuth } from "../Context/App";
import ModalSignal from "../Pages/Modal/ModalSignalById";

const typoText = (text: string, length: number) => {
  if (text.length > length) return text.substring(0, length) + "...";
  return text;
};

const CardSignal = (props: { signal: ServiceSignalList }) => {
  const [modal, setModal] = React.useState(false);
  const [items, setItems] = React.useState<{ data: any }>();

  const authContext = React.useContext(ContextAuth) as any;

  const TypeStatus = (props: { type: string | undefined }) => {
    switch (props.type) {
      case "expired":
        return <span className="text-danger">{ucfirst(props?.type)}</span>;
      case "pending":
        return <span className="text-warning">{ucfirst(props?.type)}</span>;
      case "active":
        return <span className="text-success">{ucfirst(props?.type)}</span>;
      default:
        return <span className="">{ucfirst(props?.type as any)}</span>;
    }
  };

  const LevelBadges = (props: { level: string }) => {
    switch (props.level) {
      case "low":
        return (
          <Badge bg="warning" className="text-black">
            {ucfirst(props.level)}
          </Badge>
        );
      case "medium":
        return (
          <Badge bg="info" className="text-black p-1">
            {ucfirst(props.level)}
          </Badge>
        );
      default:
        return (
          <Badge bg="danger" className="text-black">
            {ucfirst(props.level)}
          </Badge>
        );
    }
  };

  const handleClickCard = (props: ServiceSignalList) => {
    setModal(true);
    (async () => {
      const getSignalId = await fetch(
        `${config.API_URL}signal/ids/${props?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": config.API_KEY,
            AUTHORIZATION: "Bearer " + authContext?.auth_info.token,
          },
        }
      );
      if (getSignalId.status === 200) {
        const responseSignal = await getSignalId.json();
        setItems(responseSignal?.data);
      }
    })();
  };

  return (
    <React.Fragment>
      <Col xl={3} lg={12} md={12} xs={12}>
        <Card
          className="sales-card shadow-lg"
          style={{ cursor: "pointer" }}
          onClick={async () => handleClickCard(props?.signal)}
        >
          <Row>
            <div className="col-8">
              <div className="ps-4 pt-4 pe-3 pb-4">
                <div className="">
                  <h6 className="mb-2 tx-12">
                    <TypeStatus type={props?.signal.status} />
                  </h6>
                </div>
                <div className="pb-0 mt-0">
                  <div className="d-flex">
                    <h4 className="tx-22 font-weight-semibold mb-2">
                      {typoText(props?.signal?.pair as any, 8)}
                    </h4>
                  </div>
                  <p className="mb-0 tx-12  text-muted">
                    <span className="text-warning font-weight-semibold">
                      {prettyDate(props?.signal?.created_at as any)}
                    </span>
                  </p>
                  <span style={{ fontSize: "9pt" }}>
                    {props?.signal.status_price as any}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-4 text-center align-items-center">
              <div className="d-flex">
                <div>
                  <div className="ps-0 mt-3">
                    <LevelBadges level={props.signal.level as any} />
                  </div>
                  <div
                    className="bg-warning-transparent overflow-hidden mt-2 p-2"
                    style={{ borderRadius: "8px" }}
                  >
                    {props?.signal.signals_type === "buy" ? (
                      <>
                        <i className="bi bi-arrow-up-circle tx-16 text-success"></i>
                      </>
                    ) : (
                      <i className="bi bi-arrow-down-circle tx-16 text-danger"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Card>
      </Col>
      <ModalSignal
        show={modal}
        callback={setModal}
        items={items}
        close={setItems}
      />
    </React.Fragment>
  );
};

export { CardSignal };
