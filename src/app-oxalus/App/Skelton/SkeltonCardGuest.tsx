import Skelton from "react-loading-skeleton";

export const SkeltonCardGuest = (props: { count: number }) => {
  return (
    <>
      {Array(props.count)
        .fill(0)
        .map((_, idx) => (
          <div
            className="col-lg-4 col-md-6 wow fadeInUp"
            data-wow-duration="0.3s"
          >
            <div className="sp_pricing_item">
              <div className="pricing-header">
                <div className="left">
                  <div className="icon">
                    <Skelton width={50} height={50} />
                  </div>
                  <div className="content">
                    <h6 className="package-name">Free</h6>
                    <p>
                      Duration <span>10 days</span>
                    </p>
                  </div>
                </div>
                <div className="right">
                  <h4 className="package-price">0.00 USD</h4>
                </div>
              </div>
              <div className="pricing-body">
                <ul className="package-features">
                  <li>Daily limit : 50 ptc</li>
                  <li>2 month support service</li>
                  <li>5-7 signals send daily</li>
                  <li>Month support service</li>
                  <li>Customizable price</li>
                </ul>
              </div>
              <a
                href="#"
                data-id="6"
                className="btn sp_theme_btn w-100 chooseBtn"
              >
                Choose plan
              </a>
            </div>
          </div>
        ))}
    </>
  );
};
