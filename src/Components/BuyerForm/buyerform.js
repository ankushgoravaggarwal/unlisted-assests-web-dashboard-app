import React from "react";
import { useEffect } from "react";
import { apiCall } from "../../Utils/Network";
import Buttons from "../Buttons";
import {useLocation} from "react-router-dom";
import {
    successToast,errorToast
  } from "../../../src/Components/Toast/index";
import Negotiations from "../../Pages/Negotiations";


export default function BuyerForm(props){
    const {tradecommunication1} = props;

    const location = useLocation();
    const selectedTrade = location.state.selectedTrade;
    const [quantity,setQuantity]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [comment,setComment]=React.useState('');
    const [buyerformdetails,setBuyerformdetails] = React.useState({});
    const [communicationStatus,setCommunicationstatus] = React.useState('newoffer')
    const [tradeOnGoingTranaction,setTradeOnGoingTranaction] = React.useState({});
    const [nonTradeOwnerAccountId,setNonTradeOwnerAccountId] = React.useState('');


    props.acceptorreject();

    useEffect(()=>{
        GetTradeOnGoingTransaction();
    },[])



    const reqBody = {
        
        "communicationStatus": communicationStatus,
        "nonTradeOwnerAccountId": nonTradeOwnerAccountId,
        "message": comment,
        "offeredPrice": price,
        "offeredQuantity": quantity,
        "tradeId": selectedTrade.id,       
      }

    const  GetTradeOnGoingTransaction = async function () {

        if(tradecommunication1[0] !== undefined) {
            const response = await apiCall("tradeongoingtranaction/ongoingtransaction/"+tradecommunication1[0].tradeOnGoingTransactionId,"GET")
            const responseJSON = await response.json();
            await setNonTradeOwnerAccountId(responseJSON.onboardingTradeNONOwnerId);
            console.log("hiiiiiiiiii"+responseJSON.onboardingTradeNONOwnerId+nonTradeOwnerAccountId)
        }
    }

    async function buyerformsend() {

        const response = await apiCall("tradecommunication/",'POST',reqBody)
        const responseJSON = await response.json();

        setBuyerformdetails(responseJSON);
        if (response.status !== 200) {
            errorToast("Invalid", "Request Not Sent");
            
            return;
        }else if (response.status === 200){
                
               successToast("Success","Request Sent Successfully")
                props.setNewoffer(false) 
                props.callback();
                props.acceptorreject(reqBody);
                
        }
    }

    
    return(
        <div style={{border: "1px solid #CFCBCF",width:"402px",height:"400px",
        display:"flex",flexDirection:"column",justifyContent:"center",color: "#2E384D"}}>
            <div style={{margin:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                <label>Quantity*</label>
                <input type="text" style={{border: "1px solid #CFCBCF",borderRadius: "4px"}}
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                />
                </div>
                <div style={{display:"flex",flexDirection:"column"}} >
                <label>Price(₹)*</label>
                <input type="text" style={{border: "1px solid #CFCBCF",borderRadius: "4px"}}
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
                </div>
                </div >
                <div style={{display:"flex",flexDirection:"column"}}>
                <label>Comment</label>
                <input type="text" style={{border: "1px solid #CFCBCF",borderRadius: "4px"}}
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                />
                </div>
                <div style={{display:"flex"}}>
                    <div style={{paddingTop:"10px",marginRight:"10px"}}>
                <input type="checkBox" />
                </div>
                <div>  
                    <p>I accept negotiation's <b style={{color:"#721B65"}}>Terms & Conditions</b></p>
                </div>

                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",borderTop:"1px solid #CFCBCF",marginLeft:"10px",marginRight:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",margin:"10px"}}>
                <label>Qty: {quantity && price !== 0 ? <span>{quantity} x {price}</span> : null}</label>  <span>₹ {quantity * price}</span>
                
                </div>
                <div style={{display:"flex",justifyContent:"space-between",margin:"10px",marginBottom:"0px"}}>
                <label>Transaction Fees</label><span>₹ 112</span>
                
                </div>
                <div style={{marginLeft:"10px",marginBottom:"10px"}}>
                    <label style={{fontSize:"10px"}}>* Including GST</label>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#721B65",marginLeft:"10px",marginRight:"10px"}}>
                <label>Proposed Amount</label><span><b>₹ 112</b></span>
                
                </div>
            </div>
            <div>
                <Buttons.SecondaryButton value="Cancel" onClick={()=>{props.setNewoffer(false)}}/>
                <Buttons.PrimaryButton value="Send" onClick={buyerformsend}/>
            </div>

        </div>
    )
}
