import { Col, Card, Button, Row } from "react-bootstrap";
import React from "react";
import { ContextAuth } from "../Context/App";
import config from "../../../config";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import { Navigate, useNavigate, useRouteLoaderData } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { PaymentTradeType } from "../../Helper/helps";

export const PaymentIntructionData = () => {
  const routeChanges = useNavigate();
  const authContext = React.useContext(ContextAuth) as any;
  const loader = useRouteLoaderData("id-payment") as any;
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>(null);
  const [copy, setCopy] = React.useState(false);

  const HandleRoute = () => {
    toast.error("Id Payment Not Found...", {
      theme: "colored",
    });
    return <Navigate to={"/dasboard/history-subscription"} />;
  };

  const HandleBackToDasboard = () => {
    routeChanges("/dasboard");
  };

  React.useEffect(() => {
    (async () => {
      const fetchStatusPayment = await fetch(
        `${config.API_URL}subscription/statuspayment`,
        {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json",
            "x-api-key": config.API_KEY,
            AUTHORIZATION: "Bearer " + authContext?.auth_info.token,
          }),
          body: JSON.stringify({ id_ref: loader.params.id }),
        }
      );
      const response = await fetchStatusPayment.json();
      if (fetchStatusPayment.status === 200) {
        setData(response?.data);
      }

      if (fetchStatusPayment.status >= 400) {
        setError(response);
      }
    })();
  }, []);

  const findType = PaymentTradeType.find((values) => {
    return !error ? values.type_currency === data?.currency : null;
  });

  return (
    <React.Fragment>
      {error !== null && <HandleRoute />}
      {data && (
        <Row className="justify-content-center mt-3 text-center">
          <Col lg xl xxl sm md>
            <h2>Transfer Payment Intruction</h2>
            <img
              src={findType?.path}
              width={"120px"}
              className="rounded-circle d-block mx-auto"
              alt=""
            />
            <span>Amount Transfers + Fee</span>
            <h1>{data?.amount} USDT</h1>
            <p className="text-center text-warning">
              Please Make Transfer According to the Nominal stated
            </p>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 150,
                width: "100%",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={data?.payment_processor}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Card style={{ width: "auto" }} className="mt-3 mb-3">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <i className="bi bi-exclamation-diamond-fill text-warning fs-4"></i>
                    <span className="align-self-center">
                      We will only accept for this deposit {findType?.pair} on
                      the
                      {findType?.network}
                      Network. Please do not send any other coins or tokens to
                      this address.
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <p>Transfer Address {findType?.pair}</p>
            {copy ? <span className="text-danger">Copied</span> : ""}
            <div className="d-flex flex-wrap justify-content-center mb-3 gap-1">
              <div className="border border-1 rounded p-2">
                {data?.payment_processor}
              </div>
              <div className="border border-1 rounded p-1 align-self-center">
                <CopyToClipboard
                  text={data?.payment_processor}
                  onCopy={async () => setCopy(true)}
                >
                  <Button variant="success" size="sm">
                    Copy
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
            <Button
              onClick={HandleBackToDasboard}
              variant="success"
              className="text-center mt-4"
              size="lg"
            >
              Back To Dasboard
            </Button>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
