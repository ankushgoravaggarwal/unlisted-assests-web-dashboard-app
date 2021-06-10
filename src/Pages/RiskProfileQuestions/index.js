import React, { useState } from "react";
import "./riskProfileQuestions.css"
import backButton from "../back_button.png"
import logo from "../logo.png"
import riskProfileImage from "./risk_profile_card_image.png"


let RiskProfileQuestions = () => {

    const [name, setName] = useState("")

    return (
        <div className="risk-profile-questions">
            <div>
                <img src={logo} className="unlisted-assests-logo-header"/>
                <div className="horizontal-line" />
            </div>
            <div className="main-content-container">
                <img src={backButton} className="back-button"/>
                <div className="main-content">
                    <div className="title-card">
                        <div className="text-content">
                            <p class="title">Fill Your Risk Profile Questions</p>
                            <p class="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
                                1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
                        </div>
                        <div className="risk-profile-image-container">
                            <img src={riskProfileImage}/>
                        </div>
                    </div>

                    <div>
                        <p class="title">Questions</p>
                        <p class="description">Five question's answer fill compulsory then you can skip</p>
                    </div>
                </div>
            </div>
        </div>)
}

export default RiskProfileQuestions