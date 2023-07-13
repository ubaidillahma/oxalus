import React, { Fragment, useEffect } from "react";
import { Navigate, Outlet, useRouteLoaderData } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../../../redux/store/store";
import Headers from "./HeadersOxalus/Headers";
import { ContextApp, ContextAuth } from "../Context/App";
import config from "../../../config";
import { toast } from "react-toastify";
import { ServiceMemberInfo } from "../../interface/ServicesInterface";
import { SkeletonTheme } from "react-loading-skeleton";
import SidebarOxalus from "./SidebarOxalus";
import RightSidebarOxalus from "./ReghtSidebar";
import SwitcherOxalus from "./SwitcherOxalus";
import FooterOxalus from "./FooterOxalus";
import TopOxalus from "./TopOxalus";
import LoaderOxalus from "./LoaderOxalus";

interface StateLayout {
  tokenExpired: boolean;
  auth: any;
  loading: boolean;
  infoMember?: ServiceMemberInfo;
  notifications?: any;
}

const HandleRoute = () => {
  const loader = useRouteLoaderData("dasboard-id");
  return <></>;
};

export default class LayoutDasboard extends React.Component<any, StateLayout> {
  constructor(props: any) {
    super(props);
    this.Sidebargone = this.Sidebargone.bind(this);
    this.state = {
      tokenExpired: false,
      loading: false,
      auth: JSON.parse(window.localStorage.getItem("login-web") as string),
    };
    this.HanldeRoute = this.HanldeRoute.bind(this);
  }

  responsiveSidebarclose = () => {
    if (window.innerWidth < 992) {
      document.querySelector(".app")?.classList.remove("sidenav-toggled");
    }
    document.querySelector(".sidebar-right")?.classList.remove("sidebar-open");
    document.querySelector(".demo_changer")?.classList.remove("active");
    let Rightside: any = document.querySelector(".demo_changer");
    Rightside.style.right = "-270px";
  };

  private Sidebargone(gone: any) {
    if (gone.matches) {
      // If media query matches
      document.querySelector("body")?.classList.add("sidebar-gone");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-gone");
      document.querySelector("body")?.classList.remove("sidenav-toggled");
    }
  }

  public componentDidMount(): void {
    (async () => {
      try {
        const infoGet = await fetch(`${config.API_URL}member/info`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-api-key": config.API_KEY,
            AUTHORIZATION: "Bearer " + this.state.auth?.token,
          },
        });

        if (infoGet.status === 200) {
          const member = await infoGet.json();
          this.setState({
            infoMember: member?.data,
            loading: true,
            notifications: member?.notification,
          });
        }

        if (infoGet.status >= 400) {
          toast.warning("Authentication Token Expired...", {
            theme: "colored",
            autoClose: 2000,
          });
          window.localStorage.removeItem("login-web");
          this.setState({ tokenExpired: true });
          window.location.href = "/auth/login";
        }
      } catch (error) {}
    })();
  }

  protected HanldeRoute() {}

  render(): React.ReactNode {
    document
      .querySelector("body")
      ?.classList.add("ltr", "main-body", "app", "sidebar-mini");
    document
      .querySelector("body")
      ?.classList.remove("error-page1", "bg-primary");
    document
      .querySelector("body")
      ?.classList.add("ltr", "main-body", "app", "sidebar-mini");
    document
      .querySelector("body")
      ?.classList.remove("error-page1", "bg-primary");
    document
      .querySelector(".app")
      ?.classList.add(window.localStorage.getItem("thema") as string);
    document.querySelector(".app")?.classList.add("dark-theme");

    var gone = window.matchMedia("(max-width: 1024px)");
    const context = this.context as any;
    this.Sidebargone(gone);
    gone.addListener(this.Sidebargone);

    return (
      <Fragment>
        <HandleRoute />
        <SkeletonTheme baseColor="#0A2647" highlightColor="#525252">
          <ContextAuth.Provider
            value={
              {
                auth_info: this.state.auth,
                data: this.state.infoMember,
                notifMember: this.state.notifications,
              } as any
            }
          >
            {this.state.tokenExpired ? (
              <>
                <Navigate to={"/auth/login"} />
              </>
            ) : (
              <Provider store={Store}>
                <div className="horizontalMenucontainer">
                  <TopOxalus />
                  <div className="page">
                    <div className="open">
                      <Headers member={this.state.infoMember as any} />
                      <SidebarOxalus />
                    </div>
                    <div
                      className="main-content app-content"
                      onClick={() => {
                        this.responsiveSidebarclose();
                      }}
                    >
                      <div className="side-app">
                        <div className="main-container container-fluid">
                          {!this.state.loading ? <LoaderOxalus /> : <Outlet />}
                        </div>
                      </div>
                    </div>
                    <RightSidebarOxalus />
                    <SwitcherOxalus />
                    <FooterOxalus />
                  </div>
                </div>
              </Provider>
            )}
          </ContextAuth.Provider>
        </SkeletonTheme>
      </Fragment>
    );
  }
}

LayoutDasboard.contextType = ContextApp;
