import React from "react";
import { Row } from "react-bootstrap";
import TabsComponent from "../SignalTradeType/TabsComponent";
import { Navigate } from "react-router-dom";
import { ContextAuth } from "../Context/App";
import { SignalToday } from "../SignalTradeType/Signal/SIgnalToday";

export default function IndexDasboard() {
  const authContext = React.useContext(ContextAuth) as any;

  if (authContext?.data?.subscription_active === null)
    return <Navigate to="/dasboard/subscription" />;

  return (
    <React.Fragment>
      <div className="breadcrumb-header justify-CONTENT-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Signal Today
          </span>
        </div>
      </div>

      <div className="text-wrap">
        <div className="example">
          <div className="panel panel-primary tabs-style-1">
            <SignalToday />
          </div>
        </div>
      </div>
      <Row>
        <TabsComponent />
      </Row>
    </React.Fragment>
  );
}
