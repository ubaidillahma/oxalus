import React from "react";
import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import Skelton from 'react-loading-skeleton';

export default function RightSidebarOxalus() {

  function Remove() {
    document.querySelector(".sidebar-right")?.classList.remove("sidebar-open");
  }

  return (
    <div>
      <div className="sidebar sidebar-right sidebar-animate">
        <div className="panel panel-primary card mb-0 box-shadow">
          <div className="tab-menu-heading card-img-top-1 border-0 p-3">
            <div className="card-title mb-0">Notifications</div>
            <div className="card-options ms-auto">
              <Link to="#" className="sidebar-remove" onClick={() => Remove()}>
                <i className="fe fe-x"></i>
              </Link>
            </div>
          </div>
          <div className="panel-body tabs-menu-body latest-tasks p-0 border-0">
            <div className="tabs-menu ">
              <Tab.Container id="left-tabs-example" defaultActiveKey="side1">
                <Tab.Content>
                  <Tab.Pane eventKey="side1" className="side1">
                    <Scrollbars style={{ height: "800px" }}>
                      <div className="tab-pane" id="side1">
                        {
                          Array(7).fill(0).map((_, idx) => (
                            <div className="list d-flex align-items-center border-bottom p-3" key={idx}>
                              <div className="">
                                <Skelton width={60} height={60} borderRadius={10}/>
                              </div>
                              <Link className="wrapper w-100 ms-3" to="#">
                                <p className="mb-0 d-flex w-50 ">
                                  <Skelton width={120} height={15} borderRadius={5}/>
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <small className="text-muted ms-auto">
                                    <Skelton width={90} height={12} borderRadius={5}/>
                                    </small>
                                    <p className="mb-0"></p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))
                        }
                      </div>
                    </Scrollbars>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
RightSidebarOxalus.propTypes = {};
RightSidebarOxalus.defaultProps = {};
