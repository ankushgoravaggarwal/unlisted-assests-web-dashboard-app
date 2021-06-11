import React from "react";
import AddHoldingForm from "./editInventoryForm";
import "./style.scoped.css";
import VideoPreviewAddholding from "../../../assets/video_preview_addholding.png";
import EditInventoryForm from "./editInventoryForm";

function EditInventory() {
  return (
    <div className="editinventory_container">
      <div className="editinventory_container-inner">
        <div className="editinventory_right">
          <div className="editinventory_form-container">
            <EditInventoryForm />
          </div>
        </div>
        <div className="editinventory_left">
          <div className="editinventory_left-inner">
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

export default EditInventory;
