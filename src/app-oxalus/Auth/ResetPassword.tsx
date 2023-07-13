import { Button, Col, Form, FormGroup, Row, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AnimateZoomIn } from "../App/SlideAnimation/SlideZoomIn";
import logoOxalus from "../../assets/logo_oxalus.png";
import logoOxalusDark from "../../assets/oxalus-base-dark.png";
import config from "../../config";
import { toast } from "react-toastify";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ResetPassword = () => {
  const routeChanges = useNavigate();
  const [error, setError] = React.useState<any>();
  const params = new URLSearchParams(window.location.search);
  const tokens = params.get("c");
  const chaptaRef = React.useRef<ReCAPTCHA>(null);
  if (!tokens) return <Navigate to="/auth/login" />;

  const HandleSubmitResetPassword = (event: any) => {
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
        const ResetPassword = fetch(`${config.API_URL}member/resetpassword`, {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json",
            "x-api-key": config.API_KEY,
          }),
          body: JSON.stringify(bodys),
        });

        const promiseResetPassword = await toast.promise(ResetPassword, {
          pending: {
            render() {
              return <span>Loading...</span>;
            },
            type: "warning",
          },
        });
        if (promiseResetPassword.status === 200) {
          toast.success("Reset Password Success...", {
            type: "success",
            theme: "colored",
            autoClose: 2500,
          });
          routeChanges("/auth/login");
        }

        if (promiseResetPassword.status >= 400) {
          toast.error("Reset Password Failed...", {
            type: "error",
            theme: "colored",
            autoClose: 2500,
          });
          const responseError = await promiseResetPassword.json();
          setError(responseError);
          routeChanges("/auth/login");
        }
      })();
    }
  };

  return (
    <AnimateZoomIn>
      <div className="page">
        <div className="page-single">
          <div className="container">
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={12}
                className="card-sigin-main py-4 justify-content-center mx-auto"
              >
                <div className="card-sigin">
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-3">
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
                      <div className="  mb-1">
                        <div className="main-signin-header">
                          <div className="">
                            <h2>Welcome back!</h2>
                            <h4 className="text-start">Reset Your Password</h4>
                            {error && (
                              <Alert
                                className="alert alert-dismissible fade show"
                                variant="danger"
                              >
                                <span>{error?.message}</span>
                              </Alert>
                            )}
                            <Form onSubmit={HandleSubmitResetPassword}>
                              <Form.Control
                                className="form-control"
                                name="code"
                                defaultValue={tokens as any}
                                type="hidden"
                              />
                              <FormGroup className="text-start form-group">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                  className="form-control"
                                  name="password"
                                  placeholder="Enter your new password"
                                  type="password"
                                  required
                                />
                              </FormGroup>
                              <FormGroup className="text-start form-group">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                  className="form-control"
                                  name="confirm_password"
                                  placeholder="Enter your confirm password"
                                  type="password"
                                />
                              </FormGroup>
                              <Col>
                                <ReCAPTCHA
                                  className="d-flex justify-content-center mb-3"
                                  sitekey={config.SITE_KEY}
                                  ref={chaptaRef}
                                />
                              </Col>
                              <Button
                                type="submit"
                                className="btn ripple btn-primary btn-block"
                              >
                                Reset Password
                              </Button>
                            </Form>
                          </div>
                        </div>
                        <div className="main-signup-footer mg-t-20 text-center">
                          <p>
                            Already have an account?{" "}
                            <Link to={`/auth/login`}>Sign In</Link>
                          </p>
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
};

ResetPassword.propTypes = {};

ResetPassword.defaultProps = {};

export default ResetPassword;
