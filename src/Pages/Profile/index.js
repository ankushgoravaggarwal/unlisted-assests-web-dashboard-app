import React, { useEffect, useState, useRef } from "react";
import PhoneEmail from "./PhoneEmail.svg";
import { apiCall } from "../../Utils/Network";
import ChoosePhoto from "./choosePhoto";
import Buttons from "../../Components/Buttons";
import {
  successToast,errorToast
} from "../../../src/Components/Toast/index";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MobileVerification from "../../Pages/MobileVerification/index";
import mobileVerificationMainImage from "../../Pages/MobileVerification/mobile_verification.png"
import { Link } from "react-router-dom";
import smallGreenCheck from "../Signup/green_check_small_filled.png"
import smallRedCross from "../Signup/red_cross_circle_filled.png"
import '../Companies/bootstrap4/css/bootstrap.scoped.css';


function Profile(props) {
  
  

  const [details, setDetails] = useState({});
  const [profileaddress,setProfileaddress]= useState({});
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET");
    const responseAddress = await apiCall("useronboarding/address", "GET")
    
    let responseJSON = await response.json();
    let responseAddressJSON = await responseAddress.json();
    console.log(responseAddressJSON)
    setDetails(responseJSON);
    setProfileaddress(responseAddressJSON)
  }

  const reqBody = {
    id: 16,
    productId: 1,
    name: null,
    username: null,
    userType: null,
    accountId: "1manoj",
    profilePic: "string",
    uaVerifiedStatus: null,
    bussinessName: null,
    mobileNumber: "a",
    residentStatus: "Non Resident Indian",
    email: null,
    dob: "2021-04-09",
    spouseFatherName: "aaaa",
    notificationsChoice: "aaaaaaa",
    panNumber: "gggggggg",
    aadharNumber: "",
    isAadharLinkedPhone: true,
    emailVerified: false,
    mobileVerified: false,
    residentStatusVerified: false,
    panNumberVerified: false,
    aadharNumberVerified: false,
    addressVerified: false,
    bankVerified: false,
    businessNameVerified: false,
    userAccountActive: false,
  };

  async function updateProfile() {
    
    const response = await apiCall(
      "useronboarding/accountonboarding",
      "PUT",
      details
    );

    const responseJSON = await response.json();
    const responseAddress = await apiCall("useronboarding/address/"+responseJSON.addressId,"PUT",profileaddress);
  }
  const [emailtext,setEmailtext]=React.useState('')
  const [mobiletext,setMobiletext]=React.useState('')
  const [type,setType] = React.useState(null);
  const emailVerify = async function(){
          setType("email");
  let response = await apiCall("profile/sendotponemailloggedin","POST")
    console.log("apicalled",response)
            if (response.status !== 200) {
                errorToast("Invalid", "Email ID Does not exists");
                
                return;
            }else if (response.status === 200){
              setEmailtext('Verification link has been sent to your email address, please verify')
                successToast("Success","Email sent to your mail ID please check")
                setOpen(true)
            }
            
  }
  const mobileVerify = async function(){
    
    setType("mobile");

    let response = await apiCall("profile/sendotponmobileloggedin","POST")
      console.log("apicalled",response)
              if (response.status !== 200) {
                  errorToast("Invalid", "Mobile Number Does not exists");
                  return;
              }else if (response.status === 200){
                setMobiletext('Verify your mobile number with otp verification')  
                successToast("Success","OTP sent to your mobile please check")
                setOpen(true)
              }
              
    }
  function onUserInput(field, val) {
    details[field] = val;
    setDetails({ ...details });
    
  }
  function addressInput(field, val){
    profileaddress[field] = val;
    setProfileaddress({ ...profileaddress })
  }
  function submit() {
    updateProfile();
    successToast("Success", "Profile successfully edited");
  }

  async function onFileSelect(file) {
    const img = await convertImgTOBase64(file);
    details["profilePic"] = img;
    setDetails({ ...details });
  }

  function convertImgTOBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      }
    });
  }

  return (
    <div className="profile_container w-100 row mb-5">
      <div className="col-md-6">
        <h5 className="profile-title mt-1">Let's Add Personal Details</h5>
        <div className="profile-form_container">
          <div className="profile-form_field-photo">
            <img src={details.profilePic} />
            <div>
              <p className="m-0 user-name">{details.name}</p>
              <button onClick={() => setOpenPhotoModal(true)}>
                Change profile photo
              </button>
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label>Name*</label>
              <input
                value={details.name}
                onChange={(e) => onUserInput("name", e.target.value)}
              />
            </div>
            <div className="profile-form_field">
              <label>User ID*</label>
              <input
                disabled
                value={details.accountId}
                onChange={(e) => onUserInput("accountId", e.target.value)}
              />
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label>Email*</label>
              <div className="custom-verify-input">
              <input style={{border:"none"}}
                value={details.email}
                onChange={(e) => onUserInput("email", e.target.value)}
                
              />
              <span >{details.emailVerified === false?<p style={{margin:"10px", fontSize:"12px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallRedCross}/>}Not Verified</p>:<p style={{margin:"10px", fontSize:"12px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallGreenCheck}/>}Verified</p>} </span>
              </div>
            </div>
          </div>
          {details.emailVerified === false?
          <div className="profile-form_field-container_Redalert">
            <div className="profile-form_field verify-msg">
              <p className="RedAlert_Text">{emailtext}</p>
              <p>Verification link has been send to your email address, please verify.</p>
              <h6 className="RedAlert_Link mt-2" onClick={emailVerify}>Verify Again</h6>
            </div>
          </div> 
          : null}
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label>Mobile Number*</label>
              <div className="custom-verify-input">
              <input style={{border:"none"}}
                value={details.mobileNumber}
                onChange={(e) => onUserInput("mobileNumber", e.target.value)}
              />
              <span>{details.mobileVerified === false?<p style={{margin:"10px", fontSize:"13px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallRedCross}/>}Not Verified</p>:<p style={{margin:"10px", fontSize:"13px"}}>{<img style={{height:"13px",width:"13px",marginRight:"10px"}}src={smallGreenCheck}/>}Verified</p>} </span>
              </div>
            </div>
          </div>
          {details.mobileVerified === false?
          <div className="profile-form_field-container_Redalert">
            <div className="profile-form_field verify-msg">
              <p className="RedAlert_Text">{mobiletext}</p>
              <p>Verification link has been send to your email address, please verify.</p>
              <h6 className="RedAlert_Link mt-2" onClick={mobileVerify}>Verify Again</h6>
            </div>
          </div>
          :null }
          {/*<div>*/}
          {/*  <div>*/}
          {/*    <p>Get your Notification Via</p>*/}
          {/*    <div className="profile-form_field-container">*/}
          {/*      <div className="profile-form_field-radio">*/}
          {/*        <label>Email</label>*/}
          {/*        <input*/}
          {/*          type="radio"*/}
          {/*          checked={details.notificationsChoice === "email"}*/}
          {/*          onChange={() => onUserInput("notificationsChoice", "email")}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="profile-form_field-radio">*/}
          {/*        <label>SMS</label>*/}
          {/*        <input*/}
          {/*          type="radio"*/}
          {/*          checked={details.notificationsChoice === "sms"}*/}
          {/*          onChange={() => onUserInput("notificationsChoice", "sms")}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="profile-form_field-container">*/}
          {/*  <div className="profile-form_field">*/}
          {/*    <label>Date of Birth*</label>*/}
          {/*    <input value={details.dob} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="profile-form_field-container">*/}
          {/*  <div className="profile-form_field">*/}
          {/*    <label>Spouse/Father's Name (as per PAN)*</label>*/}
          {/*    <input*/}
          {/*      value={details.spouseFatherName}*/}
          {/*      onChange={(e) =>*/}
          {/*        onUserInput("spouseFatherName", e.target.value)*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <h5 className="profile-title mt-4">Add Your Address Details</h5>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label>Address*</label>
              <textarea value={profileaddress.address}
                onChange={(e) => addressInput("address", e.target.value)}
                ></textarea>
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label>Country*</label>
              <input value={profileaddress.country} 
              onChange={(e) => addressInput("country", e.target.value)}
              />
            </div>
            <div className="profile-form_field">
              <label>City*</label>
              <input value={profileaddress.city} 
              onChange={(e) => addressInput("city", e.target.value)}
              />
            </div>
          </div>
          <div className="profile-form_field-container">
            <div className="profile-form_field">
              <label>State*</label>
              <input value={profileaddress.state}
              onChange={(e) => addressInput("state", e.target.value)}
              />
            </div>
            <div className="profile-form_field">
              <label>Pin code*</label>
              <input value={profileaddress.pincode} 
              onChange={(e) => addressInput("pincode", e.target.value)}
              />
            </div>
          </div>
          <hr />

          <div className="profile-form_field-btn-container">
            <Buttons.SecondaryButton value="Cancel"  style={{margin:"5px"}}/>
            <Buttons.PrimaryButton value="Submit" onClick={submit} style={{margin:"5px"}}/>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="profile_container-right-content">
          <div className="profile-right-banner">
            <img src={PhoneEmail} />
            <p className="mt-3"><strong>Why Phone number and E-mail id?</strong></p>
            <p>
              We feel this is one of the fastest ways to communicate with you
              and update you with all the information about your transaction and
              shortlisted companies.
            </p>
          </div>
        </div>
      </div>
      <ChoosePhoto
        open={openPhotoModal}
        close={() => setOpenPhotoModal(false)}
        onFileSelect={onFileSelect}
      />
      <Dialog
        style={{height:"100vh"}}   
        open={open}
        onClose={() => { setOpen(false) }}
        >
                <MobileVerification type={type} />
      </Dialog>
    </div>
  );
}

export default Profile;
