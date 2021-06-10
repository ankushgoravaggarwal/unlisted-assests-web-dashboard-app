import React, { useEffect } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import "./negotiations.css";
import BuyerCard from "../../Components/BuyerCard"
import SellerCard from "../../Components/SellerCard";
import Buttons from "../../Components/Buttons";
import BuyersTab from "../../Components/Negotiation CompanyList/BuyersTabs"
import SelectedAssest from "../../Components/SelectedAssest";
import successImage from "../../Components/Toast/green_check_small_filled.png";
import rejectImage from "./red_cross_circle_filled.png"
import NegotiationCompanyList from "../../Components/Negotiation CompanyList/negotiationcompanylist"
import {
    BrowserRouter as Router,
    useLocation
  } from "react-router-dom";
import BuyerForm from "../../Components/BuyerForm/buyerform"
import { apiCall } from "../../Utils/Network";
import 'bootstrap/dist/css/bootstrap.min.css';
let Negotiations = (props) => {
    //const [tradecommunication,setTradeCommunication] = React.useState({});
   const [tradecommunication1,setTradeCommunication1] = React.useState([]);
    const location = useLocation();
    const selectedTrade = location.state.selectedTrade;
    let selectedOnGoingTxn = location.state.selectedongoingtxn;
    const [newoffer,setNewoffer] = React.useState(false);
    const [offeraccepted,setOfferaccepted] = React.useState(false);
    const [offerrejected,setOfferrejected] = React.useState(false);
      const acceptorreject = function (x){
            reqBody = x;
            console.log("acceptorreject called",x)
        }

    let chatBalloons = [];
    let tradecommunication= {};


    var reqBody = {

        "communicationStatus": "rejected",
        "accountIdTo": "1manoj",
        "message": "it's a dummy comment",
        "offeredPrice": "1",
        "offeredQuantity": "0",
        "tradeId": selectedTrade.id
    }



    React.useEffect( async () => {
        console.log("hi calling**********")
        await GetTradeCommunication();
    },[])

    const GetTradeCommunication = async () => {

        //when people press negotiate button (marketplace)
        //we got to create ongoing transaction record

        console.log("ytytytytytytytytytytytytyty22"+selectedTrade.id)
        try {
            const response = await apiCall("tradecommunication/trade/" + selectedTrade.id, "GET")

            const responseJSON = await response.json();

            //console.log("ma1"+responseJSON.length)
            console.log(responseJSON + "ytytytytytytytytytytytytyty6666")
            console.log("ma2")
            //await setTradeCommunication(responseJSON)
            tradecommunication=responseJSON;

            creatingChatBallons()

            console.log("ma2"+tradecommunication.length)
       } catch (err) {
            console.log(err);
        }
    }
    

    const acceptButton = function(){
        return(<React.Fragment>
                <Buttons.SecondaryButton value="Accept" onClick={async ()=>{
                    //
                    reqBody.communicationStatus = "accepted"
                    await apiCall("tradecommunication/",'POST',reqBody)
                    console.log(reqBody)
                    console.log("accept called")
                    //await setNewoffer(false)
                    GetTradeCommunication()
                    //await setOfferaccepted(true)
                }} />
        </React.Fragment>

        )
    }

    const rejectButton = function(){

        return(
            <React.Fragment>
                <Buttons.SecondaryButton value="Reject" onClick={async ()=>{
                    //setOfferrejected(true)
                    reqBody.communicationStatus = "rejected"
                    await apiCall("tradecommunication/",'POST',reqBody)
                    console.log(reqBody)
                    console.log("reject called")
                    //await setNewoffer(false)
                    GetTradeCommunication()
                }}/>
            </React.Fragment>
       )
    }
    const newOfferButton = function(){
        return(<React.Fragment>
                <Buttons.SecondaryButton value="New Offer" onClick={()=>{setNewoffer(true)}}/>
            </React.Fragment>
        )
    }

    const newOfferCard = function(){
        // {setNewoffer(false)}
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


    const RejectCard = function(){
        return(
            <React.Fragment>
            <br />
            <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
            <div>
            <div className="reject-tost"> 
                    <div className="d-flex align-items-center">
                      <img src={rejectImage} className="m-2" width="30" height="30"/>
                      <h4 className="m-0 ">Offer Rejected</h4>
                    </div>
                    <div style={{marginLeft:"40px"}}>
                        <p>Oops! your order has been<br/> Rejected!
                            You can proceed to the<br/> our safe transaction portal!
                        </p>
                    </div>
                    {/*<div style={{display:"flex",justifyContent:"flex-end",marginRight:"10px",color: "#00CC83"}}>*/}
                    {/*    <h3 style={{cursor:"pointer"}}>Go To Transactions</h3>*/}
                    {/*</div>*/}
            </div>
            </div>
            </div>
        </React.Fragment>

        )
    }
    const AcceptCard = function () {

        return(<React.Fragment>
            <br />
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className="accept-tost"> 
                        <div className="d-flex align-items-center">
                            <img src={successImage} className="m-2" height="30" width="30"/>
                            <h4 className="m-0">Offer Accepted</h4>
                        </div>
                        <div className="accept-tost-msg">
                            <p>Congratulations! your order has been<br/> Accepted!
                                You can proceed to the<br/> our safe transaction portal!
                            </p>
                        </div>
                        {/*<div style={{display:"flex",justifyContent:"flex-end",marginRight:"10px",color: "#00CC83"}}>*/}
                        {/*    <h3 style={{cursor:"pointer"}}>Go To Transactions</h3>*/}
                        {/*</div>*/}
                </div>
            </div>
        </React.Fragment>

        )
        
    }


    const acceptrehectnewofferbutton = () => {
        return(<React.Fragment>
        <div className="negotiation_buttons_container">
            {acceptButton()}
            {rejectButton()}
            {newOfferButton()}
        </div>
    </React.Fragment>
    )
    }



    const creatingChatBallons = async function() {
        console.log("ytytytytytytytytytytytytyty2222233333")

        let a = "";
        let b = "";

        console.log(tradecommunication.length+"ytytytytytytytytytytytytyty1")
        for(let i=0; i<tradecommunication.length; i++){

            console.log(tradecommunication.length+"ytytytytytytytytytytytytyty2")

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
            console.log("hyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyhyh"+tradecommunication[i].communicationStatus)

            if(tradecommunication[i].tradeNegotiatorType === "buy"
                && tradecommunication[i].communicationStatus == "newoffer"){
                chatBalloons.push(
                    <React.Fragment>
                        <br />
                        <h6 className="lastseen">yesterday</h6>
                        <div className="buyercard">
                            <h6 className="text-dark"><b>Buyer {a}</b> <span className="time text-small text-dark">11:00 AM</span></h6>
                            <BuyerCard values={tradecommunication[i]}/>
                        </div>
                    </React.Fragment>
                )
            }
            else if(tradecommunication[i].tradeNegotiatorType === "sell"
                && tradecommunication[i].communicationStatus == "newoffer") {
                chatBalloons.push(
                    <React.Fragment>
                        <br />
                        <div style={{display:"flex",justifyContent:"center",paddingLeft:"250px"}}>
                            <h6 className="text-dark"><b>Seller {b}</b><span className="time text-small text-dark">11:00 PM</span></h6>
                        </div>
                        <div className="sellercard">
                            <SellerCard values={tradecommunication[i]}/>
                        </div>
                    </React.Fragment>
                )
            } else if (tradecommunication[i].tradeNegotiatorType === "buy"
                && (tradecommunication[i].communicationStatus == "accepted"
                    || tradecommunication[i].communicationStatus == "rejected")) {
                if(tradecommunication[i].communicationStatus == "accepted") {

                    //setOfferaccepted(true)
                    chatBalloons.push(
                        <React.Fragment>
                            <br />
                            <div className="buyercard">
                                <h3>Buyer {a}</h3>
                                <AcceptCard />
                            </div>
                        </React.Fragment>
                    )
                } else {
                    chatBalloons.push(
                        <React.Fragment>
                            <br />
                            <div className="buyercard">
                                <h3>Buyer {a}</h3>
                                <RejectCard/>
                            </div>
                        </React.Fragment>
                    )
                }


            } else if(tradecommunication[i].tradeNegotiatorType === "sell"
                && (tradecommunication[i].communicationStatus == "accepted"
                    || tradecommunication[i].communicationStatus == "rejected")) {
                if(tradecommunication[i].communicationStatus == "accepted") {
                    //setOfferaccepted(true)

                    chatBalloons.push(
                        <React.Fragment>
                            <br />
                            <div style={{display:"flex",justifyContent:"center",paddingLeft:"250px"}}>
                                <h6 className="text-dark user-title"><b>Seller {b}</b></h6>
                            </div>
                            <div className="sellercard">
                                <AcceptCard />
                            </div>
                        </React.Fragment>
                    )
                } else {
                    chatBalloons.push(
                        <React.Fragment>
                            <br />
                            <div style={{display:"flex",justifyContent:"center",paddingLeft:"250px"}}>
                                <h6 className="text-dark user-title"><b>Seller {b}</b></h6>
                            </div>
                            <div className="sellercard">
                                <RejectCard/>
                            </div>
                        </React.Fragment>
                    )
                }
            }
        }

        setTradeCommunication1(chatBalloons);
    }



    return (
        <div className="container-fluid">
            <Breadcrumbs/>
            <div className="my-card">
                <div className="row"> 
                    <div className="col-md-3 col-12">
                        <div className="ongoing-negotiations Negotiations-left-section">
                            <NegotiationCompanyList/>
                        </div>
                    </div>
                    <div className="col-md-9 col-12">
                        <div className="active-negotiation Negotiations-right-section mobi-none">
                                <div className="mobi-none">
                                    <SelectedAssest />
                                </div>
                                <div className="conversation ">
                                    <div className="conversation_inner">
                            {tradecommunication1}
                                    { offeraccepted ? null :
                                                            tradecommunication1.length == 0 || newoffer === true ? newOfferCard() :
                                                                                                                                                    acceptrehectnewofferbutton()
                                    }
                                    </div>
                                </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="my-card mt-3 desktop-none">
                <div>
                    <BuyersTab/>
                </div>
                            <div className="active-negotiation Negotiations-right-section">
                                    <div className="mobi-none">
                                        <SelectedAssest />
                                    </div>
                                    <div className="conversation ">
                                        <div className="conversation_inner">
                                {tradecommunication1}
                                        { offeraccepted ? null :
                                                                tradecommunication1.length == 0 || newoffer === true ? newOfferCard() :
                                                                                                                                                        acceptrehectnewofferbutton()
                                        }
                                        </div>
                                    </div>
                            </div>
                        </div>
        </div>
    )
}

export default Negotiations