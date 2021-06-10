import React from "react";
import "../BuyerAgreementComponents/buyeragreementlefthalf.scoped.css"
import HDFC from "./Framehdfc.png"
import More from "./Group 1092more.png"
import Aware from "./not.svg"
import seemore from "./Vector_seemore.png"
export default function BuyerAgreementLeftHalf (){
    return(
        <div>
            <h3>Transaction Detail</h3>

            <div>
                <div className="buyeragreement_transactionDetails">
                <p className="buyeragreement_transactionDetails_leftside">Price/Share</p><p><b>₹ 98</b></p>
                </div>
                <div className="buyeragreement_transactionDetails">
                <p>12 x 98</p><p><b>₹ 1,176</b></p>
                </div>
                <div className="buyeragreement_transactionDetails">
                <p>Transaction fee <br/><span style={{fontSize: "10px"}}>*Including GST</span></p><p><b>₹ 15.7</b></p>
                </div>
                <div className="buyeragreement_transactionDetails buyeragreement_taransaction_total">
                <p>Total</p><p>₹ 1,191.7</p>
                </div>
            </div>

            <div style={{borderTop:"1px solid #CFCBCF",paddingTop:"10px"}}>
                <div className="buyeragreement_transactionDetails">
                    <div style={{display:"flex"}}>
                        <div>
                        <img src={HDFC}/>
                        </div>
                        <div>
                        <p><b>HDFC Bank</b></p>
                        <p>Banking</p>
                        <p>INO98765456</p>
                        </div>
                    </div>
                <div>
                <img src={More}/>
                </div>
                </div>
                <div className="buyeragreement_transactionDetails">
                    <div >
                    <p>Date & Time</p>
                    <p><b>23 may 2021</b></p>
                    </div>
                    <div >
                    <p>Share Type</p>
                    <p><b>ESOP</b></p>
                    </div>
                </div>
            </div>

            <div className="buyeragreement_seemore">
              <p> <img src={seemore} style={{height:"7px"}}/> see more</p> 
            </div>
            <div>
                <p><b>Time Remaining For transaction</b></p>
                <div className="buyeragreement_Timer">
                    <h2>40h : 30mins</h2>
                </div>
            </div>

            <div className="buyeragreement_aware">
                <img src={Aware}/>
                <p style={{marginLeft:"10px"}}>If not completed after 48 hours from start, this transaction will restart with new agreement sigining automatically.
                    Additional charges are applicable immediately <br/><b className="buyeragreement_readmore">Read more.</b>
                </p>
            </div>

        </div>
    )
}