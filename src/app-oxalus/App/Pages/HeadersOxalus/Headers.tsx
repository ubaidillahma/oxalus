import React from "react";
import { Navbar, Dropdown, Button, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "../../../../redux/actions/action";
import lighLogo from "../../../../assets/img/brand/logo-white.png";
import usersLogo from "../../../../assets/man.png";
import { ServiceMemberInfo } from "../../../interface/ServicesInterface";
import { toast } from "react-toastify";
import logoDark from "../../../../assets/logo_oxalus.png";

export default function Headers(props: { member: ServiceMemberInfo }) {
  const [Lang, setLang] = React.useState(false);
  const [fullscreens, setFullscreen] = React.useState(true);

  // FullScreen
  var elem: any = document.documentElement;
  const Fullscreen: any = (vale: any) => {
    switch (vale) {
      case true:
        elem.requestFullscreen();
        setFullscreen(false);
        break;
      case false:
        document.exitFullscreen();
        setFullscreen(true);
        break;
    }
  };

  //leftsidemenu
  const openCloseSidebar = () => {
    document.querySelector("body")?.classList.toggle("sidenav-toggled");
  };
  //rightsidebar
  const Rightsidebar = () => {
    document.querySelector(".sidebar-right")?.classList.add("sidebar-open");
  };
  document
    .querySelector(".app")
    ?.classList.add(window.localStorage.getItem("thema") as string);
  const Darkmode = () => {
    const dark = document.querySelector(".app")?.classList.toggle("dark-theme");
    if (dark) {
      window.localStorage.setItem("thema", "dark-theme");
    } else {
      window.localStorage.setItem("thema", "light-theme");
    }
    //document.querySelector(".app")?.classList.remove("light-theme");
  };

  // responsivesearch
  const responsivesearch = () => {
    document.querySelector(".navbar-form")?.classList.toggle("active");
  };
  //swichermainright
  const swichermainright = () => {
    document.querySelector(".demo_changer")?.classList.toggle("active");
    let rightSidebar: any = document.querySelector(".demo_changer");
    rightSidebar.style.right = "0px";
  };
  const [price, setPrice] = React.useState(0);
  // console.log(price);

  let getdata: any = useSelector((state: any) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open: any = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const [Data, setData] = React.useState([]);

  const { id } = useParams();

  const compare = () => {
    let comparedata = getdata.map((e: any) => {
      return e.id === id;
    });
    setData(comparedata);
  };

  React.useEffect(() => {
    compare();
  }, [id]);

  const ondelete = (id: any) => {
    dispatch(Delete(id));
  };

  function total() {
    let price = 0;
    getdata.map((ele: any) => {
      price = ele.price * ele.qnty + price;
      return price;
    });
    setPrice(price);
  }

  React.useEffect(() => {
    total();
  });

  const routeChanges = useNavigate();

  const LogoutUser = () => {
    toast.warning("Process Logout...", {
      theme: "colored",
      autoClose: 2000,
    });
    setTimeout(() => {
      window.localStorage.removeItem("login-web");
      routeChanges("/auth/login");
    }, 2000);
  };

  return (
    <Navbar className="main-header side-header sticky nav nav-item">
      <div className="main-container container-fluid">
        <div className="main-header-left ">
          <div className="responsive-logo">
            <Link
              to={"/dasboard"}
              className="header-logo"
              style={{ alignItems: "center" }}
            >
              <img
                src={logoDark}
                width={150}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={logoDark}
                width={150}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          <div
            className="app-sidebar__toggle"
            data-bs-toggle="sidebar"
            onClick={() => openCloseSidebar()}
          >
            <Link className="open-toggle" to="#" type="button">
              <i className="header-icon fe fe-align-left"></i>
            </Link>
            <Link className="close-toggle" to="#">
              <i className="header-icon fe fe-x"></i>
            </Link>
          </div>
          <div className="logo-horizontal">
            <Link
              to={`/dasboard`}
              className="header-logo"
              style={{ alignItems: "center" }}
            >
              <img
                src={logoDark}
                width={150}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={logoDark}
                width={150}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="main-header-right">
          <Navbar.Toggle
            className="navresponsive-toggler d-lg-none ms-auto"
            type="button"
          >
            <span className="navbar-toggler-icon fe fe-more-vertical"></span>
          </Navbar.Toggle>
          <div className="mb-0 navbar navbar-expand-lg   navbar-nav-right responsive-navbar navbar-dark p-0">
            <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
              <ul className="nav nav-item header-icons navbar-nav-right ">
                {/* <li className="dropdown nav-item">
                  <Link
                    to="#"
                    className="new nav-link theme-layout nav-link-bg layout-setting"
                    onClick={() => Darkmode()}
                  >
                    <span className="dark-layout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" />
                      </svg>
                    </span>
                    <span className="light-layout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" />
                      </svg>
                    </span>
                  </Link>
                </li> */}
                <li
                  className="nav-item full-screen fullscreen-button"
                  onClick={() => Fullscreen(fullscreens)}
                >
                  <Link className="new nav-link full-screen-link" to="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="header-icon-svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
                    </svg>
                  </Link>
                </li>
                <li
                  className="dropdown main-header-message right-toggle"
                  onClick={() => Rightsidebar()}
                >
                  <Link
                    to="#"
                    className="new nav-link nav-link pe-0"
                    data-bs-toggle="sidebar-right"
                    data-bs-target=".sidebar-right"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="header-icon-svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
                    </svg>
                  </Link>
                </li>
                {/* <li className="nav-link search-icon d-lg-none d-block">
                  <Form
                    className="navbar-form"
                    role="search"
                    onClick={() => responsivesearch()}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <span className="input-group-btn">
                        <Button
                          variant=""
                          type="reset"
                          className="btn btn-default"
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                        <Button
                          variant=""
                          className="btn btn-default nav-link resp-btn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            className="header-icon-svgs"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </svg>
                        </Button>
                      </span>
                    </div>
                  </Form>
                </li> */}
                <Dropdown className=" main-profile-menu nav nav-item nav-link ps-lg-2">
                  <Dropdown.Toggle
                    className="new nav-link profile-user d-flex"
                    variant=""
                  >
                    <img alt="" src={usersLogo} className="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="menu-header-content p-3 border-bottom">
                      <div className="d-flex wd-100p">
                        <div className="main-img-user">
                          <img alt="" src={usersLogo} className="" />
                        </div>
                        <div className="ms-3 my-auto">
                          <h6 className="tx-15 font-weight-semibold mb-0">
                            {props.member?.name?.substring(0, 12)}
                          </h6>
                          <span className="dropdown-title-text subtext text-success op-6  tx-12">
                            {props.member?.subscription_active === null ? (
                              <span className="text-danger">No Package</span>
                            ) : (
                              <span className="text-success">
                                {props.member?.subscription_active
                                  .payment_method === "system" ? (
                                  <span className="text-info">
                                    Package Free
                                  </span>
                                ) : (
                                  <span className="text-warning fw-bold">
                                    Premium Member
                                  </span>
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Dropdown.Item
                      className="dropdown-item"
                      href={"/dasboard/setting"}
                    >
                      <i className="far fa-sun"></i> Settings
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item"
                      onClick={LogoutUser}
                    >
                      <i className="far fa-arrow-alt-circle-left"></i> Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </Navbar.Collapse>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

Headers.propTypes = {};

Headers.defaultProps = {};
