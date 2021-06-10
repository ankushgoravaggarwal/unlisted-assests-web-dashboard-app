import React, { useState, useRef } from "react";
import logo from "../logo.png"
import backButton from "../back_button.png"
import mobileVerificationMainImage from "./mobile_verification.png"
import { Link } from "react-router-dom";
import "./mobileVerification.css";
import {
    successToast,errorToast
  } from "../../../src/Components/Toast/index";
import { apiCall } from "../../Utils/Network";
import { PinDropSharp } from "@material-ui/icons";
import Buttons from "../../Components/Buttons/index";




let MobileVerification = (props) => {

    const otpArrayRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const [otpArray, setOtpArray] = useState(["", "", "", ""])

    const otpOnChangeHandler = (index, element) => {
        let valueToChange = element.target.value

        if(!(/[0-9]/.exec(valueToChange)))
            return

        let otpArrayClone = [...otpArray]
        otpArrayClone[index] = valueToChange
        setOtpArray(otpArrayClone)

        if(valueToChange === "")
            return

        if(otpArrayRefs.length > index+1)
            otpArrayRefs[index+1].current.focus()
    }

    let inputArrayBoxes = otpArrayRefs.map((ref, index) => {
        return <input type="textbox" 
            maxlength={1} 
            autoComplete="none" 
            value={otpArray[index]} 
            onChange={(e) => otpOnChangeHandler(index, e)}
            ref={ref}
            />
    })
    const verifyMobileOTP = async function(){
        
            if(props.type === "mobile"){
        let response = await apiCall("profile/verifymobilenumberloggedinotp/"+otpArray.join(''),"POST")
          console.log("apicalled",response)
                  if (response.status !== 200) {
                      errorToast("Invalid", "OTP Invalid");
                      setOtpArray("");
                      return;
                  }else if (response.status === 200){
                      
                    successToast("Success","Mobile verified Successfully!")
                    return
                  }
                }else if(props.type === "email"){
                    let response = await apiCall("profile/verifyemailloggedinotp/"+otpArray.join(''),"POST")
                    console.log("apicalled",response)
                            if (response.status !== 200) {
                                errorToast("Invalid", "OTP Invalid");
                                return;
                            }else if (response.status === 200){
                                
                              successToast("Success","Mail verified Successfully!")
                              return
                            }  

                }
    }
    const mobileVerifyResend = async function(){
        if (props.type === 'mobile'){
        let response = await apiCall("profile/resendotponmobileloggedin/","POST")
          console.log("apicalled",response)
                  if (response.status !== 200) {
                      errorToast("Invalid", "Mobile Number Does not exists");
                      return;
                  }else if (response.status === 200){
                      
                    successToast("Success","OTP resent to your mobile please check")
                    
                  }
         }else if (props.type === 'email'){
            let response = await apiCall("profile/sendotponemailloggedin","POST")
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
        <div className="mobile-verification">
            {/* <div>
                <img src={logo} className="unlisted-assests-logo-header"/>
                <div className="horizontal-line" />
                <img src={backButton} className="back-button"/>
            </div> */}
            

            <div className="mobile-verification_main-content">
                <img src={mobileVerificationMainImage} className="mobile-verification_main-image"/>
                {props.type === 'mobile'?
                <p className="mobile-verification_heading">Mobile verification</p>:props.type === 'email'?
                <p className="mobile-verification_heading">Email verification</p>:null
            }
                <p className="mobile-verification_description">A verification code has been sent to your
                    mobile number. Please add
                    your code here.
                </p>
                
                    <div className="mobile-verification_otp-boxes-group">
                        {inputArrayBoxes}
                    </div>
                    <div className="mobile-verification_submit-container">
                        <Buttons.PrimaryButton value="Verify" onClick={verifyMobileOTP}/>
                    </div>
                

                <div >
                    <p>If you didn’t receive a code! <span style={{cursor:"pointer"}} onClick={mobileVerifyResend}><b>Resend Code</b></span></p>
                </div>
            </div>

            <div className="mobile-verification_dummy-div"/>
        </div>
    )
}

export default MobileVerification
