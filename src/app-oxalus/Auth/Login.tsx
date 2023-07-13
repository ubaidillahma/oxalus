import React from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as Switcherdatacustam from "../../data/Switcherdata/Switcherdatacustam";
import { toast, Slide, Flip } from "react-toastify";
import config from "../../config";
import logoOxalus from "../../assets/logo_oxalus.png";
import logoOxalusDark from "../../assets/oxalus-base-dark.png";
import { AnimateZoomIn } from "../App/SlideAnimation/SlideZoomIn";
import "../../assets/app.js";
import ReCAPTCHA from "react-google-recaptcha";

const AlertRouteLogin = (props: { keys: string }) => {
  switch (props.keys) {
    case "success_verification":
      return (
        <Alert variant="success">Verification Success, Please Login</Alert>
      );
    case "error_verification":
      return (
        <Alert variant="danger">
          Verification Failed, Please Verify Your Email
        </Alert>
      );
    default:
      return <></>;
  }
};

export default function LoginOxalus() {
  const [responseLogin, setResponseLogin] = React.useState({
    data: [],
    error: null as any,
  });
  const [success, setSuccess] = React.useState(false);

  const chaptaRef = React.useRef<ReCAPTCHA>(null);
  const params = new URLSearchParams(window.location.search);
  const keys = params.get("v");

  const LoginAuth = (event: any) => {
    event.preventDefault();

    if (chaptaRef.current?.getValue() === "") {
      toast.error("Please Verify Captcha", {
        type: "error",
        autoClose: 2000,
        theme: "colored",
      });
    }
    if (chaptaRef.current?.getValue() !== "") {
      const formData = new FormData(event.target);
      const bodys = Object.fromEntries(formData.entries());
      (async () => {
        const SendEmailAgain = fetch(`${config.API_URL}member/login`, {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json",
            "x-api-key": config.API_KEY,
          }),
          body: JSON.stringify(bodys),
        });

        const promiseSendEmailAgain = await toast.promise(SendEmailAgain, {
          pending: {
            render() {
              return <span>Authentication....</span>;
            },
            type: "warning",
          },
        });
        if (promiseSendEmailAgain.status === 200) {
          toast.success("Authentication Login Success", {
            type: "success",
            theme: "colored",
            autoClose: 2500,
          });
          const responseAuth = await promiseSendEmailAgain.json();
          setSuccess(true);
          window.localStorage.setItem(
            "login-web",
            JSON.stringify(responseAuth)
          );
        }
        if (promiseSendEmailAgain.status >= 400) {
          toast.error("Authentication Login Failed", {
            type: "error",
            theme: "colored",
            autoClose: 2500,
          });
          const responseError = await promiseSendEmailAgain.json();
          setResponseLogin({ data: [], error: responseError });
        }
      })();
    }
  };

  const HandleSendAgainEmail = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bodys = Object.fromEntries(formData.entries());

    (async () => {
      const SendEmailAgain = fetch(
        `${config.API_URL}verification/sendagainmail`,
        {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json",
            "x-api-key": config.API_KEY,
          }),
          body: JSON.stringify(bodys),
        }
      );

      const promiseSendEmailAgain = await toast.promise(SendEmailAgain, {
        pending: {
          render() {
            return <span>Loading...</span>;
          },
          type: "warning",
        },
      });

      if (promiseSendEmailAgain.status === 200) {
        const res = await promiseSendEmailAgain.json();
        toast.success(res?.message, {
          type: "success",
          theme: "colored",
          autoClose: 2500,
        });
        setResponseLogin({ data: [], error: null });
      }

      if (promiseSendEmailAgain.status >= 400) {
        const res = await promiseSendEmailAgain.json();
        toast.error(res?.message, {
          type: "error",
          theme: "colored",
          autoClose: 2500,
        });
        setResponseLogin({ data: [], error: res });
      }
    })();
  };
  if (success) return <Navigate to={"/dasboard"} />;

  return (
    <AnimateZoomIn>
      <div className="page">
        <div
          className="page-single"
          onClick={() => Switcherdatacustam.Swichermainrightremove()}
        >
          <div className="container">
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={12}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <a href="/">
                          <span className="dark-layout">
                            <img
                              src={logoOxalusDark}
                              className="sign-favicon ht-40"
                              alt="logo"
                            />
                          </span>
                          <span className="light-layout">
                            <img
                              src={logoOxalus}
                              className="sign-favicon ht-40"
                              alt="logo"
                            />
                          </span>
                        </a>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <h2>Welcome back!</h2>
                          <h6 className="font-weight-semibold mb-4">
                            Please sign in to continue.
                          </h6>
                          <AlertRouteLogin keys={keys as string} />
                          {responseLogin.error && (
                            <Alert
                              className="alert alert-dismissible fade show "
                              variant="danger"
                            >
                              <span>{responseLogin.error?.message}</span>
                              {responseLogin.error?.data && (
                                <>
                                  <div className="d-flex justify-content-center mt-3 p-0">
                                    {responseLogin.error?.data && (
                                      <>
                                        <Form onSubmit={HandleSendAgainEmail}>
                                          <input
                                            type="hidden"
                                            name="email"
                                            defaultValue={
                                              responseLogin?.error?.data?.email
                                            }
                                          />
                                          <Button
                                            type="submit"
                                            variant="primary"
                                            size="sm"
                                          >
                                            Click For Verify Email
                                          </Button>
                                        </Form>
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                            </Alert>
                          )}
                          <div className="panel panel-primary">
                            <div className="tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                <div
                                  className="panel-body tabs-menu-body border-0 p-0"
                                  id="tab5"
                                >
                                  <Form
                                    onSubmit={(event) => LoginAuth(event)}
                                    method="POST"
                                  >
                                    <Form.Group className="form-group">
                                      <Form.Label>Email</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        required
                                      />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                      <Form.Label>Password</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your password"
                                        type="password"
                                        name="password"
                                        required
                                      />
                                    </Form.Group>
                                    <Col>
                                      <ReCAPTCHA
                                        className="d-flex justify-content-center mb-3"
                                        sitekey={config.SITE_KEY}
                                        ref={chaptaRef}
                                      />
                                    </Col>
                                    <Button
                                      variant=""
                                      type="submit"
                                      className="btn btn-primary btn-block"
                                    >
                                      Sign In
                                    </Button>
                                  </Form>
                                </div>
                              </div>
                            </div>
                            <div className="panel-body tabs-menu-body border-0 p-3">
                              <div className="tab-content"></div>
                            </div>
                          </div>
                          <div className="main-signin-footer text-center mt-3">
                            <p>
                              <Link
                                to={"/auth/reset-password"}
                                className="mb-3"
                              >
                                Forgot password?
                              </Link>
                            </p>
                            <p>
                              Don't have an account?{" "}
                              <Link to={`/auth/register`}>
                                Create an Account
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </AnimateZoomIn>
  );
}
