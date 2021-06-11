import React from "react";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../../assets/upload_icon.svg";
import Buttons from "../../../Components/Buttons";

const additionalConditions = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

function EditHoldingsForm({ allCommodity, editedData, handleChange, submit }) {

  
  return (
    <form className="editholding-form">
      <div className="editholding-form_field addholding-form_field-2">
        <div>
          <label>Share Type*</label>
          <Select
            options={allCommodity}
            defaultValue={{
              value: editedData.commodityId, label: editedData.commodityName
            }}
            onChange={(e) => {
              handleChange("commodityId", e.value);
            }}
          />
        </div>
        <div>
          <label>Quantity*</label>
          <input
            className="editholding-form_qty"
            value={editedData.qtyTotal}
            onChange={(e) => handleChange("qtyTotal", e.target.value)}
          />
        </div>
       </div>
      <div className="editholding-form_field">
        <p>Vested*</p>
        <form className="editholding-form_radio-btn-group">
          <div className="editholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              type="radio"
              id="yes"
              name="drone"
              value="yes"
              checked={editedData.isVested}
              onChange={() => handleChange("isVested", true)}
            />
          </div>
          <div className="editholding-form_radio-btn">
            <label for="no">No</label>
            <input
              type="radio"
              id="no"
              name="drone"
              value="no"
              checked={!editedData.isVested}
              onChange={() => handleChange("isVested", false)}
            />
          </div>
        </form>
      </div>
      <div className="editholding-form_field">
        <p>Demated*</p>
        <form className="editholding-form_radio-btn-group">
          <div className="editholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input
              type="radio"
              id="yes"
              name="drone"
              value="yes"
              checked={editedData.isDemated}
              onChange={() => handleChange("isDemated", true)}
            />
          </div>
          <div className="editholding-form_radio-btn">
            <label for="no">No</label>
            <input
              type="radio"
              id="no"
              name="drone"
              value="no"
              checked={!editedData.isDemated}
              onChange={() => handleChange("isDemated", false)}
            />
          </div>
        </form>
      </div>
      <div className="editholding-form_field "></div>
      <div className="editholding-form_field ">
        <label>Special conditions for transfer*</label>
        <Select
          isMulti
          options={editedData.specialConditionTransfer}

          onChange={(e) => handleChange("specialConditionTransfer", e.value)}
        />
      </div>
      <div className="editholding-form_field addholding-form_upload-photo">
        <img src={UploadIcon} />
        <p>
          Upload your proof of holding. You can upload the screenshot (share
          certificate/demat holding) as proof or browse
        </p>
      </div>
      <div className="editholding-form_button_container">
        <Buttons.PrimaryButton onClick={submit} value="Edit Holding"/>
      </div>
    </form>
  );
}

export default EditHoldingsForm;
