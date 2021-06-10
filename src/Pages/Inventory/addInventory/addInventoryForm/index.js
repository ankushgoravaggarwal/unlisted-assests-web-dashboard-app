import React from "react";
import Select from "react-select";
import "./style.css";
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

  const [selectedCompany, setSelectedCompany] = React.useState('')
  const [selectedCommodity, setSelectedCommodity] = React.useState('')

  const [shareType, setShareType] = React.useState('')
  const [qtyHeld, setQtyHeld] = React.useState('')
  const [qtySold, setQtySold] = React.useState('')
  const [minbid, setMinbid] = React.useState('')
  const [buyprice, setBuyprice]= React.useState('')


  const [allCompany, setAllCompany] = React.useState([])
  const [allCommodity, setAllCommodity] = React.useState([])

  const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
  const [open, setOpen] = React.useState(false);


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
      "qty": qtySold,
      "myHoldingId": selectedHolding.id,
    
    }
    console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody)

    console.log("request body stringified", stringifiedRequestBody)

  
    let response = await apiCall("trade/", 'POST', requestBody)
    if (response.status === 409) {
      return
    }
    else {
      let responseJSON = await response.json()
      successToast("Success", "Listing successfully created")
      setTimeout(()=>{
        history.push("/holdings")
      },3000)


    }


  }

  
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
          <label>Quantity*</label>
          <input value={selectedHolding.qtyTotal} disabled/>
        </div>
        <div>
          <label>Quantity to be sold*</label>
          <input value={qtySold} onChange={(e) => setQtySold(e.target.value)}/>
        </div>
      </div>

      <div className="addInventory-form_field addinventory-form_field-2">
       <div>
         <label>Minimum bid accepted*</label>
         <input value={minbid} onChange={(e) => setMinbid(e.target.value)}/>
       </div>
       <div>
         <label>Buy it now price*</label>
         <input value={buyprice} onChange={(e) => setBuyprice(e.target.value)}/>
       </div>
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
