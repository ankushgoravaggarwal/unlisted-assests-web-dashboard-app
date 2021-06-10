import React, { useState } from "react";
import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import googleLogo from "./google_logo.png"
import { Link } from "react-router-dom";
import "./signup.css"
import 'react-toastify/dist/ReactToastify.css';
import { errorToast } from "../../Components/Toast/index"
import AlertDialog from "../../Components/DialogBox/dialogbox";


let SignUp = () => {

    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [dialogPage, setDialogPage ] = useState(false);

    const [passwordValidationChecks, setPasswordValidationChecks] = useState({
        isConfirmPasswordSameAsPassword: false,
        doesContainMinimumCharacter: false,
        doesContainMinimumUpperCase: false,
        doesContainMinimumNumericDigits: false,
        doesContainMinimumSpecialCharacters: false
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        let requestBody = {
            "username": username,
            "name": name,
            "password": password,
            "email": email,
            "mobile": phoneNumber
        }
        console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        console.log("request body stringified", stringifiedRequestBody)

        let response = await fetch("http://localhost:8081/profile/signup",
            {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
            )

        let responseJSON = await response.json()
        
        console.log("response ", response)

        console.log("responseJson", responseJSON)

        setDialogPage(true);
    }

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
    const closeDialog=()=>{
        setDialogPage(false)
    };

    return (
        <div className="SignUpPageContainer">
            <div className="SignUp_page_left-half">
                <div className="SignUp_page_main-image-container">
                    <img src={loginPageMainImage} className="SignUp_page_main-image" />
                </div>
                <p className="SignUp_page_heading">Your data 100% safe with us</p>
            </div>
            <div className="SignUp_page_right-half">
                <div className="SignUp_page_contents">
                    <div className="SignUp_page_logo-container">
                        <img src={logo} className="SignUp_page_logo" />
                    </div>
                    <h3>
                        Create New Account
                    </h3>




                    <form onSubmit={handleSubmit}>
                        <label>
                            Email *
                        </label>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />

                        <label>
                            Mobile Number *
                        </label>
                        <input type="text" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />



                            <AlertDialog dialogPage={dialogPage} onClose={closeDialog}/>

                        <h3>
                        </h3>
                        <input type="submit" value="Sign Up" 
                        disabled={!(email && phoneNumber)}
                        className="submit-button" />
                    </form>


                    <div className="SignUp_page_horizontal-line" />


                    <div className="SignUp_page_sign-up">
                        <p>Already have an account? <Link to="/Login">Login</Link></p>
                    </div>



                 

                </div>
            </div>
        </div>)
}

export default SignUp