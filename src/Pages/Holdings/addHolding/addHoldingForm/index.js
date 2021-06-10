import React from "react";
import Select from "react-select";
import "./style.css";
import UploadIcon from "../../../../assets/upload_icon.svg";
import vector from "./Vector.png"
import Greenright from "./Groupgreen right.png"
import { apiCall, setAccessToken } from "../../../../Utils/Network"
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Buttons from "../../../../../src/Components/Buttons/index"





const options = [
  { value: "ROFR", label: "ROFR" },
  { value: "HR approval", label: "HR approval" },
];

function AddHoldingsForm() {
  let history = useHistory();

  const [selectedCompany, setSelectedCompany] = React.useState('')
    const [selectedCompanyError, setSelectedCompanyError] = React.useState('')
    const [showSelectedCompanyError, setShowSelectedCompanyError] = React.useState(false)
  const [selectedCommodity, setSelectedCommodity] = React.useState('')
    const [selectedCommodityError, setSelectedCommodityError] = React.useState('')
    const [showSelectedCommodityError, setShowSelectedCommodityError] = React.useState(false)
  const [shareType, setShareType] = React.useState('')
 const [qtyHeld, setQtyHeld] = React.useState('')
    const [qtyHeldError, setQtyHeldError] = React.useState('')
    const [showQtyHeldError, setShowQtyHeldError] = React.useState(false)
  const [demated, setDemated] = React.useState('')
    const [dematedError, setDematedError] = React.useState('')
    const [showDematedError, setShowDematedError] = React.useState('')
  const [vested, setVested] = React.useState(true)
    const [vestedError, setVestedError] = React.useState('')
    const [showVestedError, setshowVestedError] = React.useState('')
  const [holding,setHolding] = React.useState({})



  const [allCompany, setAllCompany] = React.useState([])
  const [allCommodity, setAllCommodity] = React.useState([])

  const [showExistingHoldingInlineValidation, setShowExistingHoldingInlineValidation] = React.useState(false)
  const [open, setOpen] = React.useState(false);




  React.useEffect(() => GetAllcompany(), [])
  const GetAllcompany = async () => {
      let response = await apiCall("company/", 'GET')
      let responseJSON = await response.json()
      let companies = responseJSON.map((company) => {return {value: company.id , label: company.name}})
      setAllCompany(companies)

  }

  React.useEffect(() => GetAllCommodity(), [])

  const GetAllCommodity = async () => {
      let response = await apiCall("commodity/", 'GET')
      let responseJSON = await response.json()
      let commodity = responseJSON.map((item) => {return {value: item.id, label: item.name }})
      setAllCommodity(commodity)

  }


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


  const handleCreate = async (event) => {


    event.preventDefault()
      clearErrorMessages();

    let dematBoolean, vestedBoolean
    if (demated === "yes") {
      dematBoolean = true
    } else if (demated === "no") {
        dematBoolean = false
    }

      if (vested === "yes") {
          vestedBoolean = true
      } else if (demated === "no") {
          vestedBoolean = false
      }

     console.log("selected company ", selectedCompany)
    let requestBody = {
      "companyName": selectedCompany.label,
      "companyId": selectedCompany.value,
      "productId": 2,
      "commodityId": selectedCommodity.value,
      "commodityName": selectedCommodity.label,
      "qtyTotal": qtyHeld,
      "qtySale": 0,
      "qtyFreezed": 2,
      "isDemated": dematBoolean,
      "isVested": vestedBoolean,
      // "specialConditionTransfer": specialConditionForTransfer,
      "createDate": null,
      "updateDate": null,
      "uaVerificationStatus": "2",
      "uaVerificationRemark": "2",
      "proofDocument": null

    }
    console.log("request body", requestBody)

    let stringifiedRequestBody = JSON.stringify(requestBody)

    console.log("request body stringified", stringifiedRequestBody)

    // let response = await fetch("http://api1.unlistedassets.com/myholding/?access_token=b175ef54-e6af-41c3-ba0b-a5bbad752b9d", 
    //     {method: "POST", body: stringifiedRequestBody, headers: {"content-type": "application/json"}}
    //     )
      console.log("hihihihihhuhugyfdtxtdudffvubgihijnoknig"+requestBody.qtyTotal+requestBody.companyName+requestBody.commodityName+requestBody.isVested)
    let response = await apiCall("myholding/", 'POST', requestBody)

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
    }
    else {

      let responseJSON = await response.json()
      setHolding(responseJSON)

      console.log("response ", response)

      console.log("responseJson", responseJSON)

      setOpen(true);
    }


  }

  const clearErrorMessages = () => {
      setSelectedCompanyError('');
      setSelectedCommodityError('');
      setQtyHeldError('');
      setDematedError('');
      setVestedError('');
      setSelectedCompanyError('');
  }

    const validate = async (field, errorMessage) => {
      console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
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
    <div className="addholding-form" >
      <div>
        <h1>Create Holding</h1>
      </div>
      <div className="addholding-form_field ">
        <label>Company Name*</label>
        <Select options={allCompany} onChange={selectedOption => setSelectedCompany(selectedOption)} value={selectedCompany}/>

      </div>
        {showSelectedCompanyError ? <InlineValidationBoxExistingSelectedCompanyError /> : null}



      <div className="addholding-form_field addholding-form_field-2">
        <div>
          <label>Share Type*</label>
          <Select options={allCommodity} onChange={selectedOption => setSelectedCommodity(selectedOption)} value={selectedCommodity}/>

        </div>
          {showSelectedCommodityError ? <InlineValidationBoxExistingSelectedCommodityError /> : null}
          <div>
          <label>Quantity*</label>
          <input value={qtyHeld} onChange={(e) => setQtyHeld(e.target.value)}/>
        </div>
          <InlineValidationBoxExistingQtyheldError />
      </div>
      <div className="addholding-form_field">
        <p>Vested*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input type="radio" id="vested" name="vested" value="yes" checked={vested === "yes" ? true : false} onChange={(e) => {setVested("yes")}}/>
          </div>

            <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input type="radio" id="vested" name="vested" value="no" checked={vested === "no" ? true : false} onChange={(e) => setVested("no")}/>
          </div>

        </div>
      </div>
        {showVestedError ? <InlineValidationBoxExistingVestedError /> : null}
      <div className="addholding-form_field">
        <p>Demated*</p>
        <div className="addholding-form_radio-btn-group">
          <div className="addholding-form_radio-btn">
            <label for="yes">Yes</label>
            <input type="radio" id="demated" name="demated" value="yes" checked={demated === "yes" ? true : false} onChange={(e) => {setDemated("yes")}}/>
          </div>
          <div className="addholding-form_radio-btn">
            <label for="no">No</label>
            <input type="radio" id="demated" name="demated" value="no" checked={demated === "no" ? true : false} onChange={(e) => {setDemated("no")}}/>
          </div>
        </div>
          {showDematedError ? <InlineValidationBoxExistingDematedError /> : null}
      </div>
      <div className="addholding-form_field "></div>
      <div className="addholding-form_field ">
        <label>Special conditions for transfer*</label>
        <Select isMulti options={options} />
      </div>
      <div className="addholding-form_field addholding-form_upload-photo">
        <img src={UploadIcon} />
        <p>
          Upload your proof of holding. You can upload the screenshot (share
          certificate/demat holding) as proof or <span style={{color:"#721B65",cursor:"pointer"}}>browse</span>
        </p>
      </div>
      <div className="addholding-form_note">
        <div><img src={vector} style={{margin:"10px",paddingTop:"20px"}}/></div>
        <div>
        <p>
          Note: Uploading a fake or an outdated inventory is punishable by law.
          Please verify your inventory thoroughly to avoid any Infringement.
          This will lead to permanent blocking of your credentials from our
          platform. Click here to read guideleines.
        </p>
        </div>
      </div>
      <div className="addholding-form_button_container">
        <Buttons.SecondaryButton value="Discard" onClick={handleCreate1} style={{cursor:"pointer"}}/>
        <Buttons.PrimaryButton value="Create Holding" onClick={handleCreate} style={{cursor:"pointer"}} /> 
        
        <Dialog   style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
                    open={open}
                    onClose={() => { setOpen(false) }}
                >
                  
                    {/* <DialogTitle id="alert-dialog-title">{"Your Holdings Created Successfully!"}</DialogTitle> */}
                            <img style={{height:"100px" ,width:"100px", paddingLeft:"180px",marginTop:"10px"}} src={Greenright}/>
                            <h2 style={{paddingLeft:"40px"}}>Holdings Successfully Created!</h2>
                            <p style={{paddingLeft:"5px"}}>Continue to add listing to start selling on our marketplace.</p>
                                    
                    <DialogActions >
                    <Buttons.SecondaryButton value="Skip For Now" onClick={()=> {setOpen(false);history.push("/holdings")}}/>
                    
                            <Buttons.PrimaryButton  value="Continue"  onClick={()=>{
                               history.push({ pathname: "/create_inventory", state: { selectedHolding: holding} })
                                         }
                                         }/>
                                         
 
                    </DialogActions>
                </Dialog>
              
      </div>
    </div>
  );
}

export default AddHoldingsForm;
