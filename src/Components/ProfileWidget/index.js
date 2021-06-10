import React from "react";
import "./profilewidget.css";
import wallet from "./wallet.svg";
import changepwd from "./changepwd.svg";
import riskprofile from "./riskprofile.svg";
import addcompany from "./addcompany.svg"
import tradereadysteps from "./tradereadystep.svg";
import user from "./user.svg";

const options = [
  {
    img: user,
    label: "Personal Details",
  },
  {
    img: tradereadysteps,
    label: "Trade Ready Step",
  },
  {
    img: riskprofile,
    label: "Risk Profile",
  },
  {
    img: wallet,
    label: "Virtual Account",
  },
  {
    img: addcompany,
    label: "Add Company",
  },
  {
    img: changepwd,
    label: "Change Password",
  },
];

let ProfileWidget = (props) => {
  return (
    <div className="profile_widget_container">
      <div className="profile_widget_head">
        <p>Profile</p>
      </div>
      <div className="profile_widget_list">
        {options.map((option, idx) => {
          return (
            <div
              onClick={() => props.setCurrentPage(idx)}
              className="profile_widget_row"
            >
              <img src={option.img} />
              <p
                style={{
                  textAlign: "left",
                }}
                className={"profile_widget_row_label"}
              >
                {option.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileWidget;
