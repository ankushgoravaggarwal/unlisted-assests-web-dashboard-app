import React, {useState} from 'react'
import { Link } from "react-router-dom";
import TradeModal from '../TradeModal'
import useSWR from "swr";
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css";
import "./CompanyDetails.css";
import DashboardHeader from "../../../Components/DashboardHeader";
import { Breadcrumbs } from '@material-ui/core';
import c2 from "../c2.svg"
import CompanyLogo from "../company-logo.jpg"
import breathumbs from "../../../assets/breathumbs.svg";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buttons from "../../../Components/Buttons";
import CompanyTab from "../../../Components/CompanyTabs/CompanyTabs"

const fetcher = (...args) => fetch(...args).then((response) => response.json());
function CompDetails(props) {
  const [showMore, setShowMore] = useState(false);
  const [tradeModal, setModal] = useState(false);
  const [item_id, setItem_id] = useState(0);
  function showModal(event, data) {
    setModal(true);
    setItem_id(data);
  }
  function hideModal(e) {
    setModal(false);
  }
  const c_slug = props.match.params.cslug;
  const apiEndpoint = "https://api.unlistedassets.com/company/"+c_slug;
  const { data, error} = useSWR(apiEndpoint, fetcher, {refreshInterval:2});

  function ShowMore() {
    setShowMore(!showMore);
  }
  function ValuationConvertion(val) {
    var final_amt = val/1000000;
    if(final_amt >= 1000 ){
      final_amt = final_amt/1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }
  if(error) return <h1>{error}</h1>

  return (
     <>
      <DashboardHeader/>
      <Breadcrumbs/>
     {
      data ?
      
      <section className="company-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="top">
                <div className="breathumbs-top">
                  <ul>
                    <li><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
                    <li><img src={breathumbs} /></li>
                    <li><Link to="/companies" className="com">Explore Companies</Link></li>
                    <li><img src={breathumbs} /></li>
                    <li><Link to="#" className="hdfc">{data.company_name}</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-9 ">
              <div className="company-details bg-white p-2">
                <div className="row">
                  <div className="col-md-3 col-3">
                    <div className="c_logo">
                      <img src={CompanyLogo} className="w-100"/>
                    </div>
                  </div>
                  <div className="col-md-5 col-9 d-flex align-items-center">
                    <div className="c_name">
                        <h4>B9 BEVERAGES PRIVATE LIMITED (Bira 91)</h4>
                        <div className=" mobi-none">
                          <div className="d-flex">
                           <p className="text-left w-50">Industry</p> <p className="text-left w-50 "><span> Alcoholic Beverages </span></p>
                           </div>
                        </div>
                        <div className=" mobi-none">
                          <div className="d-flex">
                           <p className="text-left w-50">Website </p> <p className="text-left w-50 "><span> <a href="#"> www.bira91.com </a></span></p>
                           </div>
                        </div>
                        <div className=" mobi-none">
                          <div className="d-flex">
                           <p className="text-left w-50">Crunchbase Link</p > <p className="text-left w-50 "> <span><a href="#"> Crunchbase/Bira 91 </a></span></p>
                           </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="c_inactive m-3">
                        <button className="btn btn-inctive">Temporarily Inactive</button>
                    </div>
                    <div className="c_name mobi-block desktop-none">
                          <div className="d-flex">
                           <p className="text-left w-50 p-0 m-0 text-small text-grey">Industry</p> <p className="text-left w-50 p-0 m-0 text-small "><span> Alcoholic Beverages </span></p>
                           </div>
                        </div>
                        <div className="c_name mobi-block desktop-none">
                          <div className="d-flex">
                           <p className="text-left w-50 p-0 m-0 text-small text-grey">Website </p> <p className="text-left w-50 p-0 m-0 text-small "><span> <a href="#"> www.bira91.com </a></span></p>
                           </div>
                        </div>
                        <div className="c_name mobi-block desktop-none">
                          <div className="d-flex">
                           <p className="text-left w-50 p-0 m-0 text-small text-grey">Crunchbase Link</p > <p className="text-left w-50 p-0 m-0 text-small "> <span><a href="#"> Crunchbase/Bira 91 </a></span></p>
                           </div>
                        </div>
                  </div>
                </div>
              </div>
              <div className="Company-details-tabs-section mt-3">
                <CompanyTab />
              </div>
            </div>
            <div className="col-md-3">
              <div className="code bg-white text-center">
                <img src={c2} alt="c2" className="center-block" />
                <p className="text-center mt-30">Directly reach out to place Buy/Sell orders</p>
                <div className="d-flex justify-content-center">
                  <Buttons.PrimaryButton onClick={(event) => showModal(event, data.company_name)} style={{width:"75%"}} value="Buy / Sell" />
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Buttons.SecondaryButton style={{width:"75%"}} value="Add To Watchlist" />
                </div>
              </div>
              <div className="card mt-3">
                <div className="p-2 text-center">
                  <h6 className="available-listing">Available Listing</h6>
                </div>
                <div className="listing-table">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <th>Seller Name</th>
                        <th>Qty</th>
                        <th className="text-right">Price/Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe <br /> <span> 9 Oct 2020, 02:00 PM</span></td>
                        <td className="text-center">12</td>
                        <td className="text-right">₹ 100</td>
                      </tr>
                      <tr>
                        <td>John Doe <br /> <span> 9 Oct 2020, 02:00 PM</span></td>
                        <td className="text-center">12</td>
                        <td className="text-right">₹ 100</td>
                      </tr>
                      <tr>
                        <td>John Doe <br /> <span> 9 Oct 2020, 02:00 PM</span></td>
                        <td className="text-center">12</td>
                        <td className="text-right">₹ 100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <Buttons.PrimaryButton style={{width:"75%"}} value="View All Listing" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> : null
     }
     { !tradeModal ? null :
                <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id }/>
         }
     {/* <InventoryTableContent /> */}
     </>
     
  )
}

export default CompDetails
