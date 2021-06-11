import React, { useEffect } from "react";
import "./tradereadystep1.scoped.css";
import bank from "./Bank.png";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import { apiCall } from "../../Utils/Network";
import {
  successToast,
} from "../../../src/Components/Toast/index";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';


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
    // marginLeft: "7px",
  },
  droplabel: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2e384d",
    marginLeft: "-2px",
  },
}));

let ChooseRole = ({ details }) => {
  const classes = useStyles();
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    setRole(details.residentStatus);
  }, [details]);

  const saveContinue = async function () {
    // let response = await fetch('getholding').toJson()
    // setRowInformation(response)
    let requestBody = {
       residentStatus: role,
      };

    let response = await apiCall(
      "useronboarding/accountonboarding",
      "PUT",
      requestBody
    );

    console.log("api called ", response);

    let responseJSON = await response.json();

    console.log("responseJson", responseJSON);
    successToast("Success", "Residential Status Updated");
  };

  return (
    <div className="Trade_ready_step_1_container trade_ready_step_1_text">
      <div>
        <div>
        <h6>Who are You?</h6>
        <form>
          <FormControl component="fieldset">
            <RadioGroup
              className="trade_ready_step_1_Choose_radio_group"
              aria-label="position"
              name="position"
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                className="Trade_ready_step_1_Choose_radio_border"
                name="Resident_Indian"
                value="Resident Indian"
                control={<Radio color="#721B65" />}
                label="Resident Indian"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={role === "Resident Indian"}
              />
              <FormControlLabel
                className="Trade_ready_step_1_Choose_radio_border"
                value="Non Resident Indian"
                control={<Radio color="#721B65" />}
                label="Non Resident Indian"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={role === "Non Resident Indian"}
              />
              <FormControlLabel
                className="Trade_ready_step_1_Choose_radio_border"
                value="Non Indian"
                control={<Radio color="#721B65" />}
                label="Non Indian"
                labelPlacement="start"
                classes={{ root: classes.FormControl }}
                checked={role === "Non Indian"}
              />
            </RadioGroup>
          </FormControl>
        </form>
        </div>
        <div className="Trade_ready_step_1_save_button">
      
          <Buttons.PrimaryButton
            value="Save & Continue"
            onClick={saveContinue}
          />
        </div>
      </div>

      <div className="Trade_ready_step_1_bank_image_container">
        <div className="Trade_ready_step_1_bank_image_area">
          <img src={bank} />
        </div>
        <div className="Trade_ready_step_1_text">
          <p>
            <b>Why Bank Account Details?</b><br/>
          
            We feel this is one of the fastest way to communicate with you and
            upadate you with all the information about your transaction and
            shortlisted companies.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChooseRole;
