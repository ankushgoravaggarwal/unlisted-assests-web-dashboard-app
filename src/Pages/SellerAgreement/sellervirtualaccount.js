import React from "react";
import "./tradereadystep3.scoped.css"
import Demat from "./Demat.png"
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
import BuyerAgreementRightHalf from "../../Components/BuyerAgreementComponents/buyeragreementrighthalf";
import {
    successToast,
  } from "../../../src/Components/Toast/index";
import BuyerAgreementLeftHalf from "../../Components/BuyerAgreementComponents/buyeragreementlefthalf";
import "./buyeragreement.scoped.css"





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

let SellerDematAccount =()=>{
    const classes = useStyles()
    const [depositoryName,setDepositoryname]=React.useState('')
    const [brokerName,setBrokerName]=React.useState('')
    const [ dematid, setDematid] = React.useState('')
    const [ confirmdematid, setConfirmDematid]= React.useState('')
    const [dpid , setDpId]= React.useState('')
    const [boid , setBoId]= React.useState('')
    const [dmatcall,setDmatcall]= React.useState('')
    // const handleChange =(event)=>{
    //     setValue(event.target.value)
    // }
    React.useEffect(()=>{
        callDmat()
    },[])
    const callDmat = async function () {
        let response = await apiCall("useronboarding/dmat",'GET')
        let responseJSON = await response.json()
        setDmatcall(responseJSON)
        setDematid(responseJSON.dmatId)
        setDpId(responseJSON.dpId)
        setBoId(responseJSON.boId)
        setBrokerName(responseJSON.brokerName)
        setDepositoryname(responseJSON.depositoryName)

        
    }
  const saveContinue = async function () {
        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
        let requestBody ={
            "id": 159,
            "dmatId": dematid,
            "dpId": dpid,
            "boId": boid ,
            "depositoryName": depositoryName,
            "brokerName": brokerName,
            "cmrCopy": null
        }
       
        let response = await apiCall("useronboarding/dmat", 'POST',requestBody)
        
        console.log("api called ",response)

        let responseJSON = await response.json()
        
        console.log("responseJson", responseJSON)

        successToast("Success", "Demat Account Updated");

        
    }


    return(<div style={{display:"flex",color: "#2E384D"}}>
    
        <div className="buyeragreement_left">
        <BuyerAgreementLeftHalf/>
        </div>
    <div className="seller_virtual_account_container">
    <div className="Trade_ready_step_3_container Trade_ready_step_3_text">
        <div style={{width:"500px"}}>
            <h3>Your Demat account Details</h3>
            <div style={{display:"flex",flexDirection:"column",width:"50%",lineHeight:"30px"}}>
                <label className="Trade_ready_step_3_Label">Demat ID*</label>
                <input type="text" className="sellerVirtualInput"
                name="dematid" onChange={(e) => setDematid(e.target.value)} value={dematid}
                />
                <label>Confirm Demat ID*</label>
                <input type="text" className="sellerVirtualInput"
                name="confirmdematid" onChange={(e) => setConfirmDematid(e.target.value)} value={confirmdematid}
                />
                <label>DP ID*</label>
                <input type="text" className="sellerVirtualInput"
                name="dpid" onChange={(e) => setDpId(e.target.value)} value={dpid}
                />
                <label>BO ID*</label>
                <input type="text" className="sellerVirtualInput"
                name="boid" onChange={(e) => setBoId(e.target.value)} value={boid}
                />
                <label>Depository Name</label>
                <input type="text" className="sellerVirtualInput"
                name="boid" onChange={(e) => setDepositoryname(e.target.value)} value={depositoryName}
                />
                <label>Broker Name</label>
                    <input type="text" className="sellerVirtualInput"
                    name="brokername" onChange={(e) => setBrokerName(e.target.value)} value={brokerName}
                />
            </div>
            <div >
                
        
            </div>
            
            
            <div className="Trade_ready_step_3_save_button">
                
            <Buttons.SecondaryButton value="Edit Account Details" />    
            <Buttons.PrimaryButton value="Yes, this is my account" onClick={saveContinue}/>
            </div>
        </div>
        
        <div>
            <BuyerAgreementRightHalf/>
        </div>

        </div>
        </div>
        </div>)
}
export default SellerDematAccount