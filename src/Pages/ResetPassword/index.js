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




let ResetPassword = () => {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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
    const Reset = async function (){
        let response = await apiCall()
    }


    return (
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
                        <input className="reset_password_input" type="submit" value="Update Password" disabled={!( password && confirmPassword)} className="submit-button" 
                        onClick={Reset} style={{cursor:"pointer"}}
                        />
                    </form>
                    </div>

            </div>
                   

                   
        </div>)
}

export default ResetPassword
