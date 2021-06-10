import React from "react";
import "./buyerCard.css"
import HDFC from "./hdfc.svg"
let BuyerCard = ({values}) => {

    console.log("props of buyer card", values)
    return (
        <div className={values.communicationStatus != "accepted" ? "buyer-card" : "buyer_card_accepted"}>
            <div className="buyer_card_Company_logo"> <img src={HDFC} /> </div>
            <div className="buyer_card_first_row d-flex">
                <p className="m-0">HDFC banks</p>
                <h6 className="m-0 text-dark mr-2"><b>₹ {values.offeredQuantity}</b></h6>
            </div>
            <div className="buyer-card-desc mt-3 d-flex justify-content-between">
                <p className="m-0">Price / Share</p>
                <p className="price m-0">₹ {values.offeredPrice}</p>
            </div>
            <div className="buyer-card-desc  d-flex justify-content-between">
                <p className="m-0">Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p className="price m-0">₹ 14.7 </p>
            </div>
            <div className="Buyercard_horizontal_line"> </div>
            <div className="buyer-card-desc d-flex justify-content-between">
                <p className="buyer-proposed_amt m-0">Proposed Amount</p>
                <p className="buyer-proposed-amt-in-numbers m-0">₹ {values.offeredQuantity * values.offeredPrice}</p>
            </div>
            <div className="buyer-card-desc d-flex justify-content-between">
                <p className="buyer-user-comment m-0">*User Comment</p>
                <p className="buyer-user-message m-0">{values.message}</p>
            </div>
            
        </div>
    )
}
export default BuyerCard