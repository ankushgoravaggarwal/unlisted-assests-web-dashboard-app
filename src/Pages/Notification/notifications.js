import React from "react";
import money from "./completetransactionstepsGroup.png"
import trustee from "./trustee.png"
import deposit from "./deposit.png"
import copyfile from "./copyfile.png"
import "./notification.scoped.css"
import Buttons from "../../Components/Buttons";
import { apiCall } from '../../Utils/Network';
import {
    useHistory
} from "react-router-dom";

export default function Notifications(){

    let history = useHistory();

    const [notification,setnotification] = React.useState({});
    //const [notificationlist,setNotificationlist] = React.useState([]);
    React.useEffect( () => {
        getAllNotifications()

        // const interval = setInterval(async () => {
        //     await getAllNotifications()
        //     //setSeconds(seconds => seconds + 1);
        // }, 20000);
        //
        // return () => clearInterval(interval);

    }, []);
    const getAllNotifications = async function (){
        let response = await apiCall("notificationua/findallaccount",'GET')
        console.log(response)
        let responseJSON = await response.json();
        console.log(responseJSON)
        await setnotification(responseJSON)


        //await setNotificationlist(notificationlist1)
        await apiCall("notificationua/notificationunreadaccount",'PUT')

    }

    let notificationlist = []
    for (let i=0;i<notification.length;i++){
        notificationlist.push(
            <div className="notification_row">
                <div>
                    <img src={notification[i].notificationImage}/>
                </div>
                <div className="notification_marginLeft">
                    <p>{notification[i].message}</p>
                    <p>{notification[i].updateDate}</p>

                    {/*<Buttons.PrimaryButton value="See Details"*/}

                    {/*                       onClick={()=>{*/}
                    {/*                                    //trade*/}
                    {/*                                    //trade forms*/}
                    {/*                                    //holding*/}
                    {/*                                    //holding forms*/}
                    {/*                                    //ongoingtxn*/}
                    {/*                                    //negotiations window*/}
                    {/*                                    //aggrement window*/}
                    {/*                                   // history.push({ pathname: "/notification[i].messageType" })*/}
                    {/*                           }*/}
                    {/*                       }*/}
                    {/*/>*/}

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