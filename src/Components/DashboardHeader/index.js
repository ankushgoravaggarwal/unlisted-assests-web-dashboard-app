import logo from "./unlisted_assests_white_logo.png";
import profileIcon from "./profile_icon_white.png";
import notificationIcon from "./notification_bell.png";
import { useLocation, Link, useHistory } from "react-router-dom";
import "./dashboardHeader.css";
import ProfileWidget from "../ProfileWidget";
import React, { Component, useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import {clearAccessToken} from "../../Utils/Network"
import Badge from '@material-ui/core/Badge';
import { apiCall } from '../../Utils/Network';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';

const ITEM_HEIGHT = 100;
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: 100,
    backgroundColor: "white"
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));


let DashboardHeader = () => {
  const [currentpage, setCurrentPage] = React.useState();
  let history = useHistory();
  const classes = useStyles();

  const longText = <div style={{display:"flex",flexDirection:"column",width:"200px",height:"100px"}}> 
<h3 style={{cursor:"pointer",color:"#000000",fontSize: "14px"}} onClick={()=>{history.push("/profilewig")}}>Edit Profile</h3>
<h3 style={{cursor:"pointer",color:"#000000",fontSize: "14px"}}>FAQ</h3>
<h3 style={{cursor:"pointer",color:"#000000",fontSize: "14px"}}>Terms Of use</h3>

<h3 style={{cursor:"pointer",color:"#000000",fontSize: "14px"}} onClick={()=>{
    clearAccessToken()
    history.replace("/login")
  }}>Logout</h3>


</div>;

  let nameUrlMapping = {
    Dashboard: "/dashboard",
    "Explore Companies": "/companies",
    "Marketplace": "/inventory",
    "My Holdings": "/holdings",
    // Negotitations: "/negotitations",
    "Ongoing Transactions": "/ongoingtransaction",
    "My Transactions": "/transactions",
    // Negotitations: "/negotitations",

    Services: "/services",
  };

  let location = useLocation();
  console.log("location ", location.pathname);

  let navItems = Object.keys(nameUrlMapping).map((item) => (
    
    <li
      className={
        location.pathname === nameUrlMapping[item]
          ? "nav-item selected"
          : "nav-item"
      }
    >
      <Link to={nameUrlMapping[item]}>
        <span>{item}</span>
      </Link>
    </li>
  
  ));

  const [notification,setnotification] = React.useState({});
  const [unread,setUnread] = React.useState(0)
  const [invisible,setInvisible] = React.useState(true)
  //const [seconds, setSeconds] = useState(0);



    React.useEffect(() => {


      console.log("jijijijijijijijijijiji")
      console.log("jijijijijijijijijijiji")
        getAllNotifications()
      const interval = setInterval(() => {
        getAllNotifications()
        //setSeconds(seconds => seconds + 1);
      }, 15000);

      return () => clearInterval(interval);
      }, []);


    const getAllNotifications = async function (){
      console.log("jijijijijijijijijijiji2")
        let response = await apiCall("notificationua/notificationunreadcount",'GET')
      console.log("jijijijijijijijijijiji12")
        console.log(response)
        let responseJSON = await response.json();
         console.log("nnnn"+responseJSON.notificationUnReadCount)
        await setnotification(responseJSON)

      console.log(responseJSON.notificationUnReadCount+"ab")
      if(responseJSON.notificationUnReadCount == 0 || responseJSON.notificationUnReadCount == undefined) {
        setInvisible(true);
        console.log("gogogo1"+invisible)
      } else {
        setInvisible(false);
        setUnread(responseJSON.notificationUnReadCount);
        console.log("gogogo2"+invisible+unread)
      }
    }
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{overflow:"hidden"}}>
      
      <div className="dashboard-header row">
        <div className="col-2 desktop-none">
        <div className="mobile-toggle nav-item-group">
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <li>{navItems}</li>
              </Menu>
            </div>
        </div>
        <div className="d-flex align-items-center col-md-2 col-6">
          <div className="logo-section">
            <img src={logo} className="logo-img" />
          </div>
        </div>
        <div className="col-md-8 col-12 d-flex align-items-center justify-content-center mobi-none">
          <div className="nav-item-group d-flex align-items-center w-100">
            <ul className="top-menus-links">{navItems}</ul>
          </div>
        </div>
        <div className="left-side col-md-2 col-4 d-flex align-items-center justify-content-center">
          <Badge badgeContent={unread} color="primary" 
          invisible={invisible}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          >
          <img src={notificationIcon}
          style={{ cursor: "pointer", }}
          onClick={() => {
            history.push("/notifications");
          }}
          />
          </Badge>
          
          

          <Tooltip  title={longText} classes={{ tooltip: classes.customWidth }} arrow interactive >
          <img
            src={profileIcon}
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/profilewig");
            }}
          />
          </Tooltip>
        </div>
      </div>

    </div>
  );
};

export default DashboardHeader;