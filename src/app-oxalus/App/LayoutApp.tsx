import React from "react";
import { Outlet, useNavigation, useRouteLoaderData } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ContextApp } from "./Context/App";

const LayoutApp = () => {
  const loader = useRouteLoaderData("loader-layout-app");
  const navigation = useNavigation();
  return (
    <React.Fragment>
      <ContextApp.Provider value={{ auth: loader } as any}>
        <Outlet />
        <ToastContainer />
      </ContextApp.Provider>
    </React.Fragment>
  );
};
export default LayoutApp;
