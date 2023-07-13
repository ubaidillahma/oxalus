import React from "react";
import {
  Card,
  Col,
  Form,
  ListGroup,
  Nav,
  Row,
  Button,
  Alert,
} from "react-bootstrap";
import { ContextAuth } from "../../Context/App";
import { prettyDate, ucfirst } from "../../../Helper/helps";
import config from "../../../../config";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { AnimateZoomIn } from "../../SlideAnimation/SlideZoomIn";

const Setting = () => {
  const routeChanges = useNavigate();
  const authCOntext = React.useContext(ContextAuth) as any;
  const [sbtnotif, setSbt] = React.useState(false);
  const [sbtcgs, setCgs] = React.useState(false);
  const [error, setError] = React.useState<any>();

  const credentialsSshText =
    authCOntext?.notifMember?.notif_webhook?.includes("https");

  const submitHandleChangesPas = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event?.target);
    const bodys = Object.fromEntries(formData.entries());
    (async () => {
      const ChangesPass = fetch(`${config.API_URL}member/changepassword`, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json",
          AUTHORIZATION: "Bearer " + authCOntext?.auth_info.token,
          "x-api-key": config.API_KEY,
        }),
        body: JSON.stringify(bodys),
      });

      const promiseChangesPass = await toast.promise(ChangesPass, {
        pending: {
          render() {
            return <span>Changes Password Loading...</span>;
          },
          type: "warning",
        },
      });

      if (promiseChangesPass.status === 200) {
        toast.success("Changes Password Success", {
          type: "success",
          theme: "colored",
          autoClose: 2500,
        });
        const responseAuth = await promiseChangesPass.json();
        setCgs(false);
        routeChanges("/dasboard/setting");
      }

      if (promiseChangesPass.status >= 400) {
        setCgs(false);
        const responseAuth = await promiseChangesPass.json();
        setError(responseAuth?.errors);
        toast.error("Changes Password Failed", {
          type: "error",
          theme: "colored",
          autoClose: 2500,
        });
      }
    })();
  };
  const submitHandleNotifications = (event: any) => {
    event.preventDefault();
    setSbt(true);
    const formData = new FormData(event?.target);
    const bodys = Object.fromEntries(formData.entries());

    (async () => {
      const ChangesPass = fetch(`${config.API_URL}member/setnotification`, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json",
          AUTHORIZATION: "Bearer " + authCOntext?.auth_info.token,
          "x-api-key": config.API_KEY,
        }),
        body: JSON.stringify(bodys),
      });

      const promiseChangesPass = await toast.promise(ChangesPass, {
        pending: {
          render() {
            return <span>Changes Notification Data...</span>;
          },
          type: "warning",
        },
      });

      if (promiseChangesPass.status === 200) {
        toast.success("Changes Data Notify Success", {
          type: "success",
          theme: "colored",
          autoClose: 2500,
        });
        const responseAuth = await promiseChangesPass.json();
        setSbt(false);
        routeChanges("/dasboard/setting");
      }

      if (promiseChangesPass.status >= 400) {
        setSbt(false);
        toast.error("Changes Data Notify Failed", {
          type: "error",
          theme: "colored",
          autoClose: 2500,
        });
      }
    })();
  };
  if (authCOntext?.data?.subscription_active === null)
    return <Navigate to="/dasboard/subscription" />;
  return (
    <AnimateZoomIn>
      <h3 className="mt-4">SETTING ACCOUNT</h3>
      <Row className="mt-4">
        <Col lg={4} xl={4}>
          <Card className="card custom-card">
            <Card.Header className="card-header">
              <Card.Title>INFO MEMBER</Card.Title>
            </Card.Header>
            <Card.Body className="main-content-left main-content-left-mail card-body">
              <ListGroup className="fs-7">
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Name</span>
                    <span>{authCOntext?.data?.name}</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Email</span>
                    <span>{authCOntext?.data?.email}</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Member ID</span>
                    <span>{authCOntext?.data?.member_id}</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Status</span>
                    <span>{ucfirst(authCOntext?.data?.status)}</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Country</span>
                    <span>{ucfirst(authCOntext?.data?.country)}</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Referal By</span>
                    <span>{ucfirst(authCOntext?.data?.referral_by)}</span>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="card custom-card">
            <Card.Header className="card-header">
              <Card.Title>SUBSCRIPTION ACTIVE</Card.Title>
            </Card.Header>
            <Card.Body className="main-content-left main-content-left-mail card-body">
              <ListGroup className="fs-7">
                <ListGroup.Item>
                  {authCOntext?.data?.subscription_active.id_ref}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Created At</span>
                    {prettyDate(
                      authCOntext?.data?.subscription_active.created_at
                    )}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Member ID</span>
                    <span>{authCOntext?.data?.member_id}</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Payment Methode</span>
                    <span>
                      {ucfirst(
                        authCOntext?.data?.subscription_active.payment_method
                      )}
                    </span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Payment Status</span>
                    <span>
                      {ucfirst(
                        authCOntext?.data?.subscription_active.payment_status
                      )}
                    </span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>Start Date</span>
                    <span>
                      {ucfirst(
                        authCOntext?.data?.subscription_active.start_date
                      )}
                    </span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <span>End Date</span>
                    <span>
                      {ucfirst(authCOntext?.data?.subscription_active.end_date)}
                    </span>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} xl={8}>
          <Row>
            {authCOntext?.data?.subscription_active.payment_method ===
            "system" ? (
              <></>
            ) : (
              <Col lg={12} xl={12} md={12} sm={12}>
                <Card>
                  <Card.Header className="card-header">
                    <Card.Title className="text-capitalize">
                      Setting Notification{" "}
                      <span className="text-warning fs-6">
                        (Premium Member)
                      </span>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="pt-0">
                    <div className="pd-sm-10">
                      <Form onSubmit={submitHandleNotifications}>
                        <Row className="row-xs align-items-center mg-b-20">
                          <Col md={3} className="align-self-start">
                            <Form.Label className="form-label mg-b-0">
                              Whatsapp
                            </Form.Label>
                          </Col>
                          <Col
                            md={9}
                            className="align-self-center mg-t-5 mg-md-t-0"
                          >
                            <Form.Control
                              placeholder="Number Wa"
                              name="notif_wa"
                              pattern="\(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|
                                                            2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|
                                                            4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$"
                              max={255}
                              required
                              defaultValue={authCOntext?.notifMember?.notif_wa}
                              title="Fleet No. must contain digits only"
                              type="text"
                            />
                            <Form.Text className="text-muted">
                              Input your number Whatsapp with country code
                            </Form.Text>
                          </Col>
                        </Row>
                        <Row className="row-xs align-items-center mg-b-20">
                          <Col md={3} className="align-self-start">
                            <Form.Label className="form-label mg-b-0">
                              Telegram ID
                            </Form.Label>
                          </Col>
                          <Col md={9} className=" mg-t-5 mg-md-t-0">
                            <Form.Control
                              placeholder="ID Telegram"
                              name="notif_tg"
                              defaultValue={authCOntext?.notifMember?.notif_tg}
                              type="text"
                            />
                            <Form.Text className="text-muted">
                              How to get ID Telegram ?{" "}
                              <a
                                href="https://oxalus.tawk.help/article/how-to-get-your-telegram-id"
                                target="_blank"
                              >
                                Click Here
                              </a>
                            </Form.Text>
                          </Col>
                        </Row>
                        <Row className="row-xs align-items-center mg-b-20">
                          <Col md={3} className="align-self-start">
                            <Form.Label className="form-label mg-b-0">
                              Url Webhook
                            </Form.Label>
                          </Col>
                          <Col md={9} className=" mg-t-5 mg-md-t-0">
                            <Form.Control
                              placeholder="Webhook"
                              name="notif_webhook"
                              defaultValue={
                                authCOntext?.notifMember?.notif_webhook
                              }
                              type="text"
                            />
                            <Form.Text className="text-muted">
                              {!credentialsSshText ? (
                                <span className="text-warning">
                                  not ssh credentials
                                </span>
                              ) : (
                                <span>How to get ID Webhook </span>
                              )}
                            </Form.Text>
                          </Col>
                        </Row>
                        <div className="float-end">
                          <Button
                            variant=""
                            type="submit"
                            disabled={sbtnotif}
                            className="btn btn-primary pd-x-30 mg-r-5 mg-t-5"
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}
            <Col lg={12} xl={12} md={12} sm={12}>
              <Card>
                <Card.Body>
                  {error && (
                    <Alert
                      className="alert alert-dismissible fade show "
                      variant="danger"
                    >
                      <ul>
                        {Object.entries(error).map((val: any, idx) => (
                          <li key={idx}>
                            {val[0]} : {val[1]}
                          </li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                  <div className="main-content-label mg-b-5 fs-7">
                    Changes Your Password
                  </div>
                  <div className="pd-30 pd-sm-20">
                    <Form onSubmit={submitHandleChangesPas}>
                      <Row className="row-xs align-items-center mg-b-20">
                        <Col md={3}>
                          <Form.Label className="form-label mg-b-0">
                            Old Password
                          </Form.Label>
                        </Col>
                        <Col md={9} className=" mg-t-5 mg-md-t-0">
                          <Form.Control
                            placeholder="Enter your Old Password"
                            name="old_password"
                            type="password"
                          />
                        </Col>
                      </Row>
                      <Row className="row-xs align-items-center mg-b-20">
                        <Col md={3}>
                          <Form.Label className="form-label mg-b-0">
                            New Password
                          </Form.Label>
                        </Col>
                        <Col md={9} className=" mg-t-5 mg-md-t-0">
                          <Form.Control
                            placeholder="Enter your New Password"
                            name="new_password"
                            type="password"
                          />
                        </Col>
                      </Row>
                      <Row className="row-xs align-items-center mg-b-20">
                        <Col md={3}>
                          <Form.Label className="form-label mg-b-0">
                            Confirm Password
                          </Form.Label>
                        </Col>
                        <Col md={9} className=" mg-t-5 mg-md-t-0">
                          <Form.Control
                            placeholder="Enter your Confirm Password"
                            type="password"
                            name="confirm_password"
                          />
                        </Col>
                      </Row>
                      <div className="float-end">
                        <Button
                          variant=""
                          type="submit"
                          disabled={sbtcgs}
                          className="btn btn-primary pd-x-30 mg-r-5 mg-t-5"
                        >
                          Changes Password
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </AnimateZoomIn>
  );
};

export default Setting;
