import React, { useEffect } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import "./negotiations.css";
import BuyerCard from "../../Components/BuyerCard"
import SellerCard from "../../Components/SellerCard";
import Buttons from "../../Components/Buttons"
import SelectedAssest from "../../Components/SelectedAssest";
import successImage from "../../Components/Toast/green_check_small_filled.png";
import NegotiationCompanyList from "../../Components/Negotiation CompanyList/negotiationcompanylist"
import {
    BrowserRouter as Router,
    useLocation
  } from "react-router-dom";
import BuyerForm from "../../Components/BuyerForm/buyerform"
import { apiCall } from "../../Utils/Network";

let Negotiations = (props) => {
    const [tradecommunication,setTradeCommunication] = React.useState({});
    const location = useLocation();
    const selectedTrade = location.state.selectedTrade;
    const [newoffer,setNewoffer] = React.useState(false);
    const [offeraccepted,setOfferaccepted] = React.useState(false);
    const [offerrejected,setOfferrejected] = React.useState(false);
      const acceptorreject = function (x){
            reqBody = x;
            console.log("acceptorreject called",x)
        }

    var reqBody = {

        "communicationStatus": "string",
        "accountIdTo": "1manoj",
        "message": "comment",
        "offeredPrice": "price",
        "offeredQuantity": "quantity",
        "tradeId": selectedTrade.id
    }

    useEffect(()=>{
        console.log("hi calling**********")
        GetTradeCommunication();
    },[])

    
    const  GetTradeCommunication = async function () {
        console.log("hi calling**********1")
        const response = await apiCall("tradecommunication/trade/"+selectedTrade.id,"GET")
        console.log("hi calling**********2")
        const responseJSON = await response.json();
        console.log("hi calling**********3")
        setTradeCommunication(responseJSON)
        console.log("hi calling**********4")
    }

    let chatBalloons = []
    let a = "";
    let b = "";


    for(let i=0; i<tradecommunication.length; i++){

        if(tradecommunication[i].isYourCommunication == true && tradecommunication[i].tradeNegotiatorType === "buy") {
            a = "(You)";
       } else {
            a = "";
       }

        if(tradecommunication[i].isYourCommunication == true && tradecommunication[i].tradeNegotiatorType === "sell") {
            b = "(You)";
        } else {
            b = "";
        }

        if(tradecommunication[i].tradeNegotiatorType === "buy"){
            chatBalloons.push(
                <React.Fragment>
                <br />
                <div className="buyercard">
                <h3>Buyer {a}</h3>
                <BuyerCard values={tradecommunication[i]}/>
                </div>
                </React.Fragment>
                )
        }
        else if(tradecommunication[i].tradeNegotiatorType === "sell") {
            chatBalloons.push(
                <React.Fragment>
                    <br />
                    <div style={{display:"flex",justifyContent:"center",paddingLeft:"250px"}}>
                    <h3>Seller {b}</h3>
                    </div>
                    <div className="sellercard">
                     <SellerCard values={tradecommunication[i]}/>
                    </div>
                </React.Fragment>
            )
        }
    }
    const NewOffer = function(){
        return(<React.Fragment>
            <br />
            <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
            <BuyerForm newoffer={newoffer} setNewoffer={setNewoffer} callback={GetTradeCommunication} tradecommunication1={tradecommunication}
            acceptorreject={acceptorreject}
            />
            </div>
        </React.Fragment>

        )
    }
    const Reject = function(){
        return(<h1>Offer Rejected</h1>)
    }
    const Accept = function () {
        
        return(<React.Fragment>
            <br />
            <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
            <div>
            <div style={{display:"flex",background: "#2E384D",
            flexDirection:"column",padding:"10px",borderRadius: "10px",color: "#FFFFFF"}}> 
                    <div style={{display:"flex"}}>
                    <img src={successImage} style={{margin:"10px"}}/>
                    <h3>Offer Accepted</h3>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",marginLeft:"40px",
                    marginRight:"10px",fontWeight: "500"}}>
                        <p>Congratulations! your order has been<br/> Accepted!
                            You can proceed to the<br/> our safe transaction portal!
                        </p>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",marginRight:"10px",color: "#00CC83"}}>
                        <h3 style={{cursor:"pointer"}}>Go To Transactions</h3>
                    </div>
            </div>
            </div>
            </div>
        </React.Fragment>

        )
        
    }
    return (
        <div className="negotiations">
            <Breadcrumbs/>
            <div className="content-card">
                <div className="ongoing-negotiations">
                    <NegotiationCompanyList/>
                </div>
                <div className="active-negotiation">
                   <SelectedAssest />
                    <div className="conversation">
                    
                   {chatBalloons} 
                   {newoffer === true || tradecommunication.length === 0 ? NewOffer() : null}    
                     
      
                    {offeraccepted === true? null:
                        <div className="negotiation_buttons_container">

                            <Buttons.SecondaryButton value="Accept" onClick={async ()=>{
                                await setOfferaccepted(true)
                                reqBody.communicationStatus = "accepted";
                                const response = await apiCall("tradecommunication/",'POST',reqBody)
                                const responseJSON = await response.json();

                                console.log(reqBody)
                                console.log("accept called")
                                }} />
                            <Buttons.SecondaryButton value="Reject" onClick={async ()=>{
                                await setOfferrejected(true)
                                reqBody.communicationStatus = "rejected";
                                const response = await apiCall("tradecommunication/",'POST',reqBody)
                                const responseJSON = await response.json();
                                console.log(reqBody)
                                console.log("reject called")
                                }}/>
                            <Buttons.SecondaryButton value="New Offer" onClick={()=>{setNewoffer(true)}}/>

                        </div>
                        }
                    {offeraccepted === true ? Accept(): offerrejected=== true ? Reject():null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Negotiations