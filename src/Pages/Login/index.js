import React from "react";
import loginPageMainImage from "./loginPageMain.png";
import logo from "../logo.png";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../Components/Toast/index";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { apiCall, setAccessToken } from "../../Utils/Network";
import Buttons from "../../Components/Buttons";

// class Login extends React.Component {
let Login = () => {
  const [welcomePage, setWelcomePage] = React.useState(false);
  const [userID, setUserID] = React.useState("");
  const [password, setPassword] = React.useState("");

  let history = useHistory();

  // state = {
  //     userID: "",
  //     password: ""
  // }

  // handleChange = (event) => {
  //     this.setState({ [event.target.name]: event.target.value })
  // }

  const handleSubmit = async (event) => {
    // const [welcomePage,setWelcomePage]= React.useState(false)
    event.preventDefault();
    // errorToast("Invalid", "Invalid User ID or password")

    try {
      let response = await apiCall(
        `oauth/token?grant_type=password&username=${userID}&password=${password}`,
        "POST"
      );

      if (response.status !== 200) {
        errorToast("Invalid", "Invalid User ID or password");
        return;
      }

      let jsonResponse = await response.json();

      setAccessToken(jsonResponse.access_token);
      history.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      console.error(error);
    }
  };

  // render() {
  return (
    <div className="container-fluid">
      <div className="row mobile-flex-column-reverse"> 
        <div className="col-md-6 col-12 d-flex align-items-center login_Page_left-half ">
          <div className="login_Page_left-half-inner">
            <div className="login_Page_main-image-container">
              <img src={loginPageMainImage} className="login_Page_main-image" />
            </div>
            <h5 className="login_Page_heading mt-5">Your data 100% Secure <br/> with us</h5>
            <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing <br/>
                elit, sed do eiusmod tempor incididunt <br/>
                ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="col-md-6 col-12 d-flex align-items-center justify-content-center login_Page_right-half">
          <div className="login_Page_right-half-inner">
            <div className="login_Page_contents">
              <div className="login_Page_logo-container">
                <img src={logo} className="login_Page_logo" />
              </div>
              <h5 className="login_Page_heading mt-5">Welcome back,</h5>
              <form className="login-form w-100">
                <label>User ID *</label>
                <input
                  type="text"
                  name="userID"
                  onChange={(e) => setUserID(e.target.value)}
                  value={userID}
                />

                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                  <Buttons.PrimaryButton value="Login"
                  disabled={!(userID && password)}
                  className="login-submit-button mt-4"
                  onClick={handleSubmit}
                  />
              </form>
              <div className="login_Page_forgot-actions mt-3">
                <p className="m-0">
                  <Link to="/forgotuserid">Forgot User ID</Link>
                </p>
                <div class="login_Page_vertical-line" />
                <p className="m-0">
                  <Link to="/forgotpassword">Forgot Password</Link>
                </p>
              </div>
              <div class="login_Page_horizontal-line" />
                <div className="login_Page_sign-up mt-5">
                  <p>
                    Don't have an account yet? <Link to="/sign-up">Sign Up</Link>
                  </p>
                </div>
            </div>
          </div>
        </div>
        
       
      </div>
    </div>
  );
  // }
};

export default Login;
