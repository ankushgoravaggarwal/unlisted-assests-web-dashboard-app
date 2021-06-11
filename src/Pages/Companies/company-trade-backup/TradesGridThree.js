import React,{useState} from 'react';
import TradeModal from "../TradeModal"
//import useSWR from "swr";
import { Link } from "react-router-dom";
import CompanyPagination from './CompanyPagination';
import TradeImage from './TradeImage';

// import "../bootstrap3/css/bootstrap.min.scoped.css"

import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"
import Buttons from '../../../Components/Buttons';
import AddCompanyRequest from '../../../Components/AddCompanyRequest';
import Dialog from '@material-ui/core/Dialog';
import { Breadcrumbs } from '@material-ui/core';



export default function TradesGridThree(props) {
  const [open,setOpen]=useState(false);
  const [tradeModal, setModal] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const postPerpage = 6;
  const [item_id, setItem_id] = useState(0);
  function showModal(event, data) {
    setModal(true);
    setItem_id(data);
  }
  function hideModal(e) {
    setModal(false);
  }
  
  
  function ValuationConvertion(val) {
    var final_amt = val/1000000;
    if(final_amt >= 1000 ){
      final_amt = final_amt/1000;
      return final_amt + "B";
    }
    return final_amt + "M";
  }
  // function paginate(pageNumber) {
  //   setCurrentPage(pageNumber)
  // }
  // const apiEndpoint = "http://13.232.34.18:8080/company/findAll";
  // const { data: conpanies } = useSWR(apiEndpoint, {refreshInterval:2});
  // const indexOfLastpost = currentPage * postPerpage;
  // const indexOfFirstPost = indexOfLastpost - postPerpage;
  // const currentPost = conpanies ? conpanies.slice(indexOfFirstPost, indexOfLastpost) : null;
  // const totalPosts = conpanies ? conpanies.length : 0;

  console.log(props.totalPosts);
  console.log("TradeGridThree.js")

  return (
    <>
    
    <div style={{display:"flex",justifyContent:"space-between"}}>
     <h4>Companies<span>({ props.totalPosts })</span> </h4>
     <Buttons.SecondaryButton value="Add Company Request" style={{width:"200px"}}
     onClick={()=>{setOpen(true)}}
     />
     <Dialog open={open} onClose={()=>{setOpen(false)}} >
     <AddCompanyRequest onClose={()=>{setOpen(false)}}/>
     </Dialog>
     </div>
      <div className="row"> 
       
        {
          props.currentPost ? (
            props.currentPost.map((trade, index) => (
            
              <div className="col-md-4" key={index}>
              <div className="box">
                  <div className="box1">
                    <div className="row">
                      <div className="col-md-2 col-xs-2">
                        <div className="border1">
                          <TradeImage imgSrc={trade.company_logo}/>
                        </div>
                      </div>
                      <div className="col-md-10 col-xs-10 pl-25">
                        <p className="p2" style={{fontWeight: 'bold'}}> { trade.company_name }</p>
                        <p className="pharmacy">{ trade.sector }</p>
                        <p className="pharmacy">{ trade.company_isin }</p>
                      </div>
                      {/* <div className="col-md-2 col-xs-2">
                        <p className="plus1"><Link to="#" className><img src={process.env.PUBLIC_URL + "./assets/images/add.png"} alt="add" /></Link></p>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="value content-box">
                        <p>Valuation<span className="pull-right text-bold"><i className="fa fa-rupee" /> { ValuationConvertion(trade.last_fund_raising_valuation) }</span></p>
                        <p>Series of Funding<span className="pull-right text-bold">{ trade.series_of_funding }</span></p>
                        <p>{ trade.company_desc.substring(0, 120) }...</p>
                        <div className="hover-box">
                        <button type="button" onClick={(event) => showModal(event, trade.company_name)} > Trade </button><Link  to={{pathname: `/company/${trade.companySlug}`}}>Explore</Link>
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
        <CompanyPagination postsPerpage ={props.postPerpage} totalPosts={props.totalPosts} paginate={props.paginate}/>
         { !tradeModal ? null :
                <TradeModal show={tradeModal} handleClose={hideModal} c_id={item_id }/>
         }
    </>
  )
}
