import React, { useState } from "react";
import Select from "react-select";
import Buttons from "../../Components/Buttons";
import Aware from "./not.svg"
import "./service.scoped.css"
import Broker from "./findabroker.png"
import SunPharma from "./companies_logo.svg"
import { ToggleSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css'
import { useHistory } from "react-router-dom";


const options = [
    { value: "ROFR", label: "ROFR" },
    { value: "HR approval", label: "HR approval" },
  ];
export default function FindABroker  () {
    let history = useHistory();

    return(
    <div className="LoanAgainstShares_container">
        <img src={Broker}/>
        <h3>Find a broker</h3>
        <div className="service_line"></div>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        </p>
        <div>
        <div style={{display:"flex",justifyContent:"space-between",cursor:"pointer"}}
        onClick={()=>{history.push("/selectholding")}}
        >
            <label >Select Holding*</label><label> > </label>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px"}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{margin:"10px"}}>
                <img src={SunPharma}/>
                </div>
                <div>
                <p><b>Sun Pharma</b></p>
                <p>Banking </p>
                <p>TNPO98765</p>
                </div>
            </div>
            <div style={{margin:"10px"}}>
                <p>Share Type</p>
                <p><b>Ordinary</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Qty</p>
                <p><b>12</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Price/Share</p>
                <p><b>₹ 100</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Amount</p>
                <p><b>₹ 1200</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Date & Time</p>
                <p><b>9 Oct 2020</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Verified</p>
                <p><b>Yes</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Available For Sell</p>
                <p><ToggleSwitch /></p>
            </div>


        </div>

        </div>
        
        <textarea placeholder="Reason for hiring Broker" className="service_input_box" style={{height:"200px",resize:"none"}}/>
        
        <Buttons.PrimaryButton value="Send" style={{marginLeft:"0%"}}/>
    </div>
)
    
}