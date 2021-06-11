import React from "react";
import "./tradereadystep5.css";
import pan from "./pan.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
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

let PANVerification = ({ details }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [pannumber, setPanNumber] = React.useState("");
  const [panverificationstatus,setPanverificationstatus]=React.useState('')
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    setPanNumber(details.panNumber);
    setPanverificationstatus(details.panNumberVerified)
  }, [details]);

  const saveContinue = async (event) => {
    event.preventDefault();

    let requestBody = {


      panNumber: pannumber
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
    successToast("Success", "PAN Updated Successfully");
  };

  return (
    <div className="Trade_ready_step_5_container trade_ready_step_5_text">
      <div>
        <h3>PAN KYC Verification.</h3><h5>Verification Status: {panverificationstatus === true ? "Verified":"Pending"}</h5>
        <form>
          <label className="Trade_ready_step_5_Label">Pan Number*</label>
          <input
            type="text"
            name="pannumber"
            onChange={(e) => setPanNumber(e.target.value)}
            value={pannumber}
          />
        </form>

        <div className="Trade_ready_step_5_save_button">
          <Buttons.SecondaryButton value="Previous" />
          <Buttons.PrimaryButton
            value="Save & Continue"
            onClick={saveContinue}
          />
        </div>
      </div>

      <div className="Trade_ready_step_5_bank_image_container">
        <div className="Trade_ready_step_5_bank_image_area">
          <img src={pan} />
        </div>
        <div className="Trade_ready_step_5_text">
          <p>
            <b>Why PAN Number?</b>
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
export default PANVerification;
