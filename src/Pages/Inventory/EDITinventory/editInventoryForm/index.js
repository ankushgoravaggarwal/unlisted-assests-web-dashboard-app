import React from "react";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import { apiCall, setAccessToken } from "../../../../Utils/Network";
import { Link, useHistory, useLocation } from "react-router-dom";
import not from "./not.svg";
import {
  successToast,
} from "../../../../Components/Toast/index";
import Buttons from "../../../../Components/Buttons";

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
  const [selectedCommodity, setSelectedCommodity] = React.useState("");

  const [shareType, setShareType] = React.useState("");
  const [qtyHeld, setQtyHeld] = React.useState("");
  const [qtySold, setQtySold] = React.useState("");
  const [minbid, setMinbid] = React.useState("");
  const [buyprice, setBuyprice] = React.useState("");
  const [demated, setDemated] = React.useState("");
  const [vested, setVested] = React.useState("");
  const [negotiable,setNegotiable] = React.useState("");

  const [allCompany, setAllCompany] = React.useState([]);
  const [allCommodity, setAllCommodity] = React.useState([]);

  const [
    showExistingHoldingInlineValidation,
    setShowExistingHoldingInlineValidation,
  ] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    callTrade();
  }, []);
  const callTrade = async function () {
    let response = await apiCall("trade/" + selectedHolding.tradeId, "GET");
    let responseJSON = await response.json();
    setQtySold(responseJSON.qty);
    setMinbid(responseJSON.minBidPriceAccepted);
    setBuyprice(responseJSON.price);
    setDemated(responseJSON.isDemated);
    setVested(responseJSON.isVested);
    setNegotiable(responseJSON.isNegotiable);
  };
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
      price: buyprice,
      minBidPriceAccepted: minbid,
      qty: qtySold,
      myHoldingId: selectedHolding.id,
    };
    console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "trade/" + selectedHolding.tradeId,
      "PUT",
      requestBody
    );
    if (response.status === 409) {
      return;
    } else {
      let responseJSON = await response.json();
      successToast("Success", "Listing successfully edited");
      setTimeout(() => {
        history.push("/holdings");
      }, 3000);
    }
  };

  return (
    <form className="editinventory-form">
      <div>
        <h1 style={{ color: "#2E384D" }}>Edit Lisiting</h1>
      </div>

      <div>
        <h3 style={{ color: "#2E384D" }}>{selectedHolding.companyName}</h3>
        <p>Holding ID : {selectedHolding.id}</p>
      </div>

      <div className="editinventory-form_field editinventory-form_field-2">
        <div>
          <label>Quantity*</label>
          <input value={selectedHolding.qtyTotal} disabled />
        </div>
        <div>
          <label>Quantity to be sold*</label>
          <input value={qtySold} onChange={(e) => setQtySold(e.target.value)} />
        </div>
      </div>

      <div className="editinventory-form_field editinventory-form_field-2">
        <div>
          <label>Minimum bid accepted*</label>
          <input value={minbid} onChange={(e) => setMinbid(e.target.value)} />
        </div>
        <div>
          <label>Buy it now price*</label>
          <input
            value={buyprice}
            onChange={(e) => setBuyprice(e.target.value)}
          />
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
              checked={editedData.isVested}
              onChange={(e) => {
                setVested("yes");
              }}
              
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
              checked={!editedData.isVested}
              onChange={(e) => setVested("no")}
              
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
              checked={editedData.isDemated}
              onChange={(e) => {
                setDemated("yes");
              }}
              
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
              checked={!editedData.isDemated}
              onChange={(e) => {
                setDemated("no");
              }}
              
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
              checked={editedData.isNegotiable}
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
              checked={!editedData.isNegotiable}
              onChange={(e) => {
                setNegotiable("no");
              }}
              
            />
          </div>
        </div>
      </div>
      <div className="addholding-form_field "></div>
      <div className="addholding-form_field ">
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
          Note: You cannot add inventory without verifying it. Here is the
          guideline for uploading documents.
          <span>Click here</span>
        </p>
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
          <button className="discard_button">Discard </button>
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
