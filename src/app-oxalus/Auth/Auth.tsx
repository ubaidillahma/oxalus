import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Authentication = () => {
  document
    .querySelector("body")
    ?.classList.add("ltr", "main-body", "app", "sidebar-mini");
  document.querySelector("body")?.classList.remove("error-page1", "bg-primary");
  document
    .querySelector(".app")
    ?.classList.add(window.localStorage.getItem("thema") as string);
  document.querySelector(".app")?.classList.add("dark-theme");

  const tokens = window.localStorage.getItem("login-web");
  document.querySelector(".app")?.classList.add("dark-theme");
  if (tokens !== null) {
    return <Navigate to={"/dasboard"} />;
  }
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default Authentication;
