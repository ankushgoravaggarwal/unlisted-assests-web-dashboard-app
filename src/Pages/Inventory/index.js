import React from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import AddHoldings from "./addholdings.svg"
import "./holdings.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";

let Holdings = () => {
    let history = useHistory();
    return (<div>
        <div>   <Breadcrumbs/> </div>
            <div className="add_holdings_container">
                <div className="add_holdings_center_box">
                    <div><img src={AddHoldings}/></div>
                    <div><p className="no_holdings_message"> <b>You don't have any holdings </b> </p></div>
                    <div><button className="add_holdings_button"
                    onClick={()=>{history.push("/addholdings")}}
                    >Add Holding</button></div>
                    <div><br/><a href="#"> Go back</a></div>
                </div>
            </div>


        </div>
    )
}

export default Holdings