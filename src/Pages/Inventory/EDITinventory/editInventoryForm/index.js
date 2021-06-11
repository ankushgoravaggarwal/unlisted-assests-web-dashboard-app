import React from "react";
import Select from "react-select";
import "./style.scoped.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import { apiCall, setAccessToken } from "../../../../Utils/Network";
import { Link, useHistory, useLocation } from "react-router-dom";
import not from "./not.svg";
import {
  successToast,
} from "../../../../Components/Toast/index";
import Buttons from "../../../../Components/Buttons";
import BankImage from "../../../../assets/hdfc.png";


const options = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

function EditInventoryForm(editedData,handleChange) {
  let history = useHistory();
  let location = useLocation();
  let selectedHolding = location.state.selectedHolding;

  console.log("selectedHolding in add inventory", selectedHolding);

  const [selectedCompany, setSelectedCompany] = React.useState("");
  // const [selectedCommodity, setSelectedCommodity] = React.useState("");

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
  const [negotiable,setNegotiable] = React.useState(selectedHolding.isNegotiable);
  const [negotiableError,setNegotiableError] = React.useState('')
  const [showNegotiableError,setShowNegotiableError] = React.useState('')

  const [
    showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation,] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    callTrade();
  }, []);
  const callTrade = async function () {
    let response = await apiCall("trade/" + selectedHolding.tradeId, "GET");
    let responseJSON = await response.json();
    await setQtySold(responseJSON.qty);
    await setMinbid(responseJSON.minBidPriceAccepted);
    await setBuyprice(responseJSON.price);
    await setNegotiable(responseJSON.isNegotiable);
  };

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





  const handleCreate = async (event) => {
    event.preventDefault();
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
    console.log("selected company ", selectedCompany);
    let requestBody = {
      "price": buyprice,
      "minBidPriceAccepted": minbid,
      "qty": qtySold,
      "isNegotiable": negotiable,
      "myHoldingId": selectedHolding.id,
    };
    console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "trade/" + selectedHolding.tradeId,
      "PUT",
      requestBody
    );
    // if (response.status === 409) {
    //   return;
    // } else {
    //   let responseJSON = await response.json();
    //   successToast("Success", "Listing successfully edited");
    //   setTimeout(() => {
    //     history.push("/holdings");
    //   }, 3000);
    // }

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
    }
    else if(response.status === 200){
        await clearErrorMessages()
        console.log("aaaaaaaaaaaaaaa")
        let responseJSON = await response.json()
        successToast("Success", "Listing successfully edited")
        setTimeout(()=>{
            history.push("/holdings")
        },3000)

    } else {
        await setshowqtySoldError(true);
        await setqtySoldError('some problem occured, contact the admin...');
    }






    //else {
  //
  //     let responseJSON = await response.json()
  //     //setHolding(responseJSON)
  //
  //     console.log("response ", response)
  //
  //     console.log("responseJson", responseJSON)
  //
  //     setOpen(true);
  //   }
   };

    const clearErrorMessages = async () => {
        await setShowNegotiableError(false);
        await setNegotiableError('');
        await setShowBuyPriceError(false);
        await setBuyPriceError('');
        await setShowQtyHeldError(false);
        await setQtyHeldError('');
        await setShowminBidError(false);
        await setMinbiderror('');
        await setshowqtySoldError(false);
        await setqtySoldError('');


    }


  const validate = async (field, errorMessage) => {
    console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+editedData.isDemated+"yoyo"+selectedHolding.isVested)
      await  clearErrorMessages();

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

              console.log("hooooooooooooooooo111"+errorMessage)
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
    <form className="editinventory-form">
      <div className="addlist-title">
        <h4>Edit Lisiting</h4>
        <hr/>
      </div>

      <div style={{display:"flex"}}>
            <div className="listing-img">
              <img src={BankImage} />
            </div>
            <div>
              <h6 className="m-0"><strong> {selectedHolding.companyName} </strong></h6>
              <p className="m-0">Holding ID : {selectedHolding.id}</p>
            </div>
      </div>


      <div className="editinventory-form_field editinventory-form_field-2">
        <div>
          <label>Quantity*</label>
          <input value={selectedHolding.qtyTotal} disabled />
          {showQtyHeldError ? <InlineValidationBoxExistingQtyheldError/> : null}
        </div>
          

        <div>
          <label>Quantity to be sold*</label>
          <input value={qtySold} onChange={(e) => setQtySold(e.target.value)} />
          {showqtySoldError ? <InlineValidationBoxExistingQtySold/> : null}
        </div>
        
      </div>

      <div className="editinventory-form_field editinventory-form_field-2">
        <div>
          <label style={{fontSize:"14px"}}>Minimum bid accepted*</label>
          <input value={minbid} onChange={(e) => setMinbid(e.target.value)} />
          {showminBidError ? <InlineValidationBoxExistingminbidError/> : null}
        </div>
        
        <div>
          <label style={{fontSize:"14px"}}>Buy it now price*</label>
          <input
            value={buyprice}
            onChange={(e) => setBuyprice(e.target.value)}
          />
          {showBuyPriceError ? <InlineValidationBoxExistingSelectedBuyPriceError/> : null}
        </div>
        
      </div>
      <div className="addholding-form_field">
        <p>Vested*</p>
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
        <p>Demated*</p>
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
        <p>Negotiable*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              style={{width:"15px"}}
              type="radio"
              id="negotiable"
              name="negotiable"
              value="yes"
              checked={negotiable}
              onChange={(e) => {
                setNegotiable("yes");
              }}

            />
          </div>
            <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input
              style={{width:"15px"}}
              type="radio"
              id="negotiable"
              name="negotiable"
              value="no"
              checked={!negotiable}
              onChange={(e) => {
                setNegotiable("no");
              }}

            />
          </div>
          {showNegotiableError ? <InlineValidationBoxExistingSelectedNegotiableError/> : null}
        </div>
      </div>
      
      <div className="editinventory-form_field ">
        <label>Special conditions for transfer*</label>
        <Select isMulti options={options} />
      </div>
      <div className="editinventory-form_field editinventory-form_upload-photo">
        <img src={UploadIcon} />
        <p style={{ color: "#2E384D" }}>
          Upload your proof of holding. You can upload the screenshot (share
          certificate/demat holding) as proof or{" "}
          <span
            style={{ color: "#721B65", cursor: "pointer", fontWeight: "700" }}
          >
            browse
          </span>
        </p>
      </div>
      <div className="editinventory-form_note">
        <img src={not} style={{ margin: "5px" }} />
        <p>
          <b>Note:</b> You cannot add inventory without verifying it. Here is the
          guideline for uploading documents.<br/>
          <b>Click here</b>
        </p>
      </div >
          
          <div className="AddListing_Disclaimer">
            <input className="AddListing_Disclaimer_checkBox" type="checkbox"/><p>By submiting this holding for sale, I undertake that I am eligible to sell the following shares.<br/>Read the <u style={{color:"#721B65"}}><b>disclaimer agreement</b></u></p>
          </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ color: "#2E384D", marginRight: "10px" }}>
            Total value of Listing:
          </h3>

          <p
            style={{
              color: "#721B65",
              paddingRight: "20px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            {" "}
            ₹ {qtySold * buyprice}
          </p>
        </div>
        <div className="editinventory-form_button_container">
          <button className="discard_button" onClick={handleCreate1} >Discard </button>
          <Buttons.PrimaryButton
            onClick={handleCreate}
            value="Edit Listing"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </form>
  );
}

export default EditInventoryForm;
