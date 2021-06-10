import React from 'react';
import TCS from "../../Pages/Negotiations/Group 990TCS.png"
import hatti from "../../Pages/Negotiations/hatti.jpg"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Negotiationcompanylist.css"
export default function NegotiationCompanyList(){
    const [submenu,setSubmenu]=React.useState(false);
    
    return( 
        <div className="mt-3">
                    <div>
                         <h6 className="text-dark"><b>Negotiation</b></h6>       
                    </div>
                    <div className="search-sec mt-3">
                        <div class="form-group has-search">
                            <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
                            <input type="text" class="form-control" placeholder="Search" />
                        </div>
                    </div>
                    <div className="Negotiation-listing-main">
                        <div className="Negotiation-listing d-flex border-bottom">
                            <div className="Negotiation-logo-image ">
                                <img src={TCS}
                                onClick={()=>{setSubmenu(!submenu)}}
                                />
                            </div>
                            <div className="Negotiation-list-desc d-flex align-items-center ">
                                <div className="Negotiation-list-info p-2">
                                    <h6 className="text-dark m-0" onClick={()=>{setSubmenu(!submenu)}} style={{cursor:"pointer"}}><b>TCS</b></h6>
                                    <p className="m-0">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="Negotiation-listing d-flex border-bottom">
                            <div className="Negotiation-logo-image ">
                                <img src={TCS}
                                onClick={()=>{setSubmenu(!submenu)}}
                                />
                            </div>
                            <div className="Negotiation-list-desc d-flex align-items-center">
                                <div className="Negotiation-list-info p-2">
                                    <h6 className="text-dark m-0" onClick={()=>{setSubmenu(!submenu)}} style={{cursor:"pointer"}}><b>HDFC Bank</b></h6>
                                    <p className="m-0">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="Negotiation-listing d-flex border-bottom">
                            <div className="Negotiation-logo-image ">
                                <img src={hatti}
                                onClick={()=>{setSubmenu(!submenu)}}
                                />
                            </div>
                            <div className="Negotiation-list-desc d-flex align-items-center">
                            <div className="Negotiation-list-info p-2">
                                    <h6 className="text-dark m-0" onClick={()=>{setSubmenu(!submenu)}} style={{cursor:"pointer"}}><b>Sun Pharma</b></h6>
                                    <p className="m-0">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="Negotiation-listing d-flex border-bottom">
                            <div className="Negotiation-logo-image ">
                                <img src={hatti}
                                onClick={()=>{setSubmenu(!submenu)}}
                                />
                            </div>
                            <div className="Negotiation-list-desc d-flex align-items-center">
                                <div className="Negotiation-list-info p-2">
                                    <h6 className="text-dark m-0" onClick={()=>{setSubmenu(!submenu)}} style={{cursor:"pointer"}}><b>Adani Green Energy</b></h6>
                                    <p className="m-0">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {submenu === true ?<div className="ml-4 buyers-listing-section">
                    <div className="Negotiation-listing d-flex border-bottom mobi-none">
                        <div className="Negotiation-logo-image ">
                            <img src={TCS}
                            onClick={()=>{setSubmenu(!submenu)}}
                            />
                        </div>
                        <div className="Negotiation-list-desc d-flex align-items-center ">
                            <div className="Negotiation-list-info p-2">
                                <h6 className="text-dark m-0" onClick={()=>{setSubmenu(!submenu)}} style={{cursor:"pointer"}}><b>Buyer 1</b></h6>
                                <p className="m-0">1 hour ago</p>
                            </div>
                        </div>
                    </div>
                    

                    
                    </div>: null}
                    </div>
                    )
}