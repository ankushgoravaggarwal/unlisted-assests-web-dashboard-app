import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../bootstrap3/css/bootstrap.min.scoped.css"
import c1 from "../../../assets/c1.png"
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"
import c1 from "../c1.png"



class CompaniesDetails extends Component{
constructor(){
  super();
  this.state= {
    showMore:false,
  }
  this.toggleMore = this.toggleMore.bind(this);
}
toggleMore=()=>{
  this.setState({
    showMore:!this.state.showMore
  })
  console.log(this.state.showMore);
}

render(){
  const { showMore } = this.state;
	return(
		<>
             <section className="company-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 p0">
              <div className="top">
                <ul className="company-ul">
                  <li><Link to="#"><img src={process.env.PUBLIC_URL + "../assets/images/home.png"} alt=""/></Link></li>
                  <li><i className="fa fa-angle-double-right" /></li>
                  <li><Link to="#" className="com">Companies</Link></li>
                  <li><i className="fa fa-angle-double-right" /></li>
                  <li><Link to="#" className="hdfc">HDFC Bank</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 pad0">
              <div className="angle1">
                <div className="angle">
                  <div className="row">
                    <div className="col-sm-1"><img src={process.env.PUBLIC_URL + "../assets/images/com.png"} className="pc-img" alt=""/></div>
                    <div className="col-sm-8 ml-10 single-com"><h3>HDFC Bank<span className="badge greenb ml-20"><i className="fa fa-check" /> Available</span></h3>
                      <p>Supermarket Grocery Supplies Private Limited Website <Link to="#" className="text-bold ml-20"> Website</Link></p></div>
                    <div className="col-sm-3"><span className="pull-right"><img src={process.env.PUBLIC_URL + "../../../assets/c1.png"} alt=""/><img src={process.env.PUBLIC_URL + "../../../assets/download.png"} alt="" /></span></div>
                  </div>
                  <p className="mt-1">HDFC Bank Ltd. is in Bank - Private. It was incorporated in year 1994. The current market capitalisation stands 76,16,635 Cr. The company is listed on the Bombay Stock Exchange (BSE) with the BSE code as 500180. and also listed on National Stock Exchange (NSE) with NSE code as HDFC BANK.</p>
                  <div className="range">
                    <div className="row">
                      <div className="col-md-4">
                        <p>Trading Range</p>
                        <p><strong><i className="fa fa-rupee" /> 71,111.00 -<i className="fa fa-rupee" /> 71,132.00</strong></p>
                        <p className="mt-20">ISIN</p>
                        <p><strong>1NE040A01026</strong></p>
                        <p className="mt-20">Founders</p>
                        <p><strong>Sashidhar</strong></p>
                      </div>
                      <div className="col-md-4">
                        <p>Sector</p>
                        <p><strong>Banking</strong></p>
                        <p className="mt-20">Market Valuation</p>
                        <p><strong>75,79,785</strong></p>
                        <p className="mt-20">Founded Year</p>
                        <p><strong>1994</strong></p>
                      </div>
                      <div className="col-md-4">
                        <p>Series of Funding</p>
                        <p><strong>Series I</strong></p>
                        <p className="mt-20">Number of Investors</p>
                        <p><strong>10</strong></p>
                        <p className="mt-20">Stage of Company</p>
                        <p><strong>Startups</strong></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="mt-20">Founders/Key Persons</p>
                        <p><strong>Persons Abhinav Chadhary, Hari Menon, Vipul Parekh, VS Ramesh, VS Sudhakar </strong></p>
                      </div>
                    </div>
                  </div>
                  <div className="row hidebtn1">
                    <div className="col-md-12">
                      <p className="text-center text-bold mt-30"><button onclick={this.toggleMore} className="cursorpointer">Show Less</button><Link onclick="showC()" className="cursorpointer">Show More</Link></p>
                    </div>
                  </div>
                </div>
                {
                  showMore ? "more":"less"
                }
                <div className="custom-collapse">
                  <div className="angle">
                    <div className="row">
                      <div className="single-block">
                        <div className="col-sm-2"><img src={process.env.PUBLIC_URL + "../assets/images/block1.png"} alt="block1" /></div>
                        <div className="col-sm-10">
                          <h4>Most Active Investors</h4>
                          <p>Alibaba Group, Ascent Capital, Helion Venture partners, Bessemer Venture, CDC , Trifecta Capital Advisors, Mirae asset- saver ASIA growth fund, Abraaj Group </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="single-block">
                        <div className="col-sm-2"><img src={process.env.PUBLIC_URL + "../assets/images/block2.png"} alt="block2" /></div>
                        <div className="col-sm-10">
                          <h4>Awards and Recognition</h4>
                          <p>- Retail and eCommerce app of the year</p>
                          <p>- Owler 2017 Top Rated CEO Award for Hari Menon</p>
                          <h4>Highlights</h4>
                          <p>The app has 10,000,000+ app installs on the Play Store and App Store</p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="single-block">
                        <div className="col-sm-2"><img src={process.env.PUBLIC_URL + "../assets/images/block3.png"} alt="block3" /></div>
                        <div className="col-sm-10">
                          <h4>Financial highlights</h4>
                          <p>Operating Revenues range is Over INR 500 cr for the financial year ending on 31 March, 2020. It's EBITDA has increased by 5.42 % over the previous year</p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="single-block">
                        <div className="col-sm-2"><img src={process.env.PUBLIC_URL + "../assets/images/block4.png"} alt="block4" /></div>
                        <div className="col-sm-10">
                          <h4>Other Information</h4>
                          <p>Operating Revenues range is Over INR 500 cr for the financial year ending on 31 March, 2020. It's EBITDA has increased by 5.42 % over the previous year</p>
                          <p>Operating Revenues range is Over INR 500 cr for the financial year ending on 31 March, 2020. It's EBITDA has increased by 5.42 % over the previous year</p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="text-bold"><Link to="#">Read more on crunchbase </Link></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="text-center text-bold mt-30"> <button onclick={this.toggleMore} className="cursorpointer">Show Less</button> <Link onclick="hideC()" className="cursorpointer">Show Less</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="code">
                <img src={process.env.PUBLIC_URL + "../assets/images/c2.png"} className="center-block"  alt=""/>
                <p className="text-center mt-30">Directly reach out to place Buy/Sell orders</p>
                <p className="reach text-center"><Link href="#" className="btn btn-trade btn-block btn-lg">Trade</Link></p>
                {/*<p class="reach text-center"><a href="#" class="btn btn-watchlist  btn-block btn-lg">Add to Watchlist</a></p>-*/}
              </div>
              {/*<h4 class="text-center text-bold mt-30">People Also Viewed</h4>-*/}
              {/*-<ul class="sideul">
						<li><a href="#"><img src="images/sideicon1.png" alt="sideicon"> Grofers <span class="badge greenb ml-20"><i class="fa fa-check"></i> Available</span></a></li>
						<li><a href="#"><img src="images/sideicon2.png" alt="sideicon2"> Blue Apron</a></li>
					</ul>-*/}
            </div>
          </div>
        </div>
      </section>
		</>
	);
}
}


export default CompaniesDetails;