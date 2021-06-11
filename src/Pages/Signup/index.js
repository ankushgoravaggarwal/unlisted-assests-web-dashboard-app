import React, { useState } from "react";
import loginPageMainImage from "./loginPageMain.png"
import logo from "../logo.png"
import smallGreenCheck from "./green_check_small_filled.png"
import smallRedCross from "./red_cross_circle_filled.png"
import googleLogo from "./google_logo.png"
import { Link, useHistory } from "react-router-dom";
import "./signup.css"
import 'react-toastify/dist/ReactToastify.css';
import { errorToast } from "../../Components/Toast/index"
import AlertDialog from "../../Components/DialogBox/dialogbox";


let SignUp = () => {

    const [email, setEmail] = useState("")
    const [emailError,setEmailError] = useState("")
    const [showEmailError,setShowEmailError] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phonenumberError,setPhoneNumberError] = useState('')
    const [showPhoneNumberError,setShowPhoneNumberError] = useState('')
    const [userAlreadyExistsError,setUserAlreadyExistsError] = useState('')
    const [showUserAlreadyExistsError,setShowUserAlreadyExistsError] = useState('')
    const [dialogPage, setDialogPage ] = useState(false);

    let InlineValidationEmail = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {emailError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxPhoneNumber = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {phonenumberError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxUserAlreadyExists = () => {
    return (
        <div className="inline-validation-box">
            <p>
                {userAlreadyExistsError}
            </p>
        </div>)
}

    const clearValidationMessages = async () => {
        await setShowEmailError(false);
        await setEmailError('');

        await setShowPhoneNumberError(false);
        await setPhoneNumberError('');

        await setShowUserAlreadyExistsError(false);
        await setUserAlreadyExistsError('');
    }

    const validate = async (field, errorMessage) => {
        console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
        await clearValidationMessages();
        switch (field) {
            case 'email':
                console.log("hooooooooooooooooo1"+errorMessage)
                await setShowEmailError(true);
                await setEmailError(errorMessage);
                break;

            case 'mobile':
                console.log("hooooooooooooooooo1"+errorMessage)
                await setShowPhoneNumberError(true);
                await setPhoneNumberError(errorMessage);
                break;


            default:
                console.log("hooooooooooooooooonijhibibibibib")

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let requestBody = {
            "email": email,
            "mobile": phoneNumber
        }
        console.log("request body", requestBody)

        let stringifiedRequestBody = JSON.stringify(requestBody)

        console.log("request body stringified", stringifiedRequestBody)

        let response = await fetch("http://localhost:8081/profile/signup",
            {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
        )

        console.log("response ", response)

        if (response.status === 409) {

            return
        } else if (response.status === 400) {
            let responseJSON = await response.json()
            let i = 0;
            const arrayerrormessages = responseJSON.details1;
            console.log(arrayerrormessages)
            const listItems = arrayerrormessages.map((errorResponse) =>

                validate(errorResponse.field,errorResponse.errorMessage)
            );
        } else if(response.status === 500) {
                setShowUserAlreadyExistsError(true);
                setUserAlreadyExistsError("User already exists with the provided email or mobile...");
        }
        else if (response.status === 200) {

            // let responseJSON = await response.json()
            // setHolding(responseJSON)
            //
            // console.log("response ", response)
            //
            // console.log("responseJson", responseJSON)
            //
            // setOpen(true);
            //
            setDialogPage(true);
        }

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



                { showUserAlreadyExistsError ? <InlineValidationBoxUserAlreadyExists/> : null}
                <form onSubmit={handleSubmit}>
                    <label>
                        Email *
                    </label>
                    <div className="signup_phonenumber">
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    { showEmailError ? <InlineValidationEmail/> : null}
                    <label>
                        Mobile Number *
                    </label>
                    <div className="signup_phonenumber">
                    <p style={{marginRight:"5px"}}>+91</p>
                    <input type="text" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} size="38" style={{border:"none"}}/>
                    </div>
                    { showPhoneNumberError ? <InlineValidationBoxPhoneNumber/> : null}


                    <AlertDialog dialogPage={dialogPage} onClose={closeDialog}/>

                    <h3>
                    </h3>
                    <input type="submit" value="Sign Up"

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