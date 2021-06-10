import React from "react";
import "./tradereadystep6.css";
import Aadharcard from "./aadharlinked.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import Noteimage from "./not.svg";
import { apiCall, setAccessToken } from "../../Utils/Network";
import {
  successToast,
} from "../../../src/Components/Toast/index";

const useStyles = makeStyles((theme) => ({
  FormControl: {
    marginLeft: "7px",
    justifyContent: "space-between",
    paddingLeft: "10px",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2E384D",
    marginLeft: "7px",
  },
  droplabel: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2E384D",
    marginLeft: "-2px",
  },
}));

let AadharLinked = ({ details }) => {
  const classes = useStyles();
  const [aadharnumber, setAadharNumber] = React.useState("");
  const [aadharlinked, setAadharLinked] = React.useState("");
  const [aadharverificationstatus,setAadharverificationstatus]=React.useState(false)

  React.useEffect(() => {
    setAadharNumber(details.aadharNumber);
    setAadharLinked(details.aadharNumberVerified);
    setAadharverificationstatus(details.aadharNumberVerified)
  }, [details]);

  const handleDone = async (event) => {
    event.preventDefault();

    let requestBody = {

      productId: 1,
      aadharNumber: aadharnumber,
    };
    console.log("request body", requestBody);

    let stringifiedRequestBody = JSON.stringify(requestBody);

    console.log("request body stringified", stringifiedRequestBody);

    let response = await apiCall(
      "useronboarding/accountonboarding",
      "PUT",
      requestBody
    );

    let responseJSON = await response.json();
    console.log("response ", response);

    console.log("responseJson", responseJSON);
    successToast("Success", "Aadhar Updated Successfully");
  };

  return (
    <div className="Trade_ready_step_6_container trade_ready_step_6_text">
      <div>
        <h3>Aadhar Linked?</h3><h3>Verification Status: {aadharverificationstatus === true ? "Verified":"Pending"}</h3>
        <form>
          <label className="Trade_ready_step_2_Label">
            Enter Your Aadhar Number
          </label>
          <input
            type="text"
            name="aadharnumber"
            onChange={(e) => setAadharNumber(e.target.value)}
            value={aadharnumber}
          />
          <label>Is your Aadhar card linked to Phone or not?</label>
          <FormControl component="fieldset">
            {/* <FormLabel classes={{root:classes.label}} className="who_are_you"required component="legend">Get Your Notification Via</FormLabel> */}
            <RadioGroup
              className="trade_ready_step_6_Choose_radio_group"
              aria-label="position"
              name="position"
              onChange={(e) => {
                setAadharLinked(e.target.value === "yes" ? true : false);
              }}
            >
              <FormControlLabel
                className="Trade_ready_step_6_Choose_radio_border"
                value="yes"
                control={<Radio color="#721B65" />}
                label="Yes"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={aadharlinked}
              />
              <FormControlLabel
                className="Trade_ready_step_6_Choose_radio_border"
                value="no"
                control={<Radio color="#721B65" />}
                label="No"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={!aadharlinked}
              />
            </RadioGroup>
          </FormControl>
        </form>
        <div
          style={{
            display: "flex",
            width: "432px",
            marginTop: "20px",
            paddingTop: "15px",
            justifyContent: "center",
            height: "94px",
            background: "#2E384D",
            borderRadius: "10px",
          }}
        >
          <div style={{ margin: "10px", paddingTop: "20px" }}>
            <img src={Noteimage} />
          </div>
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "#FFFFFF",
                fontFamily: "Montserrat",
                fontStyle: "normal",
              }}
            >
              <b>Note:</b>Your agreement will be signed using aadhar based OTP
              verification. Please Keep your mobile phone ready, which is linked
              to your aadhar card.{" "}
            </p>
          </div>
        </div>

        <div className="Trade_ready_step_6_save_button">
          <Buttons.SecondaryButton value="Previous" />
          <Buttons.PrimaryButton value="Done" onClick={handleDone} />
        </div>
      </div>

      <div className="Trade_ready_step_6_bank_image_container">
        <div className="Trade_ready_step_6_bank_image_area">
          <img src={Aadharcard} />
        </div>
        <div className="Trade_ready_step_6_text">
          <p>
            <b>Why Bank Account Details?</b>
          </p>
          <p>
            {" "}
            We feel this is one of the fastest way to communicate with you and
            upadate you with all the information about your transaction and
            shortlisted companies.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AadharLinked;
