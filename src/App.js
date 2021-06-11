import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Pages/Login/index";
import Security from "./Pages/Security/index";
import SignUp from "./Pages/Signup/index";
import MobileVerification from "./Pages/MobileVerification/index";
import TwoFactorAuth from "./Pages/TwoFactorAuth/index";
import ForgotUserId from "./Pages/Security/ForgotUserId/index";
import ForgotPassword from "./Pages/Security/ForgotPassword/index";
import RiskProfileQuestions from "./Pages/RiskProfileQuestions/index";
import "./App.css";
//import ForgotUserId from "./Pages/ForgetUserId";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import Negotiations from "./Pages/Negotiations";

import DashboardHeader from "./Components/DashboardHeader";
//import StickyHeadTable from "./Components/DashboardHeader/dashboardtable"
//import TableHeader from "./Components/DashboardHeader/tableheader"
import TableContent from "./Components/DashboardHeader/tablecontent";
import Holdings from "./Pages/Holdings/index";
import SignAgreement from "./Pages/SignAgreement/index";
import EditHoldings from "./Pages/EditHoldings";
import { Breadcrumbs, Stepper } from "@material-ui/core";
import StepperArea from "./Components/Stepper/index";
import Profile from "./Pages/Profile/index";
import PhoneField from "./Components/PhoneWithCountry";
import ProfileWidget from "./Components/ProfileWidget";
import ChooseRole from "./Pages/TradeReadySteps/tradereadystep1";
import AddBankAccount from "./Pages/TradeReadySteps/tradereadystep2";
import FullWidthTabs from "./Components/TradeReadyTab/tradereadytab";
import ProfileWidgetAndProfile from "./Pages/Profile/index_profile_widget";
import ProfilePicModal from "./Components/ProfilePicModal";
import MyHoldingsTableContent from "./Pages/MyHoldings/myholdingstablecontent";
import Example from "./Components/ToogleButton/toogleswitch";
import FloatingActionButtons from "./Components/FabButton/fabbutton";
import ToogleButton from "./Components/ToogleButton/toogleswitch";
import AddHoldings from "./Pages/Holdings/addHolding";
import AlertDialog from "./Components/DialogBox/dialogbox";
import Loader from "./Components/Loader/loader";
import { PrivateRoute } from "./Routes";
import CreateInventory from "./Pages/Inventory/addInventory";
import InventoryTableContent from "./Pages/Inventory_old/inventorytablecontent";
import EditInventory from "./Pages/Inventory/EDITinventory/index";
import { ToastContainer } from "../src/Components/Toast/index";
import Companies from "../src/Pages/Companies"
import CompanyDetails from "../src/Pages/Companies/company-trade/CompDetails"
import AddCompanyRequest from "./Components/AddCompanyRequest";
import NegotiationBuy from "./Pages/Negotiations/negotiationsbuy"
import ResetPasswordNotLogIn from "./Pages/ResetPassword/resetpasswordnotlogin"
import Trade from "../src/Pages/Trade/index"
import OngoingTransactionTableContent from "./Pages/OnGoingTransaction/ongoingtransactiontablecontent"
import TransactionEmpty from "../src/Pages/Trade/Transactionempty";
import BuyerAgreement from "./Pages/BuyerAgreement";
import EsignAndOtp from "./Pages/BuyerAgreement/esignandotp";
import ManualSign from "./Pages/BuyerAgreement/manualsign";
import VerifyDocument from "./Pages/BuyerAgreement/verifydocument";
import LoanAgainstShares from "./Pages/Services/loanagainstshares";
import ValuationForTheShares from "./Pages/Services/valuationfortheshares";
import FindABroker from "./Pages/Services/findabroker";
import Services from "./Pages/Services";
import AuditorTransactionsForApproval from "./Pages/AuditerScreen";
import AuditerScreenTransactionTabs from "./Pages/AuditerScreen/Auditorscreentab";
import AuditorTransactionDetails from "./Pages/AuditerScreen/transactiondetail";
import DataSanctity from "./Pages/AuditerScreen/datasanctity";
import KYCVerification from "./Pages/AuditerScreen/kycverification";
import Notifications from "./Pages/Notification/notifications";
import BuyerVirtualAccount from "./Pages/BuyerAgreement/buyervirtualaccount";
import BuyerSendToVA from "./Pages/BuyerAgreement/buyersendmoneytovirtual";
import SellerDematAccount from "./Pages/SellerAgreement/sellervirtualaccount";
import AadharLinked from "./Pages/TradeReadySteps/tradereadystep6";
import TrusteeRejection from "./Pages/TrusteeRejection/TrusteeRejection";

export default function App() {
  return (
    <Router>
      <ToastContainer
              closeButton={true}
              position="top-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      <div className="router-main">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/dashboardtable">
            <StickyHeadTable/>
          </Route>  */}

          <PrivateRoute path="/dashboard">
            <DashboardHeader />
            <Dashboard />
            {/* <AddCompanyRequest/> */}
          </PrivateRoute>
          <Route path="/selectholding">
            <DashboardHeader/>
            <Dashboard/>
          </Route>
          <Route path="/auditortdashboard">
            <DashboardHeader/>
            <AuditerScreenTransactionTabs/>
          </Route>
          <Route path="/auditortransactiondetails">
            <DashboardHeader/>
            <AuditorTransactionDetails/>
          </Route>
          <Route path="/datasanctity">
            <DashboardHeader/>
            {/* <DataSanctity/> */}
            <KYCVerification/>
          </Route>
          <Route path="/notifications">
            <DashboardHeader/>
            <Notifications/>
          </Route>
          
          <PrivateRoute path="/companies">
            <DashboardHeader />
            <Companies/>
          </PrivateRoute>
          <Route path="/trade">
          <DashboardHeader />
            <Trade/>
          </Route>
          <Route path="/ongoingtransaction">
            <DashboardHeader />
            <OngoingTransactionTableContent/>
          </Route>
          <Route path="/emptytrade">
            <TransactionEmpty/>
          </Route>
          <Route path="/buyervirtualaccount">
            <BuyerVirtualAccount/>
          </Route>
          <Route path="/buyersendtovirtual">
            <BuyerSendToVA/>
          </Route>
          <Route path="/sellervirtualaccount">
            <DashboardHeader/>
            <SellerDematAccount/>
          </Route>
          <Route path="/trusteerejection">
            <TrusteeRejection/>
          </Route>
          <Route path="/buyeragreement">
          <DashboardHeader />
          <BuyerAgreement/>
          </Route>
          <Route path="/esignandotp">
            <DashboardHeader />
            <EsignAndOtp/>
          </Route>
          <Route path="/manualsign">
            <DashboardHeader />
            <ManualSign/>
          </Route>
          <Route path="/verifydocument">
            <DashboardHeader/>
            <VerifyDocument/>
          </Route>
          <PrivateRoute path="/inventory">
            <DashboardHeader />
            <InventoryTableContent />
          </PrivateRoute>
          <PrivateRoute path="/create_inventory">
            <DashboardHeader />
            <CreateInventory />
          </PrivateRoute>
          <PrivateRoute path="/edit_inventory">
            <DashboardHeader />
            <EditInventory /> 
          </PrivateRoute>
          <PrivateRoute path="/negotiations">
            <DashboardHeader />
            <Negotiations />
          </PrivateRoute>

          <PrivateRoute path="/transactions">
            <DashboardHeader />
            <Negotiations />
            {/* <Dashboard /> */}
            {/* <NegotiationBuy/> */}
          </PrivateRoute>

          <PrivateRoute path="/holdings">
            <DashboardHeader />
            <MyHoldingsTableContent />
          </PrivateRoute>
          <PrivateRoute path="/empty_holdings">
          <DashboardHeader/>
          <Holdings/> 
          </PrivateRoute>

        <PrivateRoute path="/addholdings">
          <DashboardHeader />
          <AddHoldings />
        </PrivateRoute>

          <PrivateRoute path="/signagreement">
            <DashboardHeader />
            <SignAgreement />
          </PrivateRoute>
          <PrivateRoute path="/editholdings">
            <DashboardHeader />
            <EditHoldings />
          </PrivateRoute>

          <PrivateRoute path="/services">
            <DashboardHeader/>
            {/* <LoanAgainstShares/> */}
            {/* <ValuationForTheShares/> */}
            {/* <FindABroker/> */}
            <Services/>
          </PrivateRoute>
          <PrivateRoute path="/tradeready">
            <DashboardHeader />
            <StepperArea />
          </PrivateRoute>
          <Route path="/aadharlinked">
            <AadharLinked/>
          </Route>
          <Route path="/resetpasswordnotlogin">
            {/* <DashboardHeader /> */}
            <ResetPasswordNotLogIn />
          </Route>
          <PrivateRoute path="/profilewig">
            <DashboardHeader />
            {/* <ProfileWidget/> */}
            <ProfileWidgetAndProfile />
            {/* <Profile/> */}
            {/* <PhoneField/> */}
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <DashboardHeader />
            {/* <ProfileWidget/> */}
            <Profile />
          </PrivateRoute>

          <PrivateRoute path="/profilepicmodal">
            <ProfilePicModal />
          </PrivateRoute>

          <PrivateRoute path="/tradereadytabs">
            <FullWidthTabs />
          </PrivateRoute>

          <PrivateRoute path="/chooserole">
            <ChooseRole />
          </PrivateRoute>

          <PrivateRoute path="/addbank">
            <AddBankAccount />
          </PrivateRoute>

          <PrivateRoute path="/table">
            <TableContent />
          </PrivateRoute>


          {/* <PrivateRoute path="/company/:cslug">
            <CompanyDetails/>
          </PrivateRoute> */}
          
          <Route path="/company/:cslug" component={CompanyDetails}/>
          
          {/* public routes below */}

          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
          <Route path="/security_questions">
            <Security />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/mobile-verification">
            <MobileVerification />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/two-factor-auth">
            <TwoFactorAuth />
          </Route>
          <Route path="/forgotuserid">
            <ForgotUserId />
          </Route>
          <Route path="/risk-profile-questions">
            <RiskProfileQuestions />
          </Route>

          <Route path="/">
            {/* <DashboardHeader/>
            <Negotiations /> */}
            <Login />
          </Route>
          {/* <Route path="/profilewidget">
          <ProfileWidget/>
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
