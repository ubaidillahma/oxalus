import { NavLink, useNavigate } from "react-router-dom";
import { CardGuest } from "./app-oxalus/App/Card/Guest/CardGuest";

export function IndexHome() {
  const loginActivation = window.localStorage.getItem("login-web");
  const routeChange = useNavigate();

  return (
    <>
      <div className="body-content-area" style={{ backgroundColor: "#1a0b36" }}>
        <section className="sp_banner">
          <div className="sp_banner_bottom_shape">
            <img
              alt="asfanf"
              src={require("../src/assets/landing_page/images/645b70f5a94b21683714293.png")}
            />
          </div>
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6">
                <h2
                  className="sp_banner_title wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  Crypto Trade Signals Your Trading Insights
                </h2>
                <ul
                  className="sp_check_list mt-4 wow fadeInUp text-white"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.5s"
                >
                  <li>Determine the Open Position precisely</li>
                  <li>It's like having your own Professional Trader</li>
                  <li>Get realtime trading signals from multiple platforms</li>
                  <li>No sharing profit, all profits belong to you</li>
                </ul>
                <NavLink
                  to={"/auth/login"}
                  className="btn sp_theme_btn mt-5 wow fadeInUp text-white"
                  style={{ backgroundColor: "#9c0ac1" }}
                >
                  Start Free Signal
                </NavLink>
              </div>
              <div className="col-lg-5">
                <div
                  className="sp_banner_thumb wow fadeInUp"
                  data-wow-duration="0.5s"
                  data-wow-delay="0.9s"
                >
                  <img
                    alt="asfanf"
                    src={require("../src/assets/landing_page/images/645b70f58c43e1683714293.png")}
                    className="sp_banner_img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <header className="sp_header">
          <div className="sp_header_info_bar">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 header-top-left">
                  <ul className="hc-list justify-content-lg-start justify-content-center">
                    <li>
                      <a href="mailto:support@company.com">
                        <i className="fas fa-envelope"></i> support@oxalus.trade
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 header-top-right d-lg-block d-none">
                  <ul className="hc-list justify-content-lg-end justify-content-center">
                    <li>
                      <ul className="social-icons">
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://telegram.org/">
                            <i className="fab fa-telegram-plane"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://instagram.com/">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="sp_header_main">
            <div className="container">
              <nav className="navbar navbar-expand-xl p-0 align-items-center">
                <a
                  className="site-logo site-title"
                  href="https://signalmax.springsoftit.com"
                >
                  <img
                    src={require("../src/assets/landing_page/images/oxalus-base-dark.png")}
                  />
                </a>
                <button
                  className="navbar-toggler ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mainNavbar"
                  aria-controls="mainNavbar"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="menu-toggle"></span>
                </button>
                <div
                  className="collapse navbar-collapse mt-lg-0 mt-3"
                  id="mainNavbar"
                >
                  <ul className="nav navbar-nav sp_site_menu ms-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="https://oxalus.tawk.help/">
                        Help
                      </a>
                    </li>
                  </ul>
                  {loginActivation !== null && (
                    <div className="navbar-action">
                      <button
                        onClick={async () => routeChange("/dasboard")}
                        className="btn sp_theme_btn btn-sm text-white"
                        style={{ backgroundColor: "#9c0ac1" }}
                      >
                        Account{" "}
                        <i className="las la-long-arrow-alt-right ms-2"></i>
                      </button>
                    </div>
                  )}
                  {loginActivation === null && (
                    <div className="navbar-action">
                      <button
                        onClick={async () => routeChange("/auth/login")}
                        className="me-3 text-p"
                      >
                        Sign in
                      </button>
                      <button
                        onClick={async () => routeChange("/auth/register")}
                        className="btn sp_theme_btn btn-sm text-white"
                        style={{ backgroundColor: "#9c0ac1" }}
                      >
                        Sign up{" "}
                        <i className="las la-long-arrow-alt-right ms-2"></i>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </header>
        <section className="choose-section sp_pt_120 sp_pb_120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div
                  className="sp_theme_top wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div className="sp_theme_top_caption mb-3">
                    <i className="fas fa-bolt"></i> Choose us
                  </div>
                  <h2 className="sp_theme_top_title">
                    Why Choose <span>Oxalus Trade</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row gy-4 items-wrapper justify-content-center text-white">
              <div
                className="col-lg-4 col-md-6 wow fadeInUp text-white"
                data-wow-duration="0.3s"
              >
                <div className="sp_choose_item">
                  <div className="sp_choose_icon">
                    <img
                      alt="Oxalus Trade"
                      src={require("../src/assets/landing_page/images/645b8b6befee71683721067.png")}
                    />
                    <i className="far fa-user-circle"></i>
                  </div>
                  <div className="sp_choose_content">
                    <h4 className="title">Professional Traders</h4>
                    <p className="mt-3">
                      We have a team professional traders who are experts in the
                      field of crypto trading.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-duration="0.3s"
              >
                <div className="sp_choose_item">
                  <div className="sp_choose_icon">
                    <img
                      alt="aslflamskf"
                      src={require("../src/assets/landing_page/images/645b8b88d22fe1683721096.png")}
                    />
                    <i className="far fa-chart-bar"></i>
                  </div>
                  <div className="sp_choose_content">
                    <h4 className="title">High Profit</h4>
                    <p className="mt-3">
                      Provides accurate signals for members in all
                      cryptocurrency trading pairs.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-duration="0.3s"
              >
                <div className="sp_choose_item">
                  <div className="sp_choose_icon">
                    <img
                      alt="Oxalus Trade"
                      src={require("../src/assets/landing_page/images/645b8bab65d931683721131.png")}
                    />
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div className="sp_choose_content">
                    <h4 className="title">Multi Notification</h4>
                    <p className="mt-3">
                      We provide signals via telegram, whatsapp, email and API
                      for Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-section sp_pt_120 sp_pb_120">
          <div className="about-el">
            <img
              alt="ansfjnjasfj"
              src={require("../src/assets/landing_page/images/645b90830273d1683722371.png")}
            />
          </div>
          <div className="container">
            <div className="row gy-5 align-items-center justify-content-between">
              <div className="col-lg-5">
                <div
                  className="about-thumb paroller"
                  data-paroller-factor="0.15"
                  data-paroller-factor-xs="0.0"
                  data-paroller-factor-sm="0.0"
                  data-paroller-factor-md="0.0"
                  data-paroller-type="foreground"
                  data-paroller-direction="horizontal"
                >
                  <img
                    alt="amskfahsnfu"
                    src={require("../src/assets/landing_page/images/645b9082de1dc1683722370.png")}
                  />
                </div>
              </div>
              <div
                className="col-lg-7 ps-lg-5 wow fadeInUp text-white"
                data-wow-duration="0.5s"
                data-wow-delay="0.5s"
              >
                <h2 className="sp_theme_top_title">
                  Join the Oxalus Trade <span>Community</span>
                </h2>
                <p className="fs-lg mt-3">
                  Get signal notifications to open the cryptocurrency trading
                  market without the need to do a lot of technical or
                  fundamental analysis, and join with thousands of current
                  Oxalus members who have received signals from us either from
                  Whatsapp, Telegram or the Oxalus web dashboard
                </p>
                <ul className="sp_check_list mt-4">
                  <li>No need to think about market analysis</li>
                  <li>
                    Get our realtime signal notifications from the Whatsapp,
                    Telegram or other platforms
                  </li>
                  <li>
                    Our Trading Analysts provide signals with high accuracy
                  </li>
                  <li>
                    There are no other hidden costs, all income belongs to you
                  </li>
                </ul>
                <a
                  href="https://t.me/oxalus_trade"
                  className="btn sp_theme_btn mt-4 text-white"
                  style={{ backgroundColor: "#9c0ac1" }}
                >
                  <i className="fab fa-telegram-plane"> </i> Channel Oxalus
                  Community
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="benefit-section sp_pt_120 sp_pb_120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div
                  className="sp_theme_top wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div className="sp_theme_top_caption mb-3">
                    <i className="fas fa-bolt"></i> Summary of benefits
                  </div>
                  <h2 className="sp_theme_top_title">
                    Everything you need to trade and make profits
                  </h2>
                </div>
              </div>
            </div>
            <div className="row gy-4 align-items-center text-white">
              <div
                className="col-xl-4 col-md-6 wow fadeInUp"
                data-wow-duration="0.5s"
                data-wow-delay="0.7s"
              >
                <div className="sp_benefit_item">
                  <div className="sp_benefit_icon">
                    <img
                      alt="asnjfjaf asbf"
                      src={require("../src/assets/landing_page/images/645b866696d2b1683719782.png")}
                    />
                    <i className="fab fa-searchengin"></i>
                  </div>
                  <div className="sp_benefit_content">
                    <h4 className="title">Technical analysis</h4>
                    <p className="mt-2">
                      All signal are based on technical analysis that is carried
                      out accurately and consistently tested
                    </p>
                  </div>
                </div>
                <div className="sp_benefit_item">
                  <div className="sp_benefit_icon">
                    <img
                      alt="asnjfnjaf"
                      src={require("../src/assets/landing_page/images/645b868dc03051683719821.png")}
                    />
                    <i className="far fa-user"></i>
                  </div>
                  <div className="sp_benefit_content">
                    <h4 className="title">Full Monitoring</h4>
                    <p className="mt-2">
                      All signal are monitored by our team experts for make sure
                      the signal is accurate for members
                    </p>
                  </div>
                </div>

                <div className="sp_benefit_item">
                  <div className="sp_benefit_icon">
                    <img
                      src={require("../src/assets/landing_page/images/645b86bf9c2b01683719871.png")}
                    />
                    <i className="fa fa-exclamation-triangle"></i>
                  </div>
                  <div className="sp_benefit_content">
                    <h4 className="title">Management Risk</h4>
                    <p className="mt-2">
                      We always provide risk management for every signal we
                      provide to members as an option
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-xl-block d-none">
                <div
                  className="sp_benefit_thumb paroller"
                  data-paroller-factor="0.2"
                  data-paroller-factor-xs="0.0"
                  data-paroller-factor-sm="0.0"
                  data-paroller-factor-md="0.0"
                  data-paroller-factor-lg="0.0"
                  data-paroller-type="foreground"
                  data-paroller-direction="vertical"
                >
                  <img
                    alt="asfionasf asbf"
                    src={require("../src/assets/landing_page/images/645b7110c9a051683714320.png")}
                  />
                </div>
              </div>
              <div
                className="col-xl-4 col-md-6 wow fadeInUp"
                data-wow-duration="0.5s"
                data-wow-delay="0.9s"
              >
                <div className="sp_benefit_item">
                  <div className="sp_benefit_icon">
                    <img
                      alt="asfionasf asbfadsfasnfn"
                      src={require("../src/assets/landing_page/images/645b86d565db91683719893.png")}
                    />
                    <i className="far fa-chart-bar"></i>
                  </div>
                  <div className="sp_benefit_content">
                    <h4 className="title">Fundamental Analysis</h4>
                    <p className="mt-2">
                      We also use fundamental analysis to determine market
                      conditions and their impact on the market
                    </p>
                  </div>
                </div>

                <div className="sp_benefit_item">
                  <div className="sp_benefit_icon">
                    <img
                      alt="asfionasf asbfadsfasnfn"
                      src={require("../src/assets/landing_page/images/645b86d565db91683719893.png")}
                    />
                    <i className="fa fa-bell"></i>
                  </div>
                  <div className="sp_benefit_content">
                    <h4 className="title">Notification Signals</h4>
                    <p className="mt-2">
                      We provide notification signals via Whatsapp, Telegram and
                      Email or you can see it on dashboard member
                    </p>
                  </div>
                </div>
                <div className="sp_benefit_item">
                  <div className="sp_benefit_icon">
                    <img
                      alt="asfionasf asbfadsfasnfn"
                      src={require("../src/assets/landing_page/images/645b86d565db91683719893.png")}
                    />
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="sp_benefit_content">
                    <h4 className="title">Community</h4>
                    <p className="mt-2">
                      a community forum for sharing information and
                      communication with Oxalus members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="overview-section sp_separator_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sp_overview_wrapper">
                  <div className="row gy-5 text-white">
                    <div className="col-lg-3 col-6">
                      <div className="sp_overview_item">
                        <div className="sp_overview_icon">
                          <i className="fas fa-satellite-dish"></i>
                        </div>
                        <div className="sp_overview_content">
                          <p className="sp_overview_caption">Total Signal</p>
                          <div className="d-flex flex-wrap align-items-center justify-content-center">
                            <h4 className="sp_overview_amount">1K+</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-6">
                      <div className="sp_overview_item">
                        <div className="sp_overview_icon">
                          <i className="fas fa-user-check"></i>
                        </div>
                        <div className="sp_overview_content">
                          <p className="sp_overview_caption">Total Users</p>
                          <div className="d-flex flex-wrap align-items-center justify-content-center">
                            <h4 className="sp_overview_amount">2K+</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-6">
                      <div className="sp_overview_item">
                        <div className="sp_overview_icon">
                          <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="sp_overview_content">
                          <p className="sp_overview_caption">
                            Avg Monthly Profit
                          </p>
                          <div className="d-flex flex-wrap align-items-center justify-content-center">
                            <h4
                              className="sp_overview_amount odometer me-1"
                              data-odometer-final="4560+"
                            ></h4>
                            <h4 className="sp_overview_amount">200%</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-6">
                      <div className="sp_overview_item">
                        <div className="sp_overview_icon">
                          <i className="fas fa-award"></i>
                        </div>
                        <div className="sp_overview_content">
                          <p className="sp_overview_caption">Accuracy Rate</p>
                          <div className="d-flex flex-wrap align-items-center justify-content-center">
                            <h4
                              className="sp_overview_amount odometer me-1"
                              data-odometer-final="856000+"
                            ></h4>
                            <h4 className="sp_overview_amount">95%</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="plan-section sp_pt_120 sp_pb_120">
          <div className="plan-el">
            <img
              alt="asfionasf asbfadsfasnfn"
              src={require("../src/assets/landing_page/images/645b6feade0401683714026.png")}
            />
          </div>
          <div className="container text-white">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div
                  className="sp_theme_top wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div className="sp_theme_top_caption mb-3">
                    <i className="fas fa-bolt"></i> Our best packages
                  </div>
                  <h2 className="sp_theme_top_title">
                    Our Best <span>Packages</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="row gy-4 items-wrapper justify-content-center">
              <CardGuest />
            </div>
          </div>
        </section>

        <section className="work-section sp_pt_120 sp_pb_120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div
                  className="sp_theme_top wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div className="sp_theme_top_caption text-white mb-5">
                    <i className="fas fa-bolt"></i> How it works
                  </div>
                  <h2 className="sp_theme_top_title">
                    Started Signals <span>With Oxalus</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="row gy-4 justify-content-center text-white">
              <div className="col-lg-4 col-md-6">
                <div className="sp_work_item">
                  <div className="sp_work_number">1</div>
                  <div className="sp_work_content">
                    <h4 className="title">Open an account</h4>
                    <p className="mt-2">Open an account Oxalus and verify</p>
                    <NavLink
                      to={"/auth/register"}
                      className="btn sp_theme_btn mt-1 wow fadeInUp text-white"
                      style={{ backgroundColor: "#9c0ac1" }}
                    >
                      Register Now
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="sp_work_item">
                  <div className="sp_work_number">2</div>
                  <div className="sp_work_content">
                    <h4 className="title">Choose a Package</h4>
                    <p className="mt-2">
                      Choose a package with your preferred plan amd benefit or
                      you can try it for free for 30 days without a payment card
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="sp_work_item">
                  <div className="sp_work_number">3</div>
                  <div className="sp_work_content">
                    <h4 className="title">Receive Signals</h4>
                    <p className="mt-2">
                      Setting up notification channel and start receive signals
                      and start trading with our signals and get profit
                      consistently
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog-section sp_pt_120 sp_pb_120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div
                  className="sp_theme_top wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div className="sp_theme_top_caption text-white mb-3">
                    <i className="fas fa-bolt"></i>
                    Proof of Income
                  </div>
                  <h2 className="sp_theme_top_title">
                    Proof of Income from Signal <span>Oxalus</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="row gy-4 justify-content-center text-white">
              <div className="col-lg-4">
                <div className="sp_blog_item">
                  <div className="sp_blog_thumb">
                    <img
                      alt="askmkasfk"
                      src="https://coinbalina.com/wp-content/uploads/2022/10/binance-futures-pnl-ekran-goruntusu.jpg"
                    />
                  </div>
                  <div className="sp_blog_content">
                    <ul className="sp_blog_meta">
                      <li>
                        <i className="far fa-clock"></i> 15 June 2023
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sp_blog_item">
                  <div className="sp_blog_thumb">
                    <img
                      alt="askmkasfk"
                      src="https://coinbalina.com/wp-content/uploads/2022/10/binance-futures-pnl-ekran-goruntusu.jpg"
                    />
                  </div>
                  <div className="sp_blog_content">
                    <ul className="sp_blog_meta">
                      <li>
                        <i className="far fa-clock"></i> 15 June 2023
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sp_blog_item">
                  <div className="sp_blog_thumb">
                    <img
                      alt="askmkasfk"
                      src="https://coinbalina.com/wp-content/uploads/2022/10/binance-futures-pnl-ekran-goruntusu.jpg"
                    />
                  </div>
                  <div className="sp_blog_content">
                    <ul className="sp_blog_meta">
                      <li>
                        <i className="far fa-clock"></i> 15 June 2023
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sp_blog_item">
                  <div className="sp_blog_thumb">
                    <img
                      alt="askmkasfk"
                      src="https://coinbalina.com/wp-content/uploads/2022/10/binance-futures-pnl-ekran-goruntusu.jpg"
                    />
                  </div>
                  <div className="sp_blog_content">
                    <ul className="sp_blog_meta">
                      <li>
                        <i className="far fa-clock"></i> 15 June 2023
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sp_blog_item">
                  <div className="sp_blog_thumb">
                    <img
                      alt="askmkasfk"
                      src="https://coinbalina.com/wp-content/uploads/2022/10/binance-futures-pnl-ekran-goruntusu.jpg"
                    />
                  </div>
                  <div className="sp_blog_content">
                    <ul className="sp_blog_meta">
                      <li>
                        <i className="far fa-clock"></i> 15 June 2023
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sp_blog_item">
                  <div className="sp_blog_thumb">
                    <img
                      alt="askmkasfk"
                      src="https://coinbalina.com/wp-content/uploads/2022/10/binance-futures-pnl-ekran-goruntusu.jpg"
                    />
                  </div>
                  <div className="sp_blog_content">
                    <ul className="sp_blog_meta">
                      <li>
                        <i className="far fa-clock"></i> 15 June 2023
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sp_pt_120 sp_pb_120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <div
                  className="sp_theme_top wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <h2 className="sp_theme_top_title">F.A.Q</h2>
                  <p className="sp_theme_top_text">
                    Frequently Asked Questions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer-section">
        <div className="sp_copy_right_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center text-white mb-2">
                <ul
                  className="hc-list justify-content-center"
                  style={{ paddingLeft: 0 }}
                >
                  <li>
                    <ul className="social-icons">
                      <li>
                        <a href="https://www.facebook.com">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://t.me/oxalus_trade">
                          <i className="fab fa-telegram-plane"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com/">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <p>Copyright 2023 Oxalus Trade . All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
  // return <Navigate to={'/auth/login'}/>
}
