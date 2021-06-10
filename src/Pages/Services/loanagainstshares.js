import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../Components/Buttons";
import Aware from "./not.svg";
import "./service.scoped.css";
import Loan from "./assets/loan.svg";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';

const options = [
    { value: "ROFR", label: "ROFR" },
    { value: "HR approval", label: "HR approval" },
  ];
export default function LoanAgainstShares  () {
    return(
    <div className="LoanAgainstShares_container mb-5 bg-white">
        <div className="w-75 p-3">
        <img src={Loan}/>
        <h5 className="mt-2">Loan Against Shares</h5>
        <div className="service_line"></div>
        <p className="m-0 mt-3 text-small">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        </p>
        <div className="mt-5">
        <label >Company Name*</label>
        <Select options={options}/>
        </div>
        <div style={{marginTop:"10px"}}>
        <label>Quantity Holding*</label>
        <input type="text"  className="service_input_box"/>
        </div>
        <textarea placeholder="Comment" className="service_input_box" style={{height:"200px",resize:"none"}}/>
        <div className="service_aware mb-4">
            <img src={Aware} style={{margin:"0px 10px",}}/>
            <p className="m-0 p-3"><b>Note:</b> The charges for valuation/loan will vary according to the number of days left for the deadline.</p>
        </div>
        <Buttons.PrimaryButton value="Send" style={{width:"50%"}}/>
    </div>
    </div>
)
    
}