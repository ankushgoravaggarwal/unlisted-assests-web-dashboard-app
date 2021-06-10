import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import TradesGridThree from './company-trade/TradesGridThree';
import PriceRangeSlider from './PriceRangeSlider';
import loadingImg from './loading.gif'
// import "./bootstrap3/css/bootstrap.min.scoped.css"
import './bootstrap4/css/bootstrap.scoped.css';

import "./style.scoped.css"
import { Breadcrumbs } from '@material-ui/core';


export default class Companies extends Component {
  constructor(props){
    super(props);
    this.state={
      panelShow1:false,
      panelShow2:false,
      panelShow3:false,
      postPerpage:6,
      companies:[],
      filterCompanies:[],
      filtercompanyLenght:0,
      companyLenght:0,
      isLoading:true,
      currentPage:1,
      SectorList:[],
      SeriesOfFundingList:[],
      maxprice:0,
      minprice:0,
      maxpricerange:0,
      minpricerange:0,
      sectorOptions:[],
      fundingOptions:[],
      searchTxt:'',
    };
  
    this.showPanel1 = this.showPanel1.bind(this);
    this.showPanel2 = this.showPanel2.bind(this);
    this.showPanel3 = this.showPanel3.bind(this);
    this.paginate = this.paginate.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.finalChange = this.finalChange.bind(this); 
    this.sectorChange = this.sectorChange.bind(this); 
    this.fundingChange = this.fundingChange.bind(this); 
    this.filterData = this.filterData.bind(this); 
    this.searchChange = this.searchChange.bind(this); 
    
    
  }
  showPanel1() {
     this.setState({
      panelShow1:!this.state.panelShow1
     })
  }
  showPanel2() {
    this.setState({
      panelShow2:!this.state.panelShow2
     })
  }
  showPanel3() {
    this.setState({
      panelShow3:!this.state.panelShow3
     })
  }
  paginate(pageNumber) {
    this.setState({
      currentPage:pageNumber
     })
  }
  searchChange(e){
   var searchText = e.target.value.toLowerCase();
   const items = this.state.companies.filter((data)=>{
    if(searchText === ''){
      return data
    }
    else if(data.company_name.toLowerCase().includes(searchText)){
        return data
    }
  });

  this.setState({
    filterCompanies:items,
    filtercompanyLenght:items.length
   })

  }
  filterData(val1, val2){
    var max = this.state.maxpricerange;
    var min = this.state.minpricerange;
    var res = [];
    if (val1.length !== 0 && val2.length !== 0) {
    res = this.state.companies.filter(conpany => val1.includes(conpany.sector) && val2.includes(conpany.series_of_funding) &&  min <= conpany.last_fund_raising_valuation && max >= conpany.last_fund_raising_valuation);
    }else if (val1.length !== 0 && val2.length === 0) {
      res = this.state.companies.filter(conpany => val1.includes(conpany.sector) &&  min <= conpany.last_fund_raising_valuation && max >= conpany.last_fund_raising_valuation);
    }else if (val1.length === 0 && val2.length !== 0) {
      res = this.state.companies.filter(conpany => val2.includes(conpany.series_of_funding) &&  min <= conpany.last_fund_raising_valuation && max >= conpany.last_fund_raising_valuation);
    }else {
      res = this.state.companies.filter(conpany => min <= conpany.last_fund_raising_valuation && max >= conpany.last_fund_raising_valuation);
    }
    this.setState({
      filterCompanies:res,
      filtercompanyLenght:res.length
     })
    
  }


  finalChange(val){
    this.setState({
      maxpricerange:val.value.max,
      minpricerange:val.value.min
     })
     this.filterData(this.state.sectorOptions, this.state.fundingOptions);
  }
  sectorChange(e){
     const sectorOptions = this.state.sectorOptions
     let index
     if (e.target.checked) {
       sectorOptions.push(e.target.value)
     } else {
       index = sectorOptions.indexOf(e.target.value)
       sectorOptions.splice(index, 1)
     }
     this.setState({ sectorOptions: sectorOptions }) 
     this.filterData(sectorOptions, this.state.fundingOptions);
  }

  fundingChange(e){
    const fundingOptions = this.state.fundingOptions
     let index
     if (e.target.checked) {
      fundingOptions.push(e.target.value)
     } else {
       index = fundingOptions.indexOf(e.target.value)
       fundingOptions.splice(index, 1)
     }
     this.setState({ fundingOptions: fundingOptions }) 
     this.filterData(this.state.sectorOptions, fundingOptions);
  }

  getPrice(){
    var maxPrice = 0;
    var minPrice = 0;
    if(this.state.companies.length !== 0){
      maxPrice = parseInt(this.state.companies[0].last_fund_raising_valuation)
      for (var x=0 ; x<this.state.companies.length ; x++) {
             if(maxPrice < parseInt(this.state.companies[x].last_fund_raising_valuation)){
              maxPrice = parseInt(this.state.companies[x].last_fund_raising_valuation);
             }   
      }
      } 
      if(this.state.companies !== 0){
      minPrice = parseInt(this.state.companies[0].last_fund_raising_valuation)
      for (var y=0 ; y<this.state.companies.length ; y++) {
             if(minPrice > parseInt(this.state.companies[y].last_fund_raising_valuation)){
              minPrice = parseInt(this.state.companies[y].last_fund_raising_valuation);
             }   
      }
      }
      this.setState({
        maxprice:maxPrice,
        minprice:minPrice
       })
  }




  componentDidMount(){
    axios.get(`https://api.unlistedassets.com/company/findAll`)
    .then(res => {
       const resData = res.data;

      this.setState({ 
        companies:resData,
        companyLenght:res.data.length,
        isLoading:false
       });
       this.getPrice();
       this.setState({
        maxpricerange:this.state.maxprice,
        minpricerange:this.state.minprice
       })

    }).catch((error) => {
      console.log(error)
  });
  axios.get(`https://api.unlistedassets.com/company/sector/findAll`)
    .then(res => {
       const resData = res.data;

      this.setState({ 
        SectorList:resData,
       });
    }).catch((error) => {
      console.log(error)
  });
  axios.get(`https://api.unlistedassets.com/company/fundingseries/findAll`)
  .then(res => {
     const resData = res.data;

    this.setState({ 
      SeriesOfFundingList:resData,
     });
  }).catch((error) => {
    console.log(error)
});
  }
  render() {
    const{panelShow1, panelShow2, panelShow3, isLoading, postPerpage, companies, companyLenght, currentPage, SectorList, SeriesOfFundingList, maxprice, minprice, filterCompanies, filtercompanyLenght } = this.state;
    const indexOfLastpost = currentPage * postPerpage;
    const indexOfFirstPost = indexOfLastpost - this.state.postPerpage;
    const currentPost = companies.slice(indexOfFirstPost, indexOfLastpost);
    const filteredcurrentPost = filterCompanies.length !== 0 ? filterCompanies.slice(indexOfFirstPost, indexOfLastpost): [];
  
 
    return (
     <>
        
         <section className="company-section">
        <div className="container">
        
          <div className="row">
            <div className="col-md-3">
              <div className="sun">
                <div className="moon">
                  <h4>Filter<span className="pull-right"><Link to="#">Clear All</Link></span></h4>
                </div>
                <div className="earth">
                  <button className={panelShow1 ? "accor active1" : "accor"} onClick={this.showPanel1}>Sector</button>
                  <div className={panelShow1 ? "panel1 show-panel1" : "panel1"} >
                  {SectorList && SectorList.map((item, index) => {
                      return <div className="form-group" key={index}>
                        <p>  <input type="checkbox" name="sector_value" value={item.value} onChange={this.sectorChange}/> <span>{item.label}</span></p>
                      </div>;
                    })}


                  </div>
                  <button className={panelShow2 ? "accor active1" : "accor"} onClick={this.showPanel2}>Series of Funding</button>
                  <div className={panelShow2 ? "panel1 show-panel1" : "panel1"}>
                  {SeriesOfFundingList && SeriesOfFundingList.map((item, index) => {
                      return <div className="form-group" key={index}>
                        <p>  <input type="checkbox" name="company_series_of_funding" value={item.value} onChange={this.fundingChange}/> <span>{item.label}</span></p>
                      </div>;
                    })}
                  </div>
                  <button className={panelShow3 ? "accor active1" : "accor"} onClick={this.showPanel3}>Valuation</button>
                  <div className={panelShow3 ? "panel1 show-panel1" : "panel1"}>
                  {
                    minprice && maxprice ? <PriceRangeSlider minVal={minprice} maxVal={maxprice} finalChange={this.finalChange}/> : null
                  }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              
              <div className="galaxy">
              <form>
                <div className>
                  <div className="form-group">
                  <Link onClick={ (event) => event.preventDefault() } class="icon"><i className="fa fa-search" /></Link><input type="text" placeholder="Search here..." name="search_text" className="form-control control" onChange={this.searchChange} />
                  </div>
                </div>
              </form>

               {
                !isLoading ? 
                filteredcurrentPost.length === 0 ? 
                <TradesGridThree postPerpage={postPerpage} currentPost={currentPost} totalPosts={companyLenght} paginate={this.paginate} />
                :<TradesGridThree postPerpage={postPerpage} currentPost={filteredcurrentPost} totalPosts={filtercompanyLenght} paginate={this.paginate}/>
                :<div className="product-loader"><img src={loadingImg}  alt=""/></div>
               }
               
              

              </div>
            </div>
          </div>
        </div>

      </section>
     </>
    )
  }
}
