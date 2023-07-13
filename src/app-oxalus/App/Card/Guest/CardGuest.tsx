import React from "react";
import config from "../../../../config";
import { SkeltonCardGuest } from "../../Skelton/SkeltonCardGuest";
import { stringConversionSubs } from "../../../Helper/helps";
import { useNavigate } from "react-router-dom";

export const CardGuest = () => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<any[]>([]);
  const routeChange = useNavigate();

  React.useEffect(() => {
    setTimeout(async () => {
      const getSignal = await fetch(
        `${config.API_URL}subscription/listpackage`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": config.API_KEY,
          },
        }
      );
      if (getSignal.status === 200) {
        const responseSignal = await getSignal.json();
        setLoading(true);
        setItems(responseSignal?.data);
      }
    }, 2000);
  }, []);

  return (
    <>
      {!loading && <h2 className="m-4">LOADING....</h2>}

      {items.map((values, i) => (
        <div
          className="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="0.3s"
        >
          <div className="sp_pricing_item">
            <div className="pricing-header">
              <div className="left">
                <div className="icon">
                  <i className="far fa-gem"></i>
                </div>
                <div className="content">
                  <h6 className="package-name">
                    {values?.description_package}
                  </h6>
                  <p>
                    Duration <span>{values?.duration_package} days</span>
                  </p>
                </div>
              </div>
              <div className="right">
                <h6 className="package-price">${values?.price_package}</h6>
              </div>
            </div>
            <div className="pricing-body">
              <ul className="package-features">
                {stringConversionSubs(values?.benefit).map((val, idx) => {
                  if (val.substring(0, 3).toLocaleLowerCase().trim() == "no") {
                    return;
                  }
                  return <li key={idx}>{val}</li>;
                })}
              </ul>
            </div>
            <button
              onClick={() => routeChange("/auth/login")}
              data-id="6"
              style={{ backgroundColor: "#9c0ac1" }}
              className="btn sp_theme_btn w-100 chooseBtn text-white"
            >
              {values?.description_package == "Free"
                ? "Get Started"
                : "Subscribe"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
