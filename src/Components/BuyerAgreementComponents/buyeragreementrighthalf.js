import React from "react";
import CompleteTransactionsteps from './completetransactionstepsGroup.png'
import "./buyeragreementrighthalf.scoped.css"

export default function BuyerAgreementRightHalf (){
    return(
        <div style={{}}>
            <div style={{display:"flex",padding:"10px",background: "#FBFBFF",borderRadius:"4px",border: "1px solid #CFCBCF"}}>
            <div style={{marginRight:"10px"}}>
            <img src={CompleteTransactionsteps} />
            </div>
            <div>
            <h3>Complete Transaction Steps</h3>
            </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Negotiation freeze</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Buyer Agreement Signing</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Seller Agreement Signing</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Money received from buyer</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Shares transfered to buyers Demat account</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Buyer's approval on receiving shares</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Verification by Trustee</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps">
                <div className="buyeragreement_radioContainer">
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Transactions confirmed by Unlisted Assets</p>
                </div>
            </div>
            <div className="buyeragreement_completetransactionsteps" style={{borderBottom: "1px solid #CFCBCF"}}>
                <div className="buyeragreement_radioContainer" >
                <input type="radio" className="buyeragreement_radio"/>
                </div>
                <div>
                <p>Transaction Complete</p>
                </div>
            </div>
        </div>
    )
}