import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import logoTrade from "../../../../assets/usdt-bep20.png";
import QRCode from "react-qr-code";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { PaymentTradeType } from "../../../Helper/helps";

interface StateFromPayment {
  copy: boolean;
  redirect: boolean;
}

const HandleRoute = () => {
  toast.warning("Please Wait, Your Payment is being Processed", {
    theme: "colored",
  });
  return <Navigate to={"/dasboard"} />;
};

const LocationState = () => {
  const location = useLocation();
  const [copy, setCopy] = React.useState(false);
  const routeChanges = useNavigate();
  const HandleBackToDasboard = () => {
    routeChanges("/dasboard");
  };

  const findType = PaymentTradeType.find((values) => {
    return location.state
      ? values.type_currency === location.state?.status?.data?.currency
      : null;
  });

  return (
    <React.Fragment>
      {location.state === null && <HandleRoute />}
      {location.state && (
        <Col lg xl xxl sm md>
          <h2>Transfer Payment Intruction</h2>
          <img
            src={findType?.path}
            width={"120px"}
            className="rounded-circle d-block mx-auto"
            alt=""
          />
          <span>Amount Transfers + Fee</span>
          <h1>
            {location.state?.status?.data?.amount} {findType?.names}
          </h1>
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
              value={location.state?.status?.data?.payment_processor}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="d-flex justify-content-center">
            <Card style={{ width: "auto" }} className="mt-3 mb-3">
              <Card.Body>
                <div className="d-flex gap-3">
                  <i className="bi bi-exclamation-diamond-fill text-warning fs-4"></i>
                  <span className="align-self-center">
                    We will only accept for this deposit {findType?.pair} on the
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
              {location.state?.status?.data?.payment_processor}
            </div>
            <div className="border border-1 rounded p-1 align-self-center">
              <CopyToClipboard
                text={location.state?.status?.data?.payment_processor}
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
      )}
    </React.Fragment>
  );
};
export default class PaymentIntruction extends React.Component<
  any,
  StateFromPayment
> {
  public constructor(props: any) {
    super(props);
    this.state = { copy: false, redirect: false };
    this.RenderComponent = this.RenderComponent.bind(this);
    this.HandleRedirectComponent = this.HandleRedirectComponent.bind(this);
    this.BackToDasboard = this.BackToDasboard.bind(this);
  }
  public componentDidMount(): void {}

  protected HandleRedirectComponent(): JSX.Element {
    return <this.RenderComponent state={{ name: "Otong" }} />;
  }

  protected BackToDasboard() {
    this.setState({ redirect: true });
  }

  public RenderComponent(props: { state: any }) {
    return (
      <Row className="justify-content-center mt-3 text-center">
        <LocationState />
      </Row>
    );
  }
  public render(): React.ReactNode {
    return <this.HandleRedirectComponent />;
  }
}
