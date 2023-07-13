import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import logoDark from "../../../assets/oxalus-base-dark.png";
import logoLight from "../../../assets/logo_oxalus.png";
import favDark from "../../../assets/img/brand/favicon.png";
import favLight from "../../../assets/img/brand/favicon-white.png";
import { toast } from "react-toastify";
import * as Fa6 from 'react-icons/fa6';

const SidebarOxalus = () => {
  const [logout, setLogout] = React.useState(false);

  function Onhover() {
    if (document.querySelector(".app")) {
      if (document.querySelector(".app")?.classList.contains("sidenav-toggled"))
        document.querySelector(".app")?.classList.add("sidenav-toggled-open");
    }
  }
  function Outhover() {
    if (document.querySelector(".app")) {
      document.querySelector(".app")?.classList.remove("sidenav-toggled-open");
    }
  }

  const LogoutUser = () => {
    toast.warning("Process Logout...", {
      theme: "colored",
      autoClose: 2000,
    });

    setTimeout(() => {
      window.localStorage.removeItem("login-web");
      setLogout(true);
    }, 2000);
  };

  if (logout) return <Navigate to={"/auth/login"} />;

  return (
    <>
      <div className="sticky">
        <aside
          className="app-sidebar "
          onMouseOver={() => Onhover()}
          onMouseOut={() => Outhover()}
        >
          <Scrollbars className="hor-scroll" style={{ position: "absolute" }}>
            <div className="main-sidebar-header active">
              <NavLink className="header-logo active" to={`/dasboard`}>
                <img
                  src={logoDark}
                  className="main-logo  desktop-logo"
                  alt="logo"
                />
                <img
                  src={logoLight}
                  className="main-logo  desktop-dark"
                  alt="logo"
                />
                <img
                  src={favDark}
                  className="main-logo  mobile-logo"
                  alt="logo"
                />
                <img
                  src={favLight}
                  className="main-logo  mobile-dark"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="main-sidemenu">
              <div className="slide-left disabled" id="slide-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                </svg>
              </div>
              <ul className="side-menu">
                <React.Fragment>
                  <li className="side-item side-item-category">Submission</li>
                  <li className="slide pb-4">
                    <NavLink to={"/dasboard/"} className={"side-menu__item"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="side-menu__icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
                      </svg>
                      <span className="side-menu__label">Dasboard</span>
                    </NavLink>
                  </li>
                  <li className="slide pb-4">
                    <NavLink
                      to={"/dasboard/subscription"}
                      className={"side-menu__item"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="side-menu__icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M20 17V7c0-2.168-3.663-4-8-4S4 4.832 4 7v10c0 2.168 3.663 4 8 4s8-1.832 8-4zM12 5c3.691 0 5.931 1.507 6 1.994C17.931 7.493 15.691 9 12 9S6.069 7.493 6 7.006C6.069 6.507 8.309 5 12 5zM6 9.607C7.479 10.454 9.637 11 12 11s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2V9.607zM6 17v-2.393C7.479 15.454 9.637 16 12 16s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2z" />
                      </svg>
                      <span className="side-menu__label">Subscription</span>
                    </NavLink>
                  </li>
                  <li className="slide pb-4">
                    <NavLink
                      to={"/dasboard/setting"}
                      className={"side-menu__item"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="side-menu__icon"
                        viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                      </svg>
                      <span className="side-menu__label">Setting</span>
                    </NavLink>
                  </li>
                  <li className="slide pb-4">
                    <NavLink
                      to={"/dasboard/history-subscription"}
                      className={"side-menu__item"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="side-menu__icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                      </svg>
                      <span className="side-menu__label">
                        History Subscription
                      </span>
                    </NavLink>
                  </li>
                  <li className="slide pb-4">
                    <NavLink
                      to={"/dasboard/referral"}
                      className={"side-menu__item"}>
                      <Fa6.FaChildren size={22} style={{marginRight: '12px'}}/>
                      <span className="side-menu__label">
                       Referral
                      </span>
                    </NavLink>
                  </li>
                </React.Fragment>
              </ul>
              <div className="slide-right" id="slide-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                </svg>
              </div>
            </div>
          </Scrollbars>
        </aside>
      </div>
    </>
  );
};

SidebarOxalus.propTypes = {};
SidebarOxalus.defaultProps = {};
export default SidebarOxalus;
