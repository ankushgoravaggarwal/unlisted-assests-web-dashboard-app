import React from "react";
import "./sellerCard.css"
import HDFC from "./hdfc.svg"

let SellerCard = ({values}) => {

    return (
        <div className={values.communicationStatus != "accepted" ?"seller-card": "seller_card_rejected"}>
            <div className="seller_card_Company_logo"> <img src={HDFC} /> </div>
            <div className="seller_card_first_row d-flex">
                <p className="m-0">HDFC banks</p>
                <h6 className="m-0 text-dark mr-2"><b>₹ {values.offeredQuantity}</b></h6>
            </div>
            <div className="seller-card-desc mt-2 d-flex justify-content-between">
                <p className="m-0">Price / Share</p>
                <p className="price m-0">₹ {values.offeredPrice}</p>
            </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="m-0">Transaction Fees <br/><span style={{fontSize:"10px"}}>*Including GST</span></p>
                <p className="price m-0">₹ 14.7 </p>
            </div>
            <div className="Sellercard_horizontal_line"> </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="seller-proposed_amt m-0">Proposed Amount</p>
                <p className="seller-proposed-amt-in-numbers m-0">₹ {values.offeredQuantity * values.offeredPrice}</p>
            </div>
            <div className="seller-card-desc d-flex justify-content-between">
                <p className="user-comment m-0 ">*User Comment</p>
                <p className="user-message m-0 ">{values.message}</p>
            </div>
        </div>
    )
}
export default SellerCard