import React from "react";
import money from "./completetransactionstepsGroup.png"
import trustee from "./trustee.png"
import deposit from "./deposit.png"
import copyfile from "./copyfile.png"
import "./notification.scoped.css"
import Buttons from "../../Components/Buttons";
import { apiCall } from '../../Utils/Network';

export default function Notifications(){

    const [notification,setnotification] = React.useState({});
    React.useEffect(() => {
        getAllNotifications()
      }, []);
    const getAllNotifications = async function (){
        let response = await apiCall("​notificationua​/findallaccount",'GET')
        console.log(response)
        let responseJSON = await response.json();
        console.log(responseJSON)
        setnotification(responseJSON)
    }
    let notificationlist = []
    for (let i=0;i<notification.length;i++){
        notification[i].push(
            <div className="notification_row">
            <div>
                <img src={money}/>
            </div>
            <div className="notification_marginLeft">
                <p>{notification.message}</p>
                <p>{notification.updateDate}</p>
            </div>
            </div>

        )
    }
    return(<div className="notification_container">
        <div className="notification_container1">
            {notificationlist}
            

            {/* <div className="notification_row">
            <div>
                <img src={trustee}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Trustee has verified</b> the transfer for order No.1762543234</p>
                <p>20 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={trustee}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Buyer has verified</b> the transfer for order No.1762543234</p>
                <p>25 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={deposit}/>
            </div>
            <div className="notification_marginLeft">
                <p>Buyer has <b>deposited the amount</b> in Escrow Account please upload share transfer documents. </p>
                <p>10 mins ago</p>
            </div>
            </div>

            <div className="notification_two_colums">
            <div style={{display:"flex"}}>
            <div>
                <img src={money}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Sign the agreement</b> for the order No.1876547889</p>
                <p>10 mins ago</p>
            </div>
            </div>
            <div>
                <Buttons.SecondaryButton value="Sign Agreement"/>
            </div>
            </div>

            <div className="notification_two_colums">
            <div style={{display:"flex"}}>
            <div>
                <img src={copyfile}/>
            </div>
            <div className="notification_marginLeft ">
                <p>Your sell order for Reliance 100 shares at Rs.288.55 the transfer for order No.<b>1762545678</b></p>
                <p>10 mins ago</p>
            </div>
            </div>
            <div>
                <Buttons.SecondaryButton value="View Order"/>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={money}/>
            </div>
            <div className="notification_marginLeft">
                <p><b>Sign the agreement</b> for the order No.1876547889</p>
                <p>10 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={copyfile}/>
            </div>
            <div className="notification_marginLeft">
                <p>Your sell order for Reliance 100 shares at Rs.288.55 the transfer for order No.<b>1762545678</b></p>
                <p>10 mins ago</p>
            </div>
            </div>

            <div className="notification_row">
            <div>
                <img src={copyfile}/>
            </div>
            <div className="notification_marginLeft">
                <p>Your sell order for Reliance 100 shares at Rs.288.55 the transfer for order No.<b>1762545678</b></p>
                <p>10 mins ago</p>
            </div>
            </div> */}

        </div>
        </div>)
}