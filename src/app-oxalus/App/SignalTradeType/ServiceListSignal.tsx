import React from "react";
import { Button, Modal } from "react-bootstrap";
import config from "../../../config";
import { ContextAuth } from "../Context/App";
import { Row, Col, Card } from "react-bootstrap";
import { ServiceSignalList } from "../../interface/ServicesInterface";
import { SkeltonLoadingCard } from "../Skelton/SkeltonLoadingCard";
import Pagination from "../Pagination/Pagination";
import { prettyDate, ucfirst } from "../../Helper/helps";
import ModalSignal from "../Pages/Modal/ModalSignalById";
import { Signalnotfound } from "../../NotFound/Signalnotfound";

const ServiceListSignal = () => {
  const [loadSkelton, setLoadSkelton] = React.useState(false);
  const [listSignal, setListSignal] = React.useState<
    ServiceSignalList[]
  >() as any;
  const [modal, setModal] = React.useState(false);
  const [items, setItems] = React.useState<{ data: any }>();
  const authContext = React.useContext(ContextAuth) as any;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listSignal?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(listSignal?.length / postsPerPage);

  React.useEffect(() => {
    setTimeout(async () => {
      const getSignal = await fetch(`${config.API_URL}signal/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.API_KEY,
          AUTHORIZATION: "Bearer " + authContext?.auth_info.token,
        },
      });
      if (getSignal.status === 200) {
        const responseSignal = await getSignal.json();
        setLoadSkelton(true);
        setListSignal(responseSignal?.data);
      }
    }, 2000);
  }, []);

  const TypeStatus = (props: { type: string }) => {
    switch (props.type) {
      case "expired":
        return <span className="text-danger">{ucfirst(props?.type)}</span>;
      case "pending":
        return <span className="text-warning">{ucfirst(props?.type)}</span>;
      case "active":
        return <span className="text-success">{ucfirst(props?.type)}</span>;
      default:
        return <span className="">{ucfirst(props?.type)}</span>;
    }
  };

  const handleClickCard = (props: any) => {
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
      {!loadSkelton ? (
        <SkeltonLoadingCard count={12} />
      ) : (
        <>
          {listSignal?.length === 0 ? (
            <Signalnotfound />
          ) : (
            <>
              <Row>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                  <Row className="row-cols-xxl-3">
                    {currentPosts?.map((values: any, idx: number) => (
                      <Col xl={3} lg={12} md={12} xs={12} key={idx}>
                        <Card
                          className="sales-card"
                          style={{ cursor: "pointer" }}
                          onClick={async () => handleClickCard(values)}
                        >
                          <Row>
                            <div className="col-8">
                              <div className="ps-4 pt-4 pe-3 pb-4">
                                <div className="d-flex justify-content-between">
                                  <h6 className="mb-2 tx-12">
                                    <TypeStatus type={values?.status} />
                                  </h6>
                                  <span>ng</span>
                                </div>
                                <div className="pb-0 mt-0">
                                  <div className="d-flex">
                                    <h4 className="tx-22 font-weight-semibold mb-2">
                                      {values?.pair}
                                    </h4>
                                  </div>
                                  <p className="mb-0 tx-12  text-muted">
                                    <span className="pe-2">Create At</span>
                                    <span className="text-warning font-weight-semibold">
                                      {prettyDate(values?.created_at)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                                {values?.signals_type === "buy" ? (
                                  <>
                                    <i className="bi bi-arrow-up-circle tx-16 text-success"></i>
                                  </>
                                ) : (
                                  <i className="bi bi-arrow-down-circle tx-16 text-danger"></i>
                                )}
                              </div>
                            </div>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
      {loadSkelton && (
        <>
          {(currentPosts?.length as number) > 8 && (
            <div className="mb-3 w-100">
              <Pagination
                pages={howManyPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
      <ModalSignal
        show={modal}
        callback={setModal}
        items={items}
        close={setItems}
      />
    </React.Fragment>
  );
};

export default ServiceListSignal;
