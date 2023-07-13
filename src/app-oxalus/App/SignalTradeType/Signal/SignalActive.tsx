import React from "react";
import { CardSignal } from "../../Card/CardSignal";
import { Row, Col } from "react-bootstrap";
import config from "../../../../config";
import { ContextAuth } from "../../Context/App";
import { ServiceSignalList } from "../../../interface/ServicesInterface";
import { SkeltonLoadingCard } from "../../Skelton/SkeltonLoadingCard";
import Pagination from "../../Pagination/Pagination";
import { Signalnotfound } from "../../../NotFound/Signalnotfound";

const SignalActive = () => {
  const authContext = React.useContext(ContextAuth) as any;
  const [loadSkelton, setLoadSkelton] = React.useState(false);
  const [listSignal, setListSignal] = React.useState<ServiceSignalList[]>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(16);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listSignal?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil((listSignal?.length as number) / postsPerPage);

  React.useEffect(() => {
    setTimeout(async () => {
      const getSignal = await fetch(`${config.API_URL}signal/getactive`, {
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

  return (
    <React.Fragment>
      {!loadSkelton ? (
        <div className="mt-3">
          <SkeltonLoadingCard count={4} />
        </div>
      ) : (
        <>
          {listSignal?.length === 0 ? (
            <Signalnotfound />
          ) : (
            <>
              <Row className="mt-3">
                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                  <Row className="row-cols-xxl-3">
                    {currentPosts?.map((values, number) => (
                      <CardSignal signal={values} key={number} />
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
    </React.Fragment>
  );
};

export { SignalActive };
