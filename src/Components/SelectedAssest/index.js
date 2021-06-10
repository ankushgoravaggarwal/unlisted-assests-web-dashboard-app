import HDFC from "../../Pages/Negotiations/hdfc.svg";
import "./selectedAssest.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
  } from "react-router-dom";

let SelectedAssest = (props) => {
    let location = useLocation();
    let selectedTrade = location.state.selectedTrade;
    return (
        <div className="listing">

            <div className="col-0">

                <div className="Negotiation_logo">
                    <img src={HDFC} />
                </div>
                <div>
                    <p className="bold">
                        HDFC Bank
                </p>
                    <p>
                        Banking
                </p>
                    <p>
                        INE0408056
                </p>
                </div>
            </div>

            <div>
                <p>
                    Share Type
            </p>
                <p>
                    {selectedTrade.commodityName}
            </p>
            </div>

            <div>
                <p>
                    Price/Share
            </p>
                <p>
                {selectedTrade.price}
            </p>
            </div>


            <div>
                <p>
                    Qty
            </p>
                <p>
                {selectedTrade.qty}
            </p>
            </div>


            <div>
                <p>
                    Amount
            </p>
                <p>
                    1200
            </p>
            </div>

            <div>
                <p>
                    Offer Price Range
            </p>
                <p>
                    80 - 110
            </p>
            </div>

            <div>
                <p>
                    Date & Time
            </p>
                <p>
                {selectedTrade.updateDate}
            </p>
            </div>


        </div>
    )
}

export default SelectedAssest