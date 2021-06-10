import { Button } from '@material-ui/core';
import React from 'react';
import "./addcompanyrequest.css"
import Buttons from "../../Components/Buttons";
import { SettingsInputComponent } from '@material-ui/icons';


export default function AddCompanyRequest(props) {
    const [havestock,setHavestock]=React.useState(false)
    const [buystock,setBuystock]=React.useState(true)
  
  return (
  <div className="addcompanyrequest">
  <div className="addcompanyrequest_container">
                    <div style={{color: "#2E384D",display:"flex",justifyContent:"center"}}>    
                    <h2>Add Company Request</h2>
                    </div>
                    <div className="addcompanyrequest_FirstHalf">
                    <label>Compamy Name</label>
                    <input type="text" style={{borderRadius: "5px",borderColor:"#CFCBCF",marginBottom: "10px",focus:{borderColor:"1px solid red"}}} />
                    <label>Comments</label>
                    <textarea type="text" style={{borderRadius: "5px",borderColor:"#CFCBCF",marginBottom: "10px",resize:"none",height:"100px"}}/>
                    </div>
                    <div>
                        <label>Do you have stocks for this company?</label>
                        <div className="addcompanyrequest_form_field">
                            <div className="addcompanyrequest_radio">
                                <label>Yes</label>
                                <input type="radio" style={{width:"15px"}}
                                checked={ havestock === "Yes" ? true: false }
                                onChange={(e)=>{setHavestock("Yes")}}
                                value="Yes"
                                />
                            </div>
                            <div className="addcompanyrequest_radio">
                                <label>No</label>
                                <input type="radio" style={{width:"15px"}}
                                checked={ havestock === "No" ? true: false }
                                onChange={(e)=>{setHavestock("No")}}
                                value="No"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Do you want to buy this stocks?</label>
                        <div className="addcompanyrequest_form_field">
                            <div className="addcompanyrequest_radio">
                                <label>Yes</label>
                                <input type="radio" style={{width:"15px"}}
                                checked={ buystock === "Yes" ? true: false }
                                onChange={(e)=>{setBuystock("Yes")}}
                                value="Yes"
                                />
                            </div>
                            <div className="addcompanyrequest_radio">
                                <label>No</label>
                                <input type="radio" 
                                checked={ buystock === "No" ? true: false }
                                onChange={(e)=>{setBuystock("No")}}
                                value="No"
                                style={{width:"15px"}}/>
                            </div>
                        </div>
                    </div>
                    <p style={{fontSize:"14px"}}> <b>Note:</b> 
                    Send Documents Related to company <b style={{color:"#721B65",cursor:"pointer"}}>info@unlistedassets.com</b></p>
                    <div className="addcompanyrequest_buttonContainer">
                    <Buttons.SecondaryButton value="Cancel" onClick={props.onClose}/>
                    <Buttons.PrimaryButton value="Submit"/>
                    </div>
            </div>
            </div>);
}
