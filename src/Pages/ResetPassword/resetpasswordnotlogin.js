import React, { useState } from "react";

import "./resetpassword.css"
// import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import backButton from "../back_button.png"
import passwordImg from "./Reset_Password.png"
// import googleLogo from "./google_logo.png"
import { Link } from "react-router-dom";
import { apiCall } from '../../Utils/Network';
import {
    errorToast, successToast,
  } from "../../Components/Toast/index";
import { PinDropSharp } from "@material-ui/icons";
import StateManager from "react-select";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,useLocation
  } from "react-router-dom";

export default function ResetPasswordNotLogIn(){
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp,setOtp] = useState("")
    const history = useHistory();
    let location = useLocation();
    let mobile = location.state.mobile;
    console.log(location)

    const [passwordValidationChecks, setPasswordValidationChecks] = useState({
        isConfirmPasswordSameAsPassword: false,
        doesContainMinimumCharacter: false,
        doesContainMinimumUpperCase: false,
        doesContainMinimumNumericDigits: false,
        doesContainMinimumSpecialCharacters: false
    })

    const validatePassword = (password, confirmPassword) => {
        let passwordValidationChecksClone = { ...passwordValidationChecks }

        if(password === confirmPassword && password !== ""){
            passwordValidationChecksClone.isConfirmPasswordSameAsPassword = true
        } else {
            passwordValidationChecksClone.isConfirmPasswordSameAsPassword = false
        }

        let minCharRegex = /^.{8,}$/

        if(minCharRegex.exec(password))
            passwordValidationChecksClone.doesContainMinimumCharacter = true
        else
            passwordValidationChecksClone.doesContainMinimumCharacter = false

        let minUpperCharRegex = /[A-Z]/

        if(minUpperCharRegex.exec(password))
            passwordValidationChecksClone.doesContainMinimumUpperCase = true
        else
            passwordValidationChecksClone.doesContainMinimumUpperCase = false

        let  minDigitRegex = /[0-9]/

        if(minDigitRegex.exec(password))
            passwordValidationChecksClone.doesContainMinimumNumericDigits = true
        else
            passwordValidationChecksClone.doesContainMinimumNumericDigits = false

        let minSpecialChar = /[~!@#$%^&*()_+`=\-{}\[\]'":;<>?,.\/]/

        if(minSpecialChar.exec(password))
            passwordValidationChecksClone.doesContainMinimumSpecialCharacters = true
        else
            passwordValidationChecksClone.doesContainMinimumSpecialCharacters = false

        setPasswordValidationChecks(passwordValidationChecksClone)


    } 
    const Update = async function(event){
        event.preventDefault();
    
    const response = await fetch("http://api1.unlistedassets.com/profile/resettingpasswordnotloggedinotpmobile/"+confirmPassword+"/"+mobile+"/"+otp,
    {method:"POST"})
    console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Mobile Number Does not exists");
                return;
            }else if (response.status === 200){
                successToast("Success","Password Changed Successfully!")
                history.push("/login")
            }
    
    
    
}

    return(
        <div className="reset_password_mobile-verification">
        <div className="reset_password_header">
        <img src={logo} className="reset_password_unlisted-assests-logo-header"/>
        </div>
        {/* <img src={backButton} className="back-button"/> */}

        <div className ="reset_password_container">
        <div className="reset_password_main-content">
            <img src={passwordImg} className="reset_password_main-image"/>
            <p className="reset_password_heading">Reset your Password</p>
        </div>
        {/* <img src={passwordImg} className="main-image"/> */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <form className="reset_password_form">
                    
                    <label>
                        Password *
                    </label>
                    <input className="reset_password_input" type="password" name="password"
                        onChange={(e) => {
                            validatePassword(e.target.value, confirmPassword)
                            setPassword(e.target.value)
                        }}
                        value={password} />
                    <div>
                    <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumCharacter ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must be 8 or more characters in length.</p>
                        </div>
                        <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumUpperCase ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must contain 1 or more uppercase characters.</p>
                        </div>    
                    <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumSpecialCharacters ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must contain 1 or more special characters.</p>
                        </div>
                    <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.doesContainMinimumNumericDigits ? smallGreenCheck : smallRedCross}/>
                            <p className="reset_password_validation-item-p">Password must contain 1 or more digit characters.</p>
                        </div>
                        <div className="reset_password_validation-item">
                            <img src={passwordValidationChecks.isConfirmPasswordSameAsPassword ? smallGreenCheck : smallRedCross} />
                            <p className="reset_password_validation-item-p">"Password" and "Confirm Password" should match</p>
                        </div>
                    </div>
                    <label>
                        Confirm Password *
                    </label>
                    <input className="reset_password_input" type="password" name="confirmPassword" 
                        onChange={(e) => {
                            validatePassword(password, e.target.value)
                            setConfirmPassword(e.target.value)
                        }} 
                        value={confirmPassword} />
                    <label>
                        Enter OTP *
                    </label>
                    
                    <input type="text" className="reset_password_input" 
                    onChange={(e) => {
                        // validatePassword(e.target.value, otp)
                        setOtp(e.target.value)
                    }}
                    value={otp}
                    />
                       <p style={{color:"red"}}>OTP sent to your mobile number Please Enter</p> 
                    <input className="reset_password_input" type="submit" value="Update Password" disabled={!( password && confirmPassword)} className="submit-button" 
                    onClick={Update} style={{cursor:"pointer"}}
                    />
                </form>
                </div>

        </div>
               

               
    </div>
    )
}
