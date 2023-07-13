import React from "react";
import { ContextAuth } from "../Context/App";
import config from "../../../config";
import { Card, Col, Container, Row } from "react-bootstrap";
import logodImages from "../../../assets/logod.png";
import * as FaIcons from "react-icons/fa6";
import { motion } from "framer-motion";
import { TableDataReferal } from "./TableDataReferral";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

type StateComponent = {
  data?: any;
  referral?: [];
};

function GetListReferral(props: { token: string }) {
  const [listReferral, setListRefferal] = React.useState<StateComponent>();
  const [loading, setLoading] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  const getRefferal = async () => {
    const referral = await fetch(`${config.API_URL}referral/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY,
        AUTHORIZATION: "Bearer " + props?.token,
      },
    });
    if (referral?.status === 200) {
      const referrals = (await referral.json()) as StateComponent;
      setListRefferal({ data: referrals?.data, referral: referrals?.referral });
      setLoading(true);
    }
  };

  const handleCopy = () => {
    setCopy(true);
    toast.info("Copied", {
      theme: "dark",
      autoClose: 1500,
    });
  };

  const handleWithdrawal = async () => {
    //alert under development
    toast.info("Features Withdrawal Under Development", {
      theme: "dark",
      autoClose: 1500,
    });
  };

  React.useEffect(() => {
    getRefferal();
  }, []);

  return (
    <React.Fragment>
      {!loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <h3 className="text-warning">LOADING...</h3>
        </div>
      )}
      {loading && (
        <React.Fragment>
          <Container fluid style={{ padding: "10px" }}>
            <Card className="sales-card shadow-lg mt-3 mb-0">
              <Card.Body>
                <Row className="row-cols row-cols-xxl-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1">
                  <Col lg={8} xxl={8} md={12} className="align-self-center">
                    <div className="mb-2">
                      <span className="fw-bold fs-4">Oxalus</span>
                      {"  "}
                      <span className="fs-6 text-warning">
                        Referral Program
                      </span>
                    </div>
                    <p>
                      Earn income from referring people to use and subscribe our
                      platform Oxalus Signal by sharing your unique referral
                      code, every person you refer who purchases a premium
                      subscription package will earn you a generous commission
                      of 20%.
                    </p>
                    <span className="text-warning">Your Referral Code</span>
                    <div className="d-flex gap-3 mt-2">
                      <CopyToClipboard
                        text={`${listReferral?.data?.ref_code}`} // copy text Refferal
                        onCopy={async () => handleCopy()}
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="btn btn-lg"
                          style={{ backgroundColor: "#383D52" }}
                        >
                          <div className="d-flex gap-2">
                            <span className="text-warning">
                              {listReferral?.data?.ref_code}
                            </span>
                            <div className="vr text-white"></div>
                            <FaIcons.FaCopy color="white" size={22} />
                          </div>
                        </motion.button>
                      </CopyToClipboard>
                      <CopyToClipboard
                        text={`https://signal.oxalus.trade/auth/register?ref=${listReferral?.data?.ref_code}`} //Copy Text Refferal
                        onCopy={async () => handleCopy()}
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="btn btn-lg"
                          style={{ backgroundColor: "#383D52" }}
                        >
                          <div className="d-flex gap-2">
                            <span className="text-warning">Register Link</span>
                            <div className="vr text-white"></div>
                            <FaIcons.FaCopy color="white" size={22} />
                          </div>
                        </motion.button>
                      </CopyToClipboard>
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    xxl={4}
                    className="d-none d-xxl-block d-xl-block d-lg-block"
                  >
                    <img
                      src={logodImages}
                      className="d-block mx-auto"
                      width={200}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row className="row-cols row-cols-lg-2 row-cols-xxl-3">
              <Col lg={4} xl={4} xxl={4} md={12} sm={12}>
                <Card className="sales-card shadow-lg mt-3 mb-0">
                  <Row>
                    <div className="col-6">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h5 className="mb-2 tx-14 ">Available Balance</h5>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <div className="fs-2 align-self-center rf-text-yellow">
                              $ {listReferral?.data.balance}
                            </div>
                          </div>
                          <p className="mb-0 tx-12 text-muted">
                            Available withdrawal
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="text-center overflow-hidden"
                        style={{
                          width: "100%",
                          margin: "0",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          msTransform: "translateY(-50%)",
                        }}
                      >
                        <button
                          className="btn btn-sm rf-bg-yellow align-self-center"
                          onClick={() => handleWithdrawal()}
                        >
                          Withdrawal
                        </button>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
              <Col lg={4} xl={4} xxl={4} md={12} sm={12}>
                <Card className="sales-card shadow-lg mt-3 mb-0">
                  <Row>
                    <div className="col-6">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h5 className="mb-2 tx-14 ">Total Earning</h5>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <div className="fs-2 align-self-center rf-text-yellow">
                              $ {listReferral?.data?.total_earning}
                            </div>
                          </div>
                          <p className="mb-0 tx-12 text-muted">
                            Earning commission
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="text-center overflow-hidden"
                        style={{
                          width: "100%",
                          margin: "0",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          msTransform: "translateY(-50%)",
                        }}
                      >
                        <button className="btn btn-sm rf-bg-yellow align-self-center">
                          Check Earn
                        </button>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
              <Col g={4} xl={4} xxl={4} md={12} sm={12}>
                <Card className="sales-card shadow-lg mt-3 mb-0">
                  <Row>
                    <div className="col-12">
                      <div className="ps-4 pt-4 pe-3 pb-4">
                        <div className="">
                          <h5 className="mb-2 tx-14 ">Total Refrral's</h5>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <div className="fs-2 align-self-center rf-text-yellow">
                              {listReferral?.data?.total_ref}
                            </div>
                          </div>
                          <p className="mb-0 tx-12 text-muted">
                            Total Member Refferal
                          </p>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Card>
              </Col>
            </Row>
            <TableDataReferal referral={listReferral?.referral} />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default function Referral() {
  const authContext = React.useContext(ContextAuth) as any;
  return <GetListReferral token={authContext?.auth_info?.token} />;
}
