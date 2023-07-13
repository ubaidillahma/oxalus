import React from "react";
import { Col, Tab, Tabs } from "react-bootstrap";
import { itemsTabs } from "./ServiceTabsSignal";

const TabsComponent = () => {
  return (
    <React.Fragment>
      <Col xl={12}>
        <div className="mg-b-20" id="tabs-style2 border-0">
          <div className="p-3">
            <div className="d-flex">
              <div className="main-content-label mg-b-5">Filter Signals</div>
            </div>
          </div>
          <div className="text-wrap">
            <div className="example">
              <div className="panel panel-primary tabs-style-1">
                <div className="tab-menu-heading p-3">
                  <div className="tabs-menu1">
                    <Tabs
                      defaultActiveKey={itemsTabs[0].key}
                      className="panel-tabs main-nav-line"
                    >
                      {itemsTabs?.map((values, key) => (
                        <Tab
                          key={key}
                          eventKey={values.key}
                          title={values.title}
                        >
                          {values?.content}
                        </Tab>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};
export default TabsComponent;
