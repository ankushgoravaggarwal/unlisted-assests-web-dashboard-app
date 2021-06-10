import React from 'react';
import "./transactiondetails.css"
import SunPharma from "./sun_pharma.svg"
import Buttons from '../../Components/Buttons';

export default function AuditorTransactionDetails(){
    return(
        <div style={{margin:"10px",border: "1px solid #CFCBCF",borderRadius: "4px",padding:"10px"}}>
           <div>
           <h3>Transaction Details</h3>
           <div style={{borderBottom:"2px solid #721B65",width:"150px"}}></div>
           </div>
           <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
           <div style={{display:"flex",flexDirection:"column",width:"65%"}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
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
                <p>Negotiation ID</p>
                <p><b>12345678</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Deal ID</p>
                <p><b>12345678</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Seller ID</p>
                <p><b>12345678</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Buyer ID</p>
                <p><b>12345678</b></p>
            </div>
            </div> 

            <div style={{display:"flex",flexDirection:"column",
            paddingLeft:"300px",justifyContent:"flex-end"}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
            <div style={{margin:"10px"}}>
                <p>Amount</p>
                <p><b>₹ 900</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Qty</p>
                <p><b>12</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Price/Share</p>
                <p><b>₹ 100</b></p>
            </div>
            </div> 

            <div style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
            <div style={{margin:"10px"}}>
                <p>Product Type</p>
                <p><b>Employee Share</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Sale Conditions</p>
                <p></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Conditions For Transfer</p>
                <p><b>ROFR, HR Approval</b></p>
            </div>
            </div> 

            <div style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
            <div style={{margin:"10px"}}>
                <p>Date of acceptance</p>
                <p><b>5 Oct 2020, 10:00 AM</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Qty</p>
                <p><b>12</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Money Transfered On</p>
                <p><b>5 Oct 2020, 10:00 AM</b></p>
            </div>
            </div> 

            <div style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
            <div style={{margin:"10px"}}>
                <p>Mode of money Transfer</p>
                <p><b>Paypal</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Mode of Share Transfer</p>
                <p><b>Demat kotak Account</b></p>
            </div>
            <div style={{margin:"10px"}}>
                <p>Mode of agreement signing</p>
                <p><b>Aadhar based</b></p>
            </div>
            </div> 

            <div style={{display:"flex",justifyContent:"flex-end",padding:"10px"}}>
            <div style={{margin:"10px"}}>
                <p>Buyer/Seller fee</p>
                <p><b>₹ 5000</b></p>
            </div>
            </div> 
            </div>
            </div>

            <div style={{display:"flex",flex:"1",justifyContent:"center"}}>
            <div>
            <div>
            <h3 style={{color: "#721B65"}}>Transaction Receipt</h3>
            </div>
            <div>
                <div className="auditorscreen_transactionDetails">
                <p >Price/Share</p><p><b>₹ 98</b></p>
                </div>
                <div className="auditorscreen_transactionDetails">
                <p>12 x 98</p><p><b>₹ 1,176</b></p>
                </div>
                <div className="auditorscreen_transactionDetails">
                <p>Transaction fee <br/><span style={{fontSize: "10px"}}>*Including GST</span></p><p><b>₹ 15.7</b></p>
                </div>
                <div className="auditorscreen_transactionDetails auditorscreen_taransaction_total">
                <p>Total</p><p><b>₹ 1,191.7</b></p>
                </div>
            </div>
            </div>
            </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                    <p><b>Time Remaining For Audit</b></p>
                    <div className="auditorscreen_Timer">
                        <h2>40h : 30mins</h2>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <p style={{marginTop:"25px"}}><b>Save Progress as Draft</b></p>
                    <Buttons.SecondaryButton value="Back"/>
                    <Buttons.PrimaryButton value="Next"/>
                </div>
            </div>
        </div>
    )
}
