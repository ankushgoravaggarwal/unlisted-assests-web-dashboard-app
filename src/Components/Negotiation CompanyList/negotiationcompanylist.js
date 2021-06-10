import React from 'react';
import TCS from "../../Pages/Negotiations/Group 990TCS.png"

export default function NegotiationCompanyList(){
    const [submenu,setSubmenu]=React.useState(false);
    
    return( <div>
                    <div >
                         <h3 style={{margin:"20px",marginTop:"10px"}}>Negotiation</h3>       
                    </div>
                    <div style={{display:"flex",borderBottom: "1px solid #CFCBCF",alignItems:"left"}}>
                        <div>
                            <img src={TCS} style={{margin:"20px",cursor:"pointer"}}
                            onClick={()=>{setSubmenu(!submenu)}}
                            />
                        </div>
                        <div >
                            <p onClick={()=>{setSubmenu(!submenu)}} style={{cursor:"pointer"}}>TCS</p>
                            <p>1 hour ago</p>
                        </div>
                    </div>
                    {submenu === true ?<div style={{marginLeft:"20px"}}>
                    <div style={{display:"flex",borderBottom: "1px solid #CFCBCF"}}>
                        <div>
                            <img src={TCS} style={{margin:"20px"}}/>
                        </div>
                        <div>
                            <p>TCS</p>
                            <p>1 hour ago</p>
                        </div>
                    </div>

                    <div style={{display:"flex",borderBottom: "1px solid #CFCBCF"}}>
                        <div>
                            <img src={TCS} style={{margin:"20px"}}/>
                        </div>
                        <div>
                            <p>TCS</p>
                            <p>1 hour ago</p>
                        </div>
                    </div>

                    <div style={{display:"flex",borderBottom: "1px solid #CFCBCF"}}>
                        <div>
                            <img src={TCS} style={{margin:"20px"}}/>
                        </div>
                        <div>
                            <p>TCS</p>
                            <p>1 hour ago</p>
                        </div>
                    </div>

                    
                    </div>: null}
                    </div>
                    )
}