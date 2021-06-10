import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import trades from '../../data/trades.json';
import TradeModal from '../TradeModal';
import CompanyPagination from './CompanyPagination';
import axios from 'axios';
// import "../bootstrap3/css/bootstrap.min.scoped.css"
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"

class TradesGridThree extends Component{
    constructor() {
        super();
        this.state = {
            show: false,
            conpanies:[],
            companies_lenght:0,
            currentPage:1,
            postPerpage:6,
            item_id:''
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount() {
     
      axios.get(`http://13.232.34.18:8080/company/findAll`).then(res => {
           console.log(res.data);
           this.setState({
                  conpanies: res.data,
                  companies_lenght:res.data.length
                });
      });
    } 
    showModal = (id) => {
        this.setState({ show: true, item_id:id});
    };
    
    hideModal = () => {
        this.setState({ show: false });
    
    };
     paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
    }


    render(){
      console.log("TradeGridThreeClass.js")

      const { conpanies, companies_lenght, currentPage, postPerpage } = this.state;
      const indexOfLastpost = currentPage * postPerpage;
      const indexOfFirstPost = indexOfLastpost - postPerpage;
      const currentPost = conpanies.slice(indexOfFirstPost, indexOfLastpost);
      if(companies_lenght === 0){
        return <div>Loading...</div>
      }
        return(
            <>
            
          <div className="row">
        
          <h4>Companies<span>({ companies_lenght })</span> </h4>
          {
            currentPost ? (
              currentPost.map(trade => (
                <div className="col-md-4" key={trade.id}>
                <div className="box">
                    <div className="box1">
                      <div className="row">
                        <div className="col-md-2 col-xs-2">
                          <div className="border1">
                            <img src={trade.company_logo} alt="logo" className="center-block" />
                          </div>
                        </div>
                        <div className="col-md-8 col-xs-8 pl-25">
                          <p className="p2" style={{fontWeight: 'bold'}}> { trade.company_name }</p>
                          <p className="pharmacy">{ trade.sector }</p>
                          <p className="pharmacy">{ trade.company_isin }</p>
                        </div>
                        <div className="col-md-2 col-xs-2">
                          <p className="plus1"><Link to="#" className><img src={process.env.PUBLIC_URL + "./assets/images/add.png"} alt="add" /></Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="value content-box">
                          <p>Valuation<span className="pull-right text-bold">{ trade.last_fund_raising_valuation }</span></p>
                          <p>Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p>
                          <p>{ trade.company_desc }</p>
                          <div className="hover-box">
                          <button type="button" onClick={(e) => this.showModal(trade.company_isin)} > Trade </button><Link  to={{pathname: `/company/${trade.id}`}}>Explore</Link>
                         </div>
                        </div>
                      </div>
                    </div>
                   
                    <div className="clearfix" />
                  </div>
                 
                  </div>
                  
                 
            ))
           
          ):"Data Loading...."
          }
          </div>
          <CompanyPagination postsPerpage ={postPerpage} totalPosts={companies_lenght} paginate={this.paginate}/>
          { !this.state.show ? null :
                
                <TradeModal show={this.state.show} handleClose={this.hideModal} c_id={ this.state.item_id }/>
           
                }
            </>
        )
    }
}
export default TradesGridThree;