import React from "react";
import "./buyervirtualaccount.scoped.css"
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
import { apiCall } from "../../Utils/Network"
import { withWidth } from "@material-ui/core";
import "./buyeragreement.scoped.css"
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";


import {
    successToast,
  } from "../../../src/Components/Toast/index";





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

let BuyerSendToVA =()=>{
    const classes = useStyles()
    
    const [accountnumber,setAccountNumber]=React.useState('')
    const [ifsc,setIfsc]=React.useState('')
    const [bankname,setBankName]=React.useState('')
    const [branchname,setBranchName]=React.useState('')
    const [virtualBankDetails,setVirtualbankdetails]=React.useState({})
    React.useEffect(()=>{
        virtualbankdetails()
    },[])
    const virtualbankdetails = async function (){
        const response = await apiCall("useronboarding/bankdetail/true",'GET')
        const responseJSON = await response.json()
        setVirtualbankdetails(responseJSON)
        setAccountNumber(responseJSON.accountNumber)
        setIfsc(responseJSON.ifscCode)
        setBankName(responseJSON.bankName)
        setBranchName(responseJSON.branchName)
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
            "isVirtualAccount": true
          }
       
        let response = await apiCall("useronboarding/bankdetail", 'POST', requestBody)
        
        console.log("api called ",response)

        let responseJSON = await response.json()
        
        console.log("responseJson", responseJSON)

        successToast("Success", "Virtual Account Updated Successfully");

        
    }

    return(<div style={{display:"flex",color: "#2E384D"}}>
    
        <div className="buyeragreement_left">
        <BuyerAgreementLeftHalf/>
        </div>

    <div className="Virtual_account_container Virtual_account_text">
        <div>
            <h3>Your virtual account Details.</h3>
            
            <div className="buyervirtualradio_container">
            <label><b>Choose Payment method *</b></label>
            
            <div style={{display:"flex",flexDirection:"column",paddingTop:"10px",lineHeight:"60px"}}>
                
            <div className="buyersendalignitems"><input type="radio" className="buyer_radio_input"/><label className="buyerradiomarginleft">Bank Transfer</label></div>
            <div className="buyersendradio"><div className="buyersendalignitems"><input type="radio" className="buyer_radio_input"/><label className="buyerradiomarginleft">Paypal</label></div><div><label>34567@gmail.com</label></div></div>
            <div className="buyersendradio"><div className="buyersendalignitems"><input type="radio" className="buyer_radio_input"/><label className="buyerradiomarginleft">Visa Debit card</label></div><div><label>34567@gmail.com</label></div></div>
            <div className="buyersendalignitems"><input type="radio" className="buyer_radio_input"/><label className="buyerradiomarginleft">Master card</label></div>
            
            </div>                   
            
            </div>
            

            <div className="Virtual_account_save_button">
                 <div style={{display:"flex",justifyContent:"space-between"}}> 
                <div>
                <label>Virtual Account Balance</label>
                {/* <input type="text"/> */}
                <p>Rs.3300</p>
                </div>
                <div>
                <label>Amount frozen in ongoing Transaction</label>
                <p>Rs.3300</p>
                
                {/* <input type="text"/> */}
                </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",paddingLeft:"30px",paddingRight:"30px"}}> 
                    <Buttons.SecondaryButton value="Withdraw Balance" style={{width:"200px"}}/>    
                    <Buttons.PrimaryButton value="Continue to pay"
                    disabled={!(bankname && accountnumber  && branchname && ifsc)}
                    onClick={saveContinue}
                    />
                </div>
                <p style={{fontSize: "14px"}}><b>Note:</b> It may take a few hours for amount to reflect on this screen post the transfer.</p>
            </div>
        </div>
                <div style={{display:"flex", flexDirection:"Column"}}>
                     <div style={{display:"flex",alignItems:"right",justifyContent:"flex-end", justifyItems:"right",
                     marginBottom:"5px"}}>
                         <button className="virtualaccount_statement_download">Download Account Statement</button>
                    </div>                   
                    <div className="Virtual_account_bank_image_container">
                    
                        <div className="Virtual_account_bank_image_area"><img src={bank}/></div>
                        <div className="Virtual_account_text"><p><b>Why Bank Account Details?</b></p><p> We feel this is one of the fastest way to communicate with you and 
                             upadate you with all the information about your transaction and shortlisted companies.</p></div>
                    </div>
                </div>
        </div>
        </div>)
}
export default BuyerSendToVA