import React from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../../config";
import { ContextAuth } from "../../Context/App";
import { SkeltonSubscription } from "../../Skelton/SkeltonSubscription";
import { stringConversionSubs } from "../../../Helper/helps";
import ModalPayment from "../Modal/ModalPayment";

const Subscribtion = () => {
  const [show, setShow] = React.useState(false);
  let [isFirstCollapsed, setisFirstCollapsed] = React.useState(true);
  const authCheck = React.useContext(ContextAuth) as any;
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [subs, setSubs] = React.useState<any>();
  const [message, setMessage] = React.useState<any>(null);

  let first = () => {
    if (isFirstCollapsed === false) {
      setisFirstCollapsed(true);
    } else if (isFirstCollapsed === true) {
      setisFirstCollapsed(false);
    }
  };

  const handleClickModal = (toogle: boolean, data: any) => {
    setShow(toogle);
    setSubs(data);
  };

  React.useEffect(() => {
    setTimeout(async () => {
      try {
        const subscribtionActive = await fetch(
          `${config.API_URL}subscription/listavailablepackage`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "x-api-key": config.API_KEY,
              AUTHORIZATION: "Bearer " + authCheck?.auth_info.token,
            }),
          }
        );
        if (subscribtionActive.status === 200) {
          const responsesubscribtionActive = await subscribtionActive.json();
          setMessage(responsesubscribtionActive?.message);
          setItems(responsesubscribtionActive?.data);
          setLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  }, []);
  return (
    <React.Fragment>
      <Container fluid className="mt-5">
        <h3>Subscription</h3>
        {message && (
          <div className="alert alert-warning">
            <div className="alert-body">{message}</div>
          </div>
        )}

        {authCheck?.data?.subscription_active === null && (
          <>
            <div className="alert alert-warning">
              <div className="alert-body">
                You don't have any active subscription, Please choose one of the
                subscription below
              </div>
            </div>
          </>
        )}

        {!loading && <SkeltonSubscription count={4} />}
        <Row className="row-sm">
          {items?.map((sub: any, number) => (
            <Col key={number} sm={12} md={12} lg={4} xl={4} xxl={4}>
              <Card className=" custom-card">
                <Card.Header className=" d-flex custom-card-header border-bottom-0 ">
                  <h3 className="card-title">
                    Package {sub?.description_package}
                  </h3>
                </Card.Header>
                <Card.Body>
                  <div
                    style={{ fontSize: "32px" }}
                    className="text-center text-warning mb-5"
                  >
                    ${sub?.price_package}
                  </div>
                  <ul className="fs-6">
                    {stringConversionSubs(sub?.benefit).map((val, idx) => {
                      if (
                        val.substring(0, 3).toLocaleLowerCase().trim() == "no"
                      ) {
                        return (
                          <li className="text-danger pb-2" key={idx}>
                            <div className="d-flex gap-2">
                              <i className="bi bi-x-octagon-fill fs-6"></i>
                              <span>{val}</span>
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={idx}>
                          <div className="d-flex gap-2 pb-2">
                            <i className="bi bi-check-all text-success fs-6"></i>
                            <span>{val}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card.Body>
                <Card.Footer>
                  <Button
                    type="button"
                    onClick={async () => handleClickModal(true, sub)}
                    className="btn btn-primary btn-lg btn-block"
                  >
                    {parseInt(sub?.price_package) === 0
                      ? "Get Started"
                      : "Orders"}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <ModalPayment konditions={show} callbackHandle={setShow} data={subs} />
    </React.Fragment>
  );
};
export default Subscribtion;
