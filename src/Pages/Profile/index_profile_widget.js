import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileWidget from "../../Components/ProfileWidget";
import FullWidthTabs from "../../Components/TradeReadyTab/tradereadytab";
import AddVirtualAccount from "../VirtualAccount/virtualaccount";
import ResetPassword from "../../Pages/ResetPassword";
import Profile from "./index";
import breathumbs from "../../assets/breathumbs.svg";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profile.css";
import AddCompanyRequest from "../../Components/AddCompanyRequest";
import '../Companies/bootstrap4/css/bootstrap.scoped.css';

let ProfileWidgetAndProfile = () => {
  const [currentpage, setCurrentPage] = useState(0);
  function GetPage() {
    switch (currentpage) {
      case 0:
        return <Profile />;
      case 1:
        return <FullWidthTabs />;
      case 2:
        return <p>Page 2</p>;
      case 3:
        return <AddVirtualAccount />;
      case 4:
        return <AddCompanyRequest />;
      case 5:
        return <ResetPassword />;
      default:
        return <ResetPassword />;
    }
  }
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <div className="breathumbs-top">
            <ul>
              <li><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
              <li><img src={breathumbs} /></li>
              <li>Trade Ready Step</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <div className="profile-left-sec m-0">
            <ProfileWidget
              currentpage={currentpage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <div className="col-md-10">
          
          <div className="profile-right-sec mb-5">{GetPage()}</div>
        </div>
      </div>
      
    </div>
  );
};
export default ProfileWidgetAndProfile;
