import React from "react";
import "./sellerCard.css"
import HDFC from "./hdfc.svg"

let SellerCard = ({values}) => {

    return (
        <div className="seller-card">
            <div className="seller_card_Company_logo"> <img src={HDFC} /> </div>
            <div className="seller_card_first_row">
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
            <div className="Sellercard_horizontal_line"> </div>
            <div className="row">
                <p className="seller-proposed_amt">Proposed Amount</p>
                <p className="seller-proposed-amt-in-numbers">₹ {values.offeredQuantity * values.offeredPrice}</p>
            </div>
            <div className="row">
                <p className="user-comment">*User Comment</p>
                <p className="user-message">{values.message}</p>
            </div>
        </div>
    )
}
export default SellerCard