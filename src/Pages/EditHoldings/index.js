import React from "react";
import "./editholdings.css";
import { makeStyles } from "@material-ui/core/styles";
import { apiCall, setAccessToken } from "../../Utils/Network";
import { useHistory, Link } from "react-router-dom";
import EditHoldingForm from "./editHoldingForm";
import VideoPreviewAddholding from "../../assets/video_preview_addholding.png";
import { successToast } from "../../../src/Components/Toast/index";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../assets/upload_icon.svg";
import Buttons from "../../Components/Buttons";

let EditHoldings = () => {
  let history = useHistory();
  let selectedHolding = history.location.state.holding;
  console.log(selectedHolding, "selectedHolding");
  const [value, setValue] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [yourPrice, setYourPrice] = React.useState("");
  
  
  
  const [editedData, setEditedData] = React.useState(selectedHolding || {});
  const [
    additionalConditionForTransfer,
    setAdditionalConditionForTransfer,
  ] = React.useState("");


  const [selectedCompany, setSelectedCompany] = React.useState('')
    const [selectedCompanyError, setSelectedCompanyError] = React.useState('')
    const [showSelectedCompanyError, setShowSelectedCompanyError] = React.useState(false)
  const [selectedCommodity, setSelectedCommodity] = React.useState('')
    const [selectedCommodityError, setSelectedCommodityError] = React.useState('')
    const [showSelectedCommodityError, setShowSelectedCommodityError] = React.useState(false)
    
    const [shareType, setShareType] = React.useState(
      selectedHolding.isVested ? "yes" : "no"
    );
    
    const [qtyHeld, setQtyHeld] = React.useState('')
    const [qtyHeldError, setQtyHeldError] = React.useState('')
    const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)
  
    const [demated, setDemated] = React.useState(
      selectedHolding.isDemated ? "yes" : "no"
      );
  
      const [dematedError, setDematedError] = React.useState('')
    const [showDematedError, setShowDematedError] = React.useState('')
  const [vested, setVested] = React.useState('')
    const [vestedError, setVestedError] = React.useState('')
    const [showVestedError, setshowVestedError] = React.useState('')
  const [holding,setHolding] = React.useState({})



  const [allCompany, setAllCompany] = React.useState([])
  const [allCommodity, setAllCommodity] = React.useState([])

  const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => GetAllCommodity(), []);

  const GetAllCommodity = async () => {
    let response = await apiCall("commodity/", "GET");
    let responseJSON = await response.json();
    console.log(responseJSON, "responsejson");
    if (response.status === 200) {
      setAllCommodity(
        responseJSON.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          };
        })
      );
    }
    setShareType(selectedHolding.commodityId);
  };

      let InlineValidationBoxExistingVestedError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {vestedError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingDematedError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {dematedError}
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

    let InlineValidationBoxExistingSelectedCommodityError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {selectedCommodityError}
                </p>
            </div>
        )
    }

    let InlineValidationBoxExistingSelectedCompanyError = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {selectedCompanyError}
                </p>

            </div>
        )
    }


  const handleChange = (field, val) => {
    editedData[field] = val;
    setEditedData({ ...editedData });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    console.log(editedData, "editedData");

    let stringifiedRequestBody = JSON.stringify(editedData);

    let response = await apiCall(
      `myholding/${selectedHolding.id}`,
      "PUT",
      editedData
    );

    if (response.status === 200) {
      successToast("Success", "Holdings successfully edited")
      setTimeout(()=>{
        history.push("/holdings")
      },3000)
    }

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
    }  else if(response.status === 200){
        await clearErrorMessages();
        //let responseJSON = await response.json()
        //setHolding(responseJSON)

        //console.log("response ", response)

        //console.log("responseJson", responseJSON)

        setOpen(true);
    } else {
        await setShowQtyHeldError(false);
        await setQtyHeldError("some problem occured, contact the admin...");
    }

  };

    const clearErrorMessages = async () => {
        await setShowSelectedCompanyError(false);
        await setSelectedCompanyError('');
        await setShowSelectedCommodityError(false);
        await setSelectedCommodityError('');
        await setShowQtyHeldError(false);
        await setQtyHeldError('');
        await setShowDematedError(false);
        await setDematedError('');
        await setshowVestedError(false);
        await setVestedError('');
    }

  const validate = async (field, errorMessage) => {
    console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
      await clearErrorMessages();
      switch (field) {
          case 'companyName':
              console.log("hooooooooooooooooo1"+errorMessage)
              await setShowSelectedCompanyError(true);
              await setSelectedCompanyError(errorMessage);
              break;


          case 'commodityName':

              console.log("hooooooooooooooooo11"+errorMessage)
              await setShowSelectedCommodityError(true);
              await setSelectedCommodityError(errorMessage);
              break;


          case 'qtyTotal':

              console.log("hooooooooooooooooo111"+errorMessage)
              await setShowQtyHeldError(true);
              setQtyHeldError(errorMessage);

              break;

          case 'isDemated':
              console.log("hooooooooooooooooo1111"+errorMessage)
              setShowDematedError(true);
              setDematedError(errorMessage);
              break;


          case 'isVested':
              console.log("hooooooooooooooooo11111"+errorMessage)
              setshowVestedError(true);
              setVestedError(errorMessage);
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
    <div style={{display:"flex",flexDirection:"column",
    justifyContent:"center",alignItems:"center",marginTop:"10px"}}>

      <div className="editholding_container-inner">
        <div className="editholding_right">
          <div>
            <h1>Edit Holdings</h1>
            <div>
              <p>{selectedHolding.companyName}</p>
              <p>Holding ID : {selectedHolding.id}</p>
            </div>
          </div>
          <div className="editholding_form_container">
            <div>

                <form className="editholding-form">
                    <div className="editholding-form_field addholding-form_field-2">
                        <div>
                            <label>Share Type*</label>
                            <input
                                className="editholding-form_qty"
                                value={editedData.commodityName}
                                disabled
                            />
                        </div>
                        {showSelectedCommodityError ? <InlineValidationBoxExistingSelectedCommodityError/> : null}
                        <div>
                            <label>Quantity*</label>
                            <input
                                className="editholding-form_qty"
                                value={editedData.qtyTotal}
                                onChange={(e) => handleChange("qtyTotal", e.target.value)}
                            />
                        </div>
                        {showQtyHeldError ? <InlineValidationBoxExistingQtyheldError/> : null}


                    </div>
                    <div className="editholding-form_field">
                        <p>Vested*</p>
                        <form className="editholding-form_radio-btn-group">
                            <div className="editholding-form_radio-btn">
                                <label htmlFor="yes">Yes</label>
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
                                <label htmlFor="no">No</label>
                                <input
                                    type="radio"
                                    id="no"
                                    name="drone"
                                    value="no"
                                    checked={!editedData.isVested}
                                    onChange={() => handleChange("isVested", false)}
                                />
                            </div>
                            {showVestedError ? <InlineValidationBoxExistingVestedError/> : null}
                        </form>
                    </div>
                    <div className="editholding-form_field">
                        <p>Demated*</p>
                        <form className="editholding-form_radio-btn-group">
                            <div className="editholding-form_radio-btn">
                                <label htmlFor="yes">Yes</label>
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
                                <label htmlFor="no">No</label>
                                <input
                                    type="radio"
                                    id="no"
                                    name="drone"
                                    value="no"
                                    checked={!editedData.isDemated}
                                    onChange={() => handleChange("isDemated", false)}
                                />
                            </div>
                            {showDematedError ? <InlineValidationBoxExistingDematedError/> : null}
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
                        <img src={UploadIcon}/>
                        <p>
                            Upload your proof of holding. You can upload the screenshot (share
                            certificate/demat holding) as proof or browse
                        </p>
                    </div>
                    <div className="editholding-form_button_container">
                        <button className="discard_button" onClick={handleCreate1}>Discard </button>
                        <Buttons.PrimaryButton onClick={handleEdit} value="Edit Holding"/>
                    </div>
                </form>

            </div>
          </div>
        </div>
        <div className="editholding_left">
          <div>
            <Link to={{pathname: '/create_inventory', state: { selectedHolding } }}><p className="add-lisiting-link">+ Add listing</p></Link>
          </div>
          <div className="editholding_left-inner">
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
};

export default EditHoldings;
