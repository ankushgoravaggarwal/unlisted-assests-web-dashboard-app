import React from "react";
import AddHoldingForm from "./addHoldingForm/index";
import "./style.css";
import VideoPreviewAddholding from "../../../assets/video_preview_addholding.png";

function AddHoldings() {
  return (
    <div style={{display:"flex",flexDirection:"column",
    justifyContent:"center",alignItems:"center",marginTop:"10px"}}>
      <div className="addholding_container-inner">
        <div className="addholding_right">
          <div className="addholding_form-container">
            <AddHoldingForm />
          </div>
        </div>
        <div className="addholding_left">
          <div className="addholding_left-inner">
            <img src={VideoPreviewAddholding} />
            <div>
              <p>Holding</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHoldings;
