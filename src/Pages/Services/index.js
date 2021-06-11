import React, { useState } from "react";
import Loan from "./assets/loan.svg"
import Valuation from "./assets/valuation.svg"
import Broker from "../../assets/broker.svg"
import "./service.scoped.css"

import ValuationForTheShares from "./valuationfortheshares";
import LoanAgainstShares from "./loanagainstshares";
import FindABroker from "./findabroker";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';

export default function Services() {
    const [currentpage, setCurrentPage] = useState(1);
    function GetPage(){
        switch(currentpage){
            case 1:
                return <LoanAgainstShares/>;
            case 2:
                return <ValuationForTheShares/>;
            case 3:
                return <FindABroker/>;
            default:
                return <LoanAgainstShares/>;
        }
    }

    return(
    <div className="container mt-4">
        <div className="row">
        <div className="col-md-3 col-12">
            <div className="service_widget bg-white">
                <div className="service_widget_title d-flex align-items-center" style={{borderBottom: "1px solid #CFCBCF"}}>
                    <h6 className="p-3 m-0"><strong> Services </strong></h6>
                </div>
                <div className="service_widget_List" onClick={(e)=>setCurrentPage(1)}>
                    <img width="30" height="30" className="m-2" src={Loan}/>
                    <p className="m-0">Loan Against Shares</p>
                </div>
                <div className="service_widget_List" onClick={()=>setCurrentPage(2)}>
                    <img width="30" height="30" className="m-2" src={Valuation}/>
                    <p className="m-0">Valuation For The Shares</p>
                </div>
                <div className="service_widget_List" onClick={()=>setCurrentPage(3)}>
                    <img width="30" height="30" className="m-2" src={Broker}/>
                    <p className="m-0">Find A Broker</p>
                </div>
            </div>
        </div>
        <div className="col-md-9 col-12">
        {GetPage()}
        </div>
        </div>
        </div>   )
    
}