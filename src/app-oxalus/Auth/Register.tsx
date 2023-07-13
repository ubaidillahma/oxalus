import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Row, Alert } from "react-bootstrap";
import { AnimateZoomIn } from "../App/SlideAnimation/SlideZoomIn";
import logoOxalus from "../../assets/logo_oxalus.png";
import logoOxalusDark from "../../assets/oxalus-base-dark.png";
import Select from "react-select";
import config from "../../config";
import { ucfirst } from "../Helper/helps";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [listCountry, setListCountry] = React.useState(Array);
  const [error, setError] = React.useState<any>();
  const routesChanges = useNavigate();
  const chaptaRef = React.useRef<ReCAPTCHA>(null);

  //get ref
  const ref = window.location.search;
  const urlParams = new URLSearchParams(ref);
  const referrer = urlParams.get("ref");
  if (referrer) {
    localStorage.setItem("ref", referrer);
  } else {
    if (!localStorage.getItem("ref")) {
      localStorage.setItem("ref", "");
    }
  }

  const referral = localStorage.getItem("ref");
  //set input referral

  React.useEffect(() => {
    (async () => {
      const GetCountry = await fetch(`${config.API_URL}getcountry`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.API_KEY,
        },
      });
      if (GetCountry.status === 200) {
        const responses = await GetCountry.json();
        var dataOptions = new Array();
        responses?.data.forEach((values: any, key: number) => {
          dataOptions.push({
            value: values?.name,
            label: ucfirst(values?.name),
          });
        });
        setListCountry(dataOptions);
      }
    })();
  }, []);

  const HandleSubmitRegister = (event: any) => {
    event.preventDefault();
    if (chaptaRef.current?.getValue() === "") {
      toast.error("Please Verify Captcha", {
        type: "error",
        autoClose: 2000,
        theme: "colored",
      });
    }

    if (chaptaRef.current?.getValue() !== "") {
      const formData = new FormData(event?.target);
      const bodys = Object.fromEntries(formData);
      (async () => {
        const ResgiterPost = fetch(`${config.API_URL}member/register`, {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json",
            "x-api-key": config.API_KEY,
          }),
          body: JSON.stringify(bodys),
        });

        const promiseRegister = await toast.promise(ResgiterPost, {
          pending: {
            render() {
              return <span>Loading...</span>;
            },
            type: "warning",
          },
        });
        if (promiseRegister.status === 200) {
          toast.success("Register Account Success", {
            type: "success",
            theme: "colored",
            autoClose: 2500,
          });
          const responseAuth = await promiseRegister.json();
          routesChanges("/auth/login");
        }
        if (promiseRegister.status >= 400) {
          const responseError = await promiseRegister.json();
          toast.error(
            responseError?.message
              ? responseError?.message
              : "Register Account Failed",
            {
              type: "error",
              theme: "colored",
              autoClose: 2500,
            }
          );
          setError(responseError?.errors);
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
                <div className="card-sigin ">
                  {/* <!-- Demo content--> */}
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="">
                        <div className="main-Register-header">
                          <h2 className="text-dark">Get Started</h2>
                          <h6 className="font-weight-normal mb-4">
                            It's free to Register and only takes a minute.
                          </h6>
                          {error && (
                            <Alert
                              className="alert alert-dismissible fade show "
                              variant="danger"
                            >
                              {Object.entries(error).map((val: any, idx) => (
                                <li key={idx}>
                                  {ucfirst(val[0])} : {val[1]}
                                </li>
                              ))}
                            </Alert>
                          )}
                          <Form onSubmit={HandleSubmitRegister}>
                            <FormGroup className="form-group">
                              <Form.Label>Fullname</Form.Label>{" "}
                              <Form.Control
                                className="form-control"
                                name="name"
                                placeholder="Enter your Fullname"
                                type="text"
                                required
                              />
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Email</Form.Label>{" "}
                              <Form.Control
                                className="form-control"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                                required
                              />
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Password</Form.Label>{" "}
                              <Form.Control
                                className="form-control"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                required
                              />
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Confirm Password</Form.Label>{" "}
                              <Form.Control
                                className="form-control"
                                name="confirm_password"
                                placeholder="Enter your Confirm password"
                                type="password"
                                required
                              />
                            </FormGroup>
                            <FormGroup className="SlectBox">
                              <Form.Label>Country</Form.Label>
                              <Select
                                options={listCountry}
                                className="mb-3"
                                classNamePrefix="selectform"
                                isSearchable
                                name="country"
                                placeholder="--Select Country--"
                              />
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Referral (Optional)</Form.Label>{" "}
                              <Form.Control
                                className="form-control"
                                name="referral_by"
                                placeholder="Referral e.x : OX1234"
                                type="text"
                                defaultValue={referral ? referral : ""}
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
                              variant=""
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Create Account
                            </Button>
                          </Form>
                          <div className="main-Register-footer mt-3 text-center">
                            <p>
                              Already have an account?{" "}
                              <Link to={`/auth/login`}>Sign In</Link>
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
};
Register.propTypes = {};

Register.defaultProps = {};

export default Register;
