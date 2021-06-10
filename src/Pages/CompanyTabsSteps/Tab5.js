import React from "react";
import "./Tab5.css";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import NewsImage1 from "./News-assets/news1.jpg";
import NewsImage2 from "./News-assets/news2.jpg";
import NewsImage3 from "./News-assets/news3.jpg";
import NewsImage4 from "./News-assets/news4.jpg";

let RecentNews = () => {

  return (
          <div className=" summary-tab-section">
            <div className="tab-desc mt-3">
              <h6 className="text-primary">News</h6>
            </div>
            <div className="row mt-3">
                <div className="col-md-4 col-12">
                    <div className="news-img">
                        <img src={NewsImage1} className="w-100"/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="news-title">
                        <h6>Bira 91 raises $30 million from Japan's Kirin Holdings</h6>
                        <p className="m-0 text-small">The $30 million funding will give Japan's Kirin Holdings less than 10% stake in Bira 91 and an estimated $300 million valuation to the Indian craft beer maker.</p>
                        <hr className="m-2"/>
                        <p className="m-0 News-date"><b>Apr 07, 2021   |   Suneera Tandon</b></p>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className="news-img">
                        <img src={NewsImage2} className="w-100"/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="news-title">
                        <h6>Bira 91 raises $30 million from Japan's Kirin Holdings</h6>
                        <p className="m-0 text-small">The $30 million funding will give Japan's Kirin Holdings less than 10% stake in Bira 91 and an estimated $300 million valuation to the Indian craft beer maker.</p>
                        <hr className="m-2"/>
                        <p className="m-0 News-date"><b>Apr 07, 2021   |   Suneera Tandon</b></p>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className="news-img">
                        <img src={NewsImage3} className="w-100"/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="news-title">
                        <h6>Bira 91 raises $30 million from Japan's Kirin Holdings</h6>
                        <p className="m-0 text-small">The $30 million funding will give Japan's Kirin Holdings less than 10% stake in Bira 91 and an estimated $300 million valuation to the Indian craft beer maker.</p>
                        <hr className="m-2"/>
                        <p className="m-0 News-date"><b>Apr 07, 2021   |   Suneera Tandon</b></p>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className="news-img">
                        <img src={NewsImage3} className="w-100"/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="news-title">
                        <h6>Bira 91 raises $30 million from Japan's Kirin Holdings</h6>
                        <p className="m-0 text-small">The $30 million funding will give Japan's Kirin Holdings less than 10% stake in Bira 91 and an estimated $300 million valuation to the Indian craft beer maker.</p>
                        <hr className="m-2"/>
                        <p className="m-0 News-date"><b>Apr 07, 2021   |   Suneera Tandon</b></p>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className="news-img">
                        <img src={NewsImage4} className="w-100"/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="news-title">
                        <h6>Bira 91 raises $30 million from Japan's Kirin Holdings</h6>
                        <p className="m-0 text-small">The $30 million funding will give Japan's Kirin Holdings less than 10% stake in Bira 91 and an estimated $300 million valuation to the Indian craft beer maker.</p>
                        <hr className="m-2"/>
                        <p className="m-0 News-date"><b>Apr 07, 2021   |   Suneera Tandon</b></p>
                    </div>
                </div>
            </div>
          </div>
  );
};
export default RecentNews;
