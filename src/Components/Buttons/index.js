import React from "react";
import "./buttons.scoped.css"

let SecondaryButton = (props) => {
    console.log("props", props)
    return (
        <button className="secondary-button" {...props} >{props.value}</button>
    )
}

let PrimaryButton = (props) => {
    console.log("props", props)
        return (
            <button className={`${props.disabled ? 'primary_disabled' : ''} primary-button`} {...props}>{props.value}</button>
        )
    
}


let Buttons = { SecondaryButton, PrimaryButton }


export default Buttons