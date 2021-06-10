import React from 'react'
import backButton from "../back_button.png"
import logo from "../logo.png"
import forgotImg from "./forgot_user_id.png"
import "./forgotuserid.css"
import {
    errorToast, successToast,
  } from "../../../../src/Components/Toast/index";

let ForgotUserId = () =>{
    const [forgotID,setForgotID]=React.useState()
    
    const Continue = async function(event){
        event.preventDefault();
    if (Number(forgotID) && forgotID.length === 10){
    let response = await fetch("http://api1.unlistedassets.com/profile/sendotponmobileNotloggedin/"+forgotID,
    {method:"POST"})
    console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Email ID Does not exists");
                return;
            }else if (response.status === 200){
                successToast("Success","Email sent to your mail ID please check")
            }
        }else{
    let response = await fetch("http://api1.unlistedassets.com/profile/resettinguseridnotloggedinotpmobile/"+forgotID,
    {method:"POST"})
    console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Email ID Does not exists");
                return;
            }else if (response.status === 200){
                successToast("Success","Email sent to your mail ID please check")
            }
    
        }
    
}
    return (
        <div className = "forgotuser">
        <img src={logo} className="unlisted-assests-logo-header"/>
        <div className="horizontal-line" />
        <img src={backButton} className="back-button"/>
            <div className = "main-content">
                <img src={forgotImg} className="forget-logo" />
                <div className = "content-text">
                    <p className = "heading">Forgot your user ID?</p>
                    <p>Enter your email address and we'll providing you user ID.</p> 
                </div>
                <form>
                    <label>Email *</label>
                    <input type = "text" onChange={(e)=>setForgotID(e.target.value)} value={forgotID}/>
                    <input type = "submit" style={{cursor:"pointer"}} onClick={Continue} value ="Continue" className = "submit-button"/>
                </form>
            </div>
        </div>
    )
}

export default ForgotUserId