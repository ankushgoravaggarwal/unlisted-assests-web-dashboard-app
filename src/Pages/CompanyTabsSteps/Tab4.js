import React from "react";
import "./Tab4.css";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';

let SummaryRisks =()=>{

    return(
        <div className=" summary-tab-section">
            <div className="row">
                <div className="col-md-12 col-12">
                    <div className="tab-desc mt-3">
                        <h6 className="text-primary">Summary</h6>
                    </div>
                    <div className="summary-list mt-4">
                        <ul>
                            <li>B9 Beverages is the leading beer company in India with significant presence in premium craft beer market. </li>
                            <li>Has been growing robustly with c.260% Revenue CAGR between FY16-19, and reducing losses significantly over time with EBITDA loss        improving from -286% of sales in FY16 to -118% of sales in FY19, and Loss after Tax improving from -297% of sales in FY16 to -105% of sales in FY19.</li>
                            <li>Good quality investor base including Sequoia, Sofina, Kirin Holdings and several other individuals and HNIs from the various domains of business world as investors in the Company</li>

                            <li>Historically, shares of B9 Beverages had traded in [ ] – [ ] levels during 2020.</li>

                            <li>Ankur (Founder & Promoter) has stated intent to take B9 Beverages public through IPO route, however, did not comment on timeline and prefer to increase the scale of the Company before going for an IPO.</li>
                        </ul>
                    </div>
                    <hr />
                    <div className="summary-list mt-3">
                      <h6 className="text-primary">Key Risks</h6>
                        <ul className="mt-4">
                            <li>Company operates in the premium craft beer segment which is a niche and smaller beer segment compared to the overall market. Penetrating into the mass category would require investment in branding, marketing and distribution.</li>
                            <li>Intense competition from incumbent players</li>

                            <li>Company is a loss making entity with INR 2,022mn PAT in FY19</li>

                            <li>COVID has had an impact on the overall liquor sales in the country</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryRisks