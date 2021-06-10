import React, {useState} from 'react'
import { Link } from "react-router-dom";
import TradeModal from '../TradeModal'
import useSWR from "swr";
// import "../bootstrap3/css/bootstrap.min.scoped.css"
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"
import DashboardHeader from "../../../Components/DashboardHeader";
import InventoryTableContent from "../../Inventory_old/inventorytablecontent";
import { Breadcrumbs } from '@material-ui/core';
import c1 from "../c1.png"
import c2 from "../c2.png"
import home from "../home.png"
import download from "../download.png"
import block1 from "../block1.png"
import block2 from "../block2.png"
import block3 from "../block3.png"
import block4 from "../block4.png"




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
                <ul className="company-ul">
                  <li><Link to="/"><img src={home} alt="home" /></Link></li>
                  <li><i className="fa fa-angle-double-right" /></li>
                  <li><Link to="/companies" className="com">Explore Companies</Link></li>
                  <li><i className="fa fa-angle-double-right" /></li>
                  <li><Link to="#" className="hdfc">{data.company_name}</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 pad0">
              <div className="angle1">
                <div className="angle">
                  <div className="row">
                    <div className="col-sm-1"><img src={process.env.PUBLIC_URL + data.company_logo} className="pc-img"  alt="logo"/></div>
                    <div className="col-sm-8 ml-10 single-com"><h3>{data.company_name}{/*-<span class="badge greenb ml-20"><i class="fa fa-check"></i> Available</span>-*/}</h3>
                      <p>{data.legal_name} <a href={data.legal_website_link} target={'_blank'} rel="noreferrer" className="text-bold ml-20">Website</a></p></div>
                    <div className="col-sm-3"><span className="pull-right"><img src={c1} alt="c1" /><img src={download} alt="download" /></span></div>
                  </div>
                  <p className="mt-1">{data.company_desc}</p>
                  <div className="range">
                    <div className="row">
                      <div className="col-md-4">
                        <p>Last Traded Price</p>
                        <p><strong><i className="fa fa-rupee" /> {data.last_trade_price}</strong></p>
                        <p className="mt-20">Founded Year</p>
                        <p><strong>{ data.founded_year }</strong></p>
                        <p className="mt-20">Series of funding</p>
                        <p><strong>{ data.series_of_funding }</strong></p>
                      </div>
                      <div className="col-md-4">
                        <p>Sector</p>
                        <p><strong>{ data.sector }</strong></p>
                        <p className="mt-20">Total funding raised</p>
                        <p><strong><i className="fa fa-rupee" /> { ValuationConvertion(data.total_funding_raised) }</strong></p>
                        <p className="mt-20">ISIN</p>
                        <p><strong>{ data.company_isin }</strong></p>
                      </div>
                      <div className="col-md-4">
                        <p>Last fund raising valuation</p>
                        <p><strong><i className="fa fa-rupee" /> { ValuationConvertion(data.last_fund_raising_valuation) }</strong></p>
                        <p className="mt-20">Last funding date</p>
                        <p><strong>{ data.last_funding_date }</strong></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="mt-20">Founders/Key Persons</p>
                        <p><strong>{ data.key_persons }</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={showMore ? "custom-collapse dblock" : "custom-collapse dnone"}>
                  <div className="angle">
                    <div className="row">
                      <div className="single-block">
                        <div className="col-sm-2"><img src={block1} alt="block1" /></div>
                        <div className="col-sm-10">
                          <h4>Most Active Investors</h4>
                          <p>{data.most_active_investors} </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="single-block">
                        <div className="col-sm-2"><img src={block2} alt="block2" /></div>
                        <div className="col-sm-10">
                          <h4>Awards and Recognition</h4>
                          <p>{ data.awards_and_recognition }</p>
                          <h4>Highlights</h4>
                          <p>{ data.key_pointers }</p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="single-block">
                        <div className="col-sm-2"><img src={block3} alt="block3" /></div>
                        <div className="col-sm-10">
                          <h4>Financial highlights</h4>
                          <p>{ data.financial_highlights }</p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="single-block">
                        <div className="col-sm-2"><img src={block4} alt="block4" /></div>
                        <div className="col-sm-10">
                          <h4>Other Information</h4>
                          <p>{ data.other_information1 }</p>
                          <p>{ data.other_information2 }</p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="angle">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="info-text-12">*This information is subject to change</p>
                      <p className="text-bold">
                      <a href={ data.crunchbase_link } target={'_blank'} rel="noreferrer">Read more on crunchbase</a>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="text-center text-bold mt-30">
                        <button onClick={ShowMore} className="show-more-toogle">{!showMore ? "Show More" : "Show Less"}</button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="code">
                <img src={c2} alt="c2" className="center-block" />
                <p className="text-center mt-30">Directly reach out to place Buy/Sell orders</p>
                <p className="reach text-center"><button type="button" className="btn btn-trade btn-block btn-lg page-trade-btn" onClick={(event) => showModal(event, data.company_name)} > Trade </button></p>
                
                {/*<p class="reach text-center"><Link to="#" class="btn btn-watchlist  btn-block btn-lg">Add to Watchlist</Link></p>-*/}
              </div>
              {/*<h4 class="text-center text-bold mt-30">People Also Viewed</h4>-*/}
              {/*-<ul class="sideul">
						<li><Link to="#"><img src="images/sideicon1.png" alt="sideicon"> Grofers <span class="badge greenb ml-20"><i class="fa fa-check"></i> Available</span></Link></li>
						<li><Link to="#"><img src="images/sideicon2.png" alt="sideicon2"> Blue Apron</Link></li>
					</ul>-*/}
            </div>
          </div>
        </div>
      </section> : null
     }
     { !tradeModal ? null :
                <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id }/>
         }
     <InventoryTableContent />
     </>
     
  )
}

export default CompDetails
