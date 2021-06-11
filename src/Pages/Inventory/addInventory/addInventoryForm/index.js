import React from "react";
import Select from "react-select";
import "./style.scoped.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import BankImage from "../../../../assets/hdfc.png";
import { apiCall, setAccessToken } from "../../../../Utils/Network"
import { Link, useHistory, useLocation } from "react-router-dom";
import not from "./not.svg"
import { successToast } from "../../../../Components/Toast/index";
import Buttons from "../../../../Components/Buttons";

import '../../../Companies/bootstrap4/css/bootstrap.scoped.css';

const options = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];




function AddInventoryForm() {

  let history=useHistory();
  let location = useLocation();
  let selectedHolding = location.state.selectedHolding

  console.log("selectedHolding in add inventory", selectedHolding)



  const [shareType, setShareType] = React.useState('')





  const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
  const [open, setOpen] = React.useState(false);

    const [selectedCompany, setSelectedCompany] = React.useState("");
    const [selectedCommodity, setSelectedCommodity] = React.useState("");

    const [qtySold, setQtySold] = React.useState('')
    const [qtySoldError, setqtySoldError] = React.useState('')
    const [qtyHeld, setQtyHeld] = React.useState('')
    const [qtyHeldError, setQtyHeldError] = React.useState('')
    const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)

    const [showqtySoldError, setshowqtySoldError] = React.useState('')
    const [minbid, setMinbid] = React.useState('')
    const [minbiderror,setMinbiderror] = React.useState('')
    const [showminBidError,setShowminBidError] = React.useState('')
    const [buyprice, setBuyprice]= React.useState('')
    const [buypriceerror,setBuyPriceError] = React.useState('')
    const [showBuyPriceError,setShowBuyPriceError] = React.useState('')
    const [negotiable,setNegotiable] = React.useState("");
    const [negotiableError,setNegotiableError] = React.useState('')
    const [showNegotiableError,setShowNegotiableError] = React.useState('')
    const [demated, setDemated] = React.useState(
        selectedHolding.isDemated ? "yes" : "no"
    );
    const [dematedError, setDematedError] = React.useState('')
    const [showDematedError, setShowDematedError] = React.useState('')
    const [vested, setVested] = React.useState('')
    const [vestedError, setVestedError] = React.useState('')
    const [showVestedError, setshowVestedError] = React.useState('')

    const [allCompany, setAllCompany] = React.useState([]);
    const [allCommodity, setAllCommodity] = React.useState([]);

    let InlineValidationBoxExistingQtySold = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {qtySoldError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingminbidError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {minbiderror}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingQtyheldError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {qtyHeldError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedBuyPriceError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {buypriceerror}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedNegotiableError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {negotiableError}
                </p>

            </div>
        )
    }

    let InlineValidationBoxExistingVestedError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {vestedError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingDematedError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {dematedError}
                </p>
            </div>
        )
    }

  const handleCreate = async (event) => {
    event.preventDefault()
    // let dematBoolean, vestedBoolean
    // if (demated === "yes") {
    //   dematBoolean = true
    // } else {
    //   dematBoolean = false
    // }
    // if (vested === "yes") {
    //   vestedBoolean = true
    // } else {
    //   vestedBoolean = false
    // }
    console.log("selected company ", selectedCompany)
    let requestBody = {
      "price": buyprice,
      "minBidPriceAccepted": minbid,
        "isNegotiable": negotiable,
      "qty": qtySold,
      "myHoldingId": selectedHolding.id,
    
    }
    console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody)

    console.log("request body stringified", stringifiedRequestBody)

  
    let response = await apiCall("trade/"+requestBody.myHoldingId, 'POST', requestBody)
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
      } else if(response.status === 200){
        await clearValidationMessages();
        let responseJSON = await response.json()
        successToast("Success", "Listing successfully created")
        setTimeout(()=>{
            history.push("/holdings")
        },3000)

    } else {
        await setShowQtyHeldError(false);
        await setQtyHeldError("some problem occured, contact the admin...");
    }




  }

  const clearValidationMessages = async () => {
      await setShowNegotiableError(false);
      await setNegotiableError('');
      await setShowBuyPriceError(false)
      await setBuyPriceError('');
      await setShowQtyHeldError(false);
      await setQtyHeldError('');
      await setShowminBidError(false);
      await setMinbiderror('');
      await setshowqtySoldError(false);
      await setqtySoldError('');
      await setShowDematedError(false);
      await setDemated('');
      await setshowVestedError(false)
      await setVestedError('');
 }

    const validate = async (field, errorMessage) => {
        console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
        await clearValidationMessages();

        switch (field) {
            case 'isNegotiable':
                console.log("hooooooooooooooooo1"+errorMessage)
                await setShowNegotiableError(true);
                await setNegotiableError(errorMessage);
                break;

            case 'price':

                console.log("hooooooooooooooooo11"+errorMessage)
                await setShowBuyPriceError(true);
                await setBuyPriceError(errorMessage);
                break;

            case 'qtyTotal':

                console.log("hooooooooooooooooo11"+errorMessage)
                await setShowQtyHeldError(true);
                await setQtyHeldError(errorMessage);
                break;

            case 'minBidPriceAccepted':
                console.log("hooooooooooooooooo1111"+errorMessage)
                await setShowminBidError(true);
                await setMinbiderror(errorMessage);
                break;


            case 'qty':
                console.log("hooooooooooooooooo11111"+errorMessage)
                await setshowqtySoldError(true);
                await setqtySoldError(errorMessage);
                break;

            case 'isDemated':
                console.log("hooooooooooooooooo1111"+errorMessage)
                await setShowDematedError(true);
                await setDematedError(errorMessage);
                break;


            case 'isVested':
                console.log("hooooooooooooooooo11111"+errorMessage)
                await setshowVestedError(true);
                await setVestedError(errorMessage);
                break;

            default:
                console.log("hooooooooooooooooonijhibibibibib")

        }
    }
    const handleCreate1 = async (event) => {
        event.preventDefault();

        setTimeout(() => {
            history.push("/holdings");
        }, 0);

    };

  return (
    <form className="addinventory-form">
      <div className="addlist-title">
        <h4>Add Lisiting</h4>
        <hr />
      </div>
      
      <div className="holder-info mt-3 d-flex">
            <div className="listing-img">
              <img src={BankImage} />
            </div>
            <div>
              <h6 className="m-0"><strong> {selectedHolding.companyName} </strong></h6>
              <p className="m-0">Holding ID : {selectedHolding.id}</p>
            </div>
      </div>


      <div className="addInventory-form_field addinventory-form_field-2">
       
        <div>
          <label style={{fontSize:"14px"}}>Quantity*</label>
          <input value={selectedHolding.qtyTotal} disabled/>
        </div>
        <div>
          <label style={{fontSize:"14px"}}>Quantity to be sold*</label>
          <input value={qtySold} onChange={(e) => setQtySold(e.target.value)}/>
        </div>
      </div>
        {showqtySoldError ? <InlineValidationBoxExistingQtySold/> : null}

      <div className="addInventory-form_field addinventory-form_field-2">
       <div>
         <label style={{fontSize:"14px"}}>Minimum bid accepted*</label>
         <input value={minbid} onChange={(e) => setMinbid(e.target.value)}/>
         {showminBidError ? <InlineValidationBoxExistingminbidError/> : null}
       </div>
                 

       <div >
         <label style={{fontSize:"14px"}}>Buy it now price*</label>
         <input value={buyprice} onChange={(e) => setBuyprice(e.target.value)}/>
         {showBuyPriceError ? <InlineValidationBoxExistingSelectedBuyPriceError/> : null}
       </div>
     </div>
             

<div className="addholding-form_field">
        <p style={{marginTop:"10px",fontSize:"14px"}}>Vested*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              style={{width:"15px"}}
              type="radio"
              id="vested"
              name="vested"
              value="yes"
              checked={selectedHolding.isVested}
              disabled

            />
          </div>
          <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input
              style={{width:"15px"}}
              type="radio"
              id="vested"
              name="vested"
              value="no"
              checked={!selectedHolding.isVested}
              disabled
            />
          </div>

        </div>
      </div>
      <div className="addholding-form_field">
        <p style={{marginTop:"10px",fontSize:"14px"}}>Demated*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              style={{width:"15px"}}
              type="radio"
              id="demated"
              name="demated"
              value="yes"
              checked={selectedHolding.isDemated}
              disabled
            />
          </div>

          <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input
              style={{width:"15px"}}
              type="radio"
              id="demated"
              name="demated"
              value="no"
              checked={!selectedHolding.isDemated}
              disabled

            />
          </div>

        </div>

      </div>

        <div className="addholding-form_field">
            <p style={{marginTop:"10px",fontSize:"14px"}}>Negotiable*</p>
            <div className="addholding-form_radio-btn-group">
                <div className="addholding-form_radio-btn">
                    <label htmlFor="yes">Yes</label>
                    <input
                        style={{width: "15px"}}
                        type="radio"
                        id="negotiable"
                        name="negotiable"
                        value="yes"


                        onChange={(e) => {
                            setNegotiable("yes");
                        }}

                    />
                </div>
                <div className="addholding-form_radio-btn">
                    <label htmlFor="no">No</label>
                    <input
                        style={{width: "15px"}}
                        type="radio"
                        id="negotiable"
                        name="negotiable"
                        value="no"

                        onChange={(e) => {
                            setNegotiable("no");
                        }}

                    />
                </div>
                
            </div>
            {showNegotiableError ? <InlineValidationBoxExistingSelectedNegotiableError/> : null}
        </div>

          
      <div className="addinventory-form_field addinventory-form_upload-photo">
        <img src={UploadIcon} />
        <p style={{color: "#2E384D", fontSize:"13px"}}>
          Upload your proof of holding. You can upload the screenshot (share certificate/demat holding) 
          as proof or <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>
        </p>
      </div>
      <div className="addinventory-form_note">
        <div className="d-flex align-items-center justify-content-center">
        <img src={not} className="mr-3"/>
        <p className="m-0">
          <strong> Note </strong>: You cannot add inventory without verifying it. Here is the guideline for uploading documents.
           <span> <a href="#" className="text-white">Click here</a></span>
        </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="addinventory-form_button_container">
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h5 style={{color:"#2E384D"}}>Total value of Listing:</h5>
          <p className="m-0" style={{color:"#721B65",paddingRight:"20px",fontSize: "24px",fontWeight: "600"}}> ₹ {qtySold*buyprice}</p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Buttons.SecondaryButton value="Discard" style={{cursor:"pointer", margin: "10px", width: "100%"}}/>
          <Buttons.PrimaryButton onClick={handleCreate} value="Create Listing"style={{cursor:"pointer", margin: "10px", width: "100%"}}/>
        </div>
        </div>
      </div>
    </form>
  );
}

export default AddInventoryForm;
