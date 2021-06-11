import React from "react";
import "./tradereadystep2.css"
import bank from "./Bank.png"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from "../../Components/Buttons"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { apiCall } from "../../Utils/Network";
import UploadIcon from "../../assets/upload_icon.svg";

import {
    successToast,
  } from "../../../src/Components/Toast/index";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';

const useStyles = makeStyles((theme)=>({
    FormControl:{
        marginLeft:"7px",
        justifyContent:"space-between",
        paddingLeft:"10px"
    },
    label:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "7px",
        
    },
    droplabel:{
        fontWeight: "500",
        fontSize: 14,
        color: "#2E384D",
        marginLeft: "-2px",
        
    }
}))

let AddBankAccount =()=>{
    const classes = useStyles()
    
    const [accountnumber,setAccountNumber]=React.useState('')
    const [confirmaccountnumber,setConfirmAccountNumber]=React.useState('')
    const [ifsc,setIfsc]=React.useState('')
    const [bankname,setBankName]=React.useState('')
    const [branchname,setBranchName]=React.useState('')
    const [bankDetails,setBankDetails]=React.useState({})
    React.useEffect(()=>{
        bankdetails()
    },[])
    const bankdetails = async function (){
        const response = await apiCall("useronboarding/bankdetail/false",'GET')
        const bankresponseJSON = await response.json()
        setBankDetails(bankresponseJSON)
        setAccountNumber(bankresponseJSON.accountNumber)
        setIfsc(bankresponseJSON.ifscCode)
        setBankName(bankresponseJSON.bankName)
        setBranchName(bankresponseJSON.branchName)
    }
    
    const saveContinue = async function () {
        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        let requestBody = {
            "accountNumber": accountnumber,
            "ifscCode": ifsc,
            "bankName": bankname,
            "branchName": branchname,
            "uaVerifiedStatus": "string",
            "uaVerifiedRemarks": "string",
            "isVirtualAccount": false
          }
       
        let response = await apiCall("useronboarding/bankdetail", 'POST',requestBody)
        
        console.log("api called ",response)

        let responseJSON = await response.json()
        
        console.log("responseJson", responseJSON)
        successToast("Success", "Bank Account Updated");


        
    }

    return(
        <div className="container-fluid ">
        <div className="row">
            <div className="col-md-6 col-12">
                <h6>Add Your bank account Details.</h6>
                <form className="w-100 BankAccountTab-form">
                    <label className="Trade_ready_step_2_Label">Account Number</label>
                    <input type="text" name="accountnumber" onChange={(e)=>setAccountNumber(e.target.value)} value={accountnumber}/>
                    <label>Confirm Account Number</label>
                    <input type="text" name="confirmaccountnumber" onChange={(e)=>setConfirmAccountNumber(e.target.value)} value={confirmaccountnumber} />
                    <label>IFSC Code</label>
                    <input type="text" name="ifsc" onChange={(e)=>setIfsc(e.target.value)} value={ifsc}/>
                    <label>Bank Name</label>
                    <input type="text" name="bankname" onChange={(e)=>setBankName(e.target.value)} value={bankname}/>
                    <label>Branch Name</label>
                    <input type="text" name="branchname" onChange={(e)=>setBranchName(e.target.value)} value={branchname}/></form>
                <div>
                <div className="addinventory-form_field addinventory-form_upload-photo">
                    <img src={UploadIcon} />
                    <p style={{color: "#2E384D"}}>
                    Drop files to upload <br /> or <span style={{color:"#721B65",cursor:"pointer",fontWeight: "700"}}>browse</span>
                    </p>
                    <input type="file" id="myfile" name="myfile" />
                </div>
                    <FormControl variant="outlined">{/*
                        <InputLabel required></InputLabel>*/} {/*
                        <FormHelperText classes={{root:classes.droplabel}}>Country*</FormHelperText>*/} {/*
                        <Select className="Trade_ready_step_2_Select_container" labelId='select-demo' id='florida-select' displayEmpty name="branchname" value={branchname} onChange={(e)=>setBranchName(e.target.value)} >
                            <MenuItem value=''>Empty</MenuItem>
                            <MenuItem value={ 'first'}>first</MenuItem>
                            <MenuItem value={ 'second'}>second</MenuItem>
                            <MenuItem value={ 'third'}>Third</MenuItem>
                            <MenuItem value={ 'fourth'}>fourth</MenuItem>
                        </Select>*/}</FormControl>
                </div>
                <div className="Trade_ready_step_2_save_button d-flex justify-content-end">
                    <Buttons.SecondaryButton value="Previous" style={{margin:"10px", width:"30%"}} />
                    <Buttons.PrimaryButton value="Save & Continue" style={{margin:"10px"}} disabled={!(bankname && accountnumber && confirmaccountnumber && branchname && ifsc)} onClick={saveContinue} />
                </div>
            </div>
            <div className="col-md-6 col-12 Trade_ready_step_2_bank_image_container" >
                <div className="step1-right-sec mt-4">
                    <div className="">
                        <img src={bank} className="w-25"/>
                    </div>
                    <div className="Trade_ready_step_2_text">
                        <p className="m-0 mt-5"><b>Why Bank Account Details?</b>
                        </p>
                        <p className="m-0 mt-2 text-small">We feel this is one of the fastest way to communicate with you and upadate you with all the information about your transaction and shortlisted companies.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}
export default AddBankAccount