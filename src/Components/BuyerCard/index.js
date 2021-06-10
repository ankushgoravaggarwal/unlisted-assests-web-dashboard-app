import React from "react";
import "./buyerCard.css"
import HDFC from "./hdfc.svg"
let BuyerCard = ({values}) => {

    console.log("props of buyer card", values)
    return (
        <div className="buyer-card">
            <div className="buyer_card_Company_logo"> <img src={HDFC} /> </div>
            <div className="buyer_card_first_row">
                
                <p>HDFC banks</p>
                <p>₹ {values.offeredQuantity}</p>
            </div>
            <div className="row">
                <p>Price / Share</p>
                <p>₹ {values.offeredPrice}</p>
            </div>
            <div className="row">
                <p>Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p>₹ 14.7 </p>
            </div>
            <div className="Buyercard_horizontal_line"> </div>
            <div className="row">
                <p className="buyer-proposed_amt">Proposed Amount</p>
                <p className="buyer-proposed-amt-in-numbers">₹ {values.offeredQuantity * values.offeredPrice}</p>
            </div>
            <div className="row">
                <p className="buyer-user-comment">*User Comment</p>
                <p className="buyer-user-message">{values.message}</p>
            </div>
            
        </div>
    )
}
export default BuyerCard