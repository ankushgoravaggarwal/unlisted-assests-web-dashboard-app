import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../Components/Buttons";
import Aware from "./not.svg"
import "./service.scoped.css"
import Valuation from "./valuation.png"

const options = [
    { value: "ROFR", label: "ROFR" },
    { value: "HR approval", label: "HR approval" },
  ];
export default function ValuationForTheShares  () {
    return(
    <div className="LoanAgainstShares_container">
        <img src={Valuation}/>
        <h3>Valuation For The Shares</h3>
        <div className="service_line"></div>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        </p>
        <div>
        <label >Company Name*</label>
        <Select options={options}/>
        </div>
        <div style={{marginTop:"10px"}}>
        <label>Quantity *</label>
        <input type="text"  className="service_input_box"/>
        </div>
        <div style={{marginTop:"10px"}}>
        <label>Price *</label>
        <input type="text"  className="service_input_box"/>
        </div>
        <div style={{marginTop:"10px"}}>
        <label>Deadline *</label>
        <input type="text"  className="service_input_box"/>
        </div>
        <textarea placeholder="Purpose" className="service_input_box" style={{height:"200px",resize:"none"}}/>
        
        <Buttons.PrimaryButton value="Send" style={{marginLeft:"0%"}}/>
    </div>
)
    
}