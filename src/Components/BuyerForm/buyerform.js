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
    const [quantityError,setQuantityError] = React.useState('')
    const [showQuantityError,setShowQuantityError] = React.useState('')
    const [priceError,setPriceError] = React.useState('')
    const [showPriceError,setShowPriceError] = React.useState('')
    const [commentError,setCommentError] = React.useState('')
    const [showCommentError,setShowCommentError] = React.useState('')
    
    let InlineValidationQuantity = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {quantityError}
                </p>
            </div>
        )
    }
    
    let InlineValidationBoxPrice = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {priceError}
                </p>
             </div>
        )
    }

    let InlineValidationBoxComment = () => {
        return (
            <div className="inline-validation-box">
                <p>
                    {commentError}
                </p>
             </div>
        )
    }
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

    const validate = async (field, errorMessage) => {
        console.log("hihhihihihihihihihihihihihihihihihiiiiiii"+field, errorMessage)
          switch (field) {
              case 'quantity':
                  console.log("hooooooooooooooooo1"+errorMessage)
                  await setQuantityError(errorMessage);
                  await setQuantity(field);
                  break;
    
                case 'price':
                    console.log("hooooooooooooooooo1"+errorMessage)
                  await setShowPriceError(errorMessage);
                  await setPrice(field);
                  break;
                
                  case 'comment':
                    console.log("hooooooooooooooooo1"+errorMessage)
                  await setShowCommentError(errorMessage);
                  await setComment(field);
                  break;     
    
              default:
                  console.log("hooooooooooooooooonijhibibibibib")
    
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
    }

    
    return(
        <div className="border p-3 rounded buyer-form-sec">
            <div className="buyerform-section">
                <div className="d-flex">
                    <div className="form-group">
                        <label className="text-small">Quantity*</label> <br />
                        <input type="text" className="border rounded mr-2"
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        />
                    </div>
                    {showQuantityError ? <InlineValidationQuantity/> : null}
                    <div className="form-group">
                        <label className="text-small">Price(₹)*</label><br />
                        <input type="text" className="border rounded"
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        />
                    </div>
                 {showPriceError ? <InlineValidationBoxPrice/> : null}
                </div >
                <div className="form-group">
                    <label className="text-small">Comment</label> <br/>
                    <input type="text" className="border rounded w-100"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    />
                </div>
                {showCommentError ? <InlineValidationBoxComment/> : null}
                <div className="d-flex align-items-center">
                    <input type="checkBox" />
                    <p className="m-0 ml-2 text-small">I accept negotiation's <b style={{color:"#721B65"}}>Terms & Conditions</b></p>
                </div>
            </div>
            <div className="buyerform-total-section border-top mt-2">
                <div className="d-flex justify-content-between p-2">
                    <label className="m-0">Qty: {quantity && price !== 0 ? <span>{quantity} x {price}</span> : null}</label>  <span>₹ {quantity * price}</span>
                </div>
                <div className="d-flex justify-content-between p-2">
                    <label className="m-0">Transaction Fees</label><span>₹ 112</span>
                </div>
                <div className="m-1">
                    <label style={{fontSize:"10px"}}>* Including GST</label>
                </div>
                <div className="d-flex justify-content-between p-2">
                    <label className="m-0" style={{color:"#721B65"}}>Proposed Amount</label><span style={{color:"#721B65"}}><b>₹ 112</b></span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Buttons.SecondaryButton value="Cancel" style={{marginRight:"5px"}} onClick={()=>{props.setNewoffer(false)}}/>
                <Buttons.PrimaryButton value="Send" onClick={buyerformsend}/>
            </div>

        </div>
    )
}
