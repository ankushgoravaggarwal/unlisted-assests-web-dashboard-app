import React from "react";
import "./editholdings.css";
import { makeStyles } from "@material-ui/core/styles";
import { apiCall, setAccessToken } from "../../Utils/Network";
import { useHistory, Link } from "react-router-dom";
import EditHoldingForm from "./editHoldingForm";
import VideoPreviewAddholding from "../../assets/video_preview_addholding.png";
import { successToast } from "../../../src/Components/Toast/index";


let EditHoldings = () => {
  let history = useHistory();
  let selectedHolding = history.location.state.holding;
  console.log(selectedHolding, "selectedHolding");
  const [value, setValue] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [yourPrice, setYourPrice] = React.useState("");
  const [vested, setVested] = React.useState("");
  const [demated, setDemated] = React.useState(
    selectedHolding.isDemated ? "yes" : "no"
  );
  const [shareType, setShareType] = React.useState(
    selectedHolding.isVested ? "yes" : "no"
  );
  const [editedData, setEditedData] = React.useState(selectedHolding || {});
  const [
    additionalConditionForTransfer,
    setAdditionalConditionForTransfer,
  ] = React.useState("");

  const [allCommodity, setAllCommodity] = React.useState([]);

  React.useEffect(() => GetAllCommodity(), []);

  const GetAllCommodity = async () => {
    let response = await apiCall("commodity/", "GET");
    let responseJSON = await response.json();
    console.log(responseJSON, "responsejson");
    if (response.status === 200) {
      setAllCommodity(
        responseJSON.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          };
        })
      );
    }
    setShareType(selectedHolding.commodityId);
  };

  const handleChange = (field, val) => {
    editedData[field] = val;
    setEditedData({ ...editedData });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    console.log(editedData, "editedData");

    let stringifiedRequestBody = JSON.stringify(editedData);

    let response = await apiCall(
      `myholding/${selectedHolding.id}`,
      "PUT",
      editedData
    );
    let responseJSON = await response.json();
    if (response.status === 200) {
      successToast("Success", "Holdings successfully edited")
      setTimeout(()=>{
        history.push("/holdings")
      },3000)
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",
    justifyContent:"center",alignItems:"center",marginTop:"10px"}}>

      <div className="editholding_container-inner">
        <div className="editholding_right">
          <div>
            <h1>Edit Holdings</h1>
            <div>
              <p>{selectedHolding.companyName}</p>
              <p>Holding ID : {selectedHolding.id}</p>
            </div>
          </div>
          <div className="editholding_form_container">
            <div>
              <EditHoldingForm
                allCommodity={allCommodity}
                editedData={editedData}
                handleChange={handleChange}
                submit={handleEdit}
              />
            </div>
          </div>
        </div>
        <div className="editholding_left">
          <div>
            <Link to={{pathname: '/create_inventory', state: { selectedHolding } }}><p className="add-lisiting-link">+ Add listing</p></Link>
          </div>
          <div className="editholding_left-inner">
            <img src={VideoPreviewAddholding} />
            <div>
              <p>Holding</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHoldings;
