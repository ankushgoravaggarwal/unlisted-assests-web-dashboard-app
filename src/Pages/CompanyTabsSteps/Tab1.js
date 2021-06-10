import React, { useEffect } from "react";
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import img1 from "./CompanyAboutImages/img1.jpg";
import img2 from "./CompanyAboutImages/img2.jpg";
import img3 from "./CompanyAboutImages/img3.jpg";
import img4 from "./CompanyAboutImages/img4.jpg";
import img5 from "./CompanyAboutImages/img5.jpg";
import key1 from "./CompanyAboutImages/key1.jpg";
import key2 from "./CompanyAboutImages/key2.jpg";
import key3 from "./CompanyAboutImages/key3.jpg";
import key4 from "./CompanyAboutImages/key4.jpg";
import "./Tab1.css";
let CompanyAboutTab = () => {

  return (
    <div className="AboutTab-section mt-4">
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="about-tab-section">
              <h5 className="text-primary">About the Company</h5>
              <p>B9 Beverages Private Limited is one the leading alcobev companies in India with flagship beer brand, Bira 91. Founded in 2015 by Ankur Jain, Bira 91 has quickly become the rage amongst urban millennials owing to its delicious beers, bold identity and a strong draft network, becoming the leading craft beer brand in India. Today, Bira is amongst the Top 25 craft beer brands worldwide and one of the fastest growing craft beer brands across the world, and the largest in India by sales volumes. <br /><br />

              The first brewery unit of the company was located in Flanders, Belgium, where the crafts distillery was used to contract the production of beer containing ingredients from France, Belgium, the Himalayas and the Bavarian Farms, and the beer was brought into India. The Company now operates four breweries in India, and has offices in nine cities including New York City.  Read More...</p>
              <hr className="w-100" />
              <h5 className="text-primary">Key Products and Business Segments</h5>
              <p>B9 Beverages has been the pioneer of introducing first of its kinds craft beers in India, experimenting with flavors for the youth generation of India. Select beer products of the Company are Bira Light, Bira Strong, Bira White, Bira Blonde, The Indian Pale Ale, Boom Classic, Boom Super Strong etc.
              Key Segments of the Company include: <span className="text-primary"><b>XXX, YYY, ZZZ </b></span></p>
            </div>
          </div>
        </div>
        <div className="row product-image-grid align-items-center justify-content-center">
          <div className="col-md-2 col-4">
            <div className="product-images p-2 w-100">
              <img className="w-100" src={img1} />
            </div>
          </div>
          <div className="col-md-2 col-4">
            <div className="product-images p-2 w-100">
              <img className="w-100" src={img2} />
            </div>
          </div>
          <div className="col-md-2 col-4">
            <div className="product-images p-2 w-100">
              <img className="w-100" src={img3} />
            </div>
          </div>
          <div className="col-md-2 col-4">
            <div className="product-images p-2 w-100">
              <img className="w-100" src={img4} />
            </div>
          </div>
          <div className="col-md-2 col-4">
            <div className="product-images p-2 w-100">
              <img className="w-100" src={img5} />
            </div>
          </div>
        </div>
        <hr className="w-100 m-2" />
        {/****************************  End Row *********************************/}
        <div className="Key-milestones row">
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2012</h5>
                <p>B9 Beverages Private Limited incorporated in New Delhi, India</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2015</h5>
                <p>Bira 91 brand of craft beers launched</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2016</h5>
                <p>Funding by Sequoia and other individual investors including Deepinder Goyal (Founder of Zomato), Kunal Bahl (Founder of Snapdeal) etc.</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2017</h5>
                <p>Bira 91 leaped across to New York City to begin its campaign in the US; First India based manufacturing in Indore</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2018</h5>
                <p>Bira 91 started on its wider expansion in the Asia Pacific market by entering Singapore; Funding by Sofina</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2019</h5>
                <p>Bira 91 became the Official Sponsor for ICC Global Events; Funding by Sixth Sense Ventures</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2020</h5>
                <p>Funding round by Sequoia and Sofina along with Sixth Sense Ventures, Neoplux etc.</p>
              </div>
          </div>
          <div className="col-md-6 col-12">
              <div className="p-2">
                <h5>2021</h5>
                <p>Funding by Kirin Holdings</p>
              </div>
          </div>
          <hr className="w-100" />
        </div>
        {/****************************  End Row *********************************/}
        <div className="Key-milestones row">
          <div className="col-md-12">
            <div>
              <h6 className="text-primary ml-1"><b>Select Key Competitors </b></h6>
            </div>
          </div>
          <div className="col-md-3 col-6">
              <div className="p-2">
                <img className="w-100" src={key1} />
              </div>
          </div>
          <div className="col-md-3 col-6">
              <div className="p-2">
                <img className="w-100" src={key2} />
              </div>
          </div>
          <div className="col-md-3 col-6">
              <div className="p-2">
                <img className="w-100" src={key3} />
              </div>
          </div>
          <div className="col-md-3 col-6">
              <div className="p-2">
                <img className="w-100" src={key4} />
              </div>
          </div>
          <hr className="w-100" />
        </div>
        {/****************************  End Row *********************************/}
        <div className="CorporateInformation row">
          <div className="col-md-12">
            <div>
              <h6 className="text-primary ml-1"><b>Corporate Information </b></h6>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text p-2">
              <div className="d-flex">
                <p className=" w-50 ">Incorporation Date</p>
                <p className="text-left w-50 mobi-right-text "><span> XXXX</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">Type</p>
                <p className="text-left w-50  mobi-right-text"> <span>Unlisted Private Company</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">Address</p>
                <p className="text-left w-50  mobi-right-text"> <span>XXXX  </span></p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text border-left pl-3 p-2">
              <div className="d-flex">
                <p className=" w-50 ">CIN</p>
                <p className="text-left w-50  mobi-right-text"><span> XXXX</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">PAN</p>
                <p className="text-left w-50  mobi-right-text"> <span>XXXX</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">GST Registration</p>
                <p className="text-left w-50  mobi-right-text"> <span>XXXX  </span></p>
              </div>
            </div>
          </div>
          <hr className="w-100" />
        </div>
        {/****************************  End Row *********************************/}
        <div className="CorporateInformation row">
          <div className="col-md-12">
            <div>
              <h6 className="text-primary ml-1"><b>Directors & Management</b></h6>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text p-2">
              <div className="d-flex">
                <p className=" w-50 ">Person 1</p>
                <p className="text-left w-50  mobi-right-text"><span>DIN <br /> XXXX</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">Person 2</p>
                <p className="text-left w-50  mobi-right-text"> <span>DIN <br /> XXXX</span></p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text border-left pl-3 p-2">
              <div className="d-flex">
                <p className=" w-50 ">XXXX</p>
                <p className="text-left w-50  mobi-right-text"><span>Number of Directorship <br /> XXXX</span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">XXXX</p>
                <p className="text-left w-50  mobi-right-text"> <span>Number of Directorship <br /> XXXX</span></p>
              </div>
            </div>
          </div>
          <hr className="w-100" />
        </div>
        {/****************************  End Row *********************************/}
        <div className="CorporateInformation row">
          <div className="col-md-12">
            <div>
              <h6 className="text-primary ml-1"><b>Key Management</b></h6>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text p-2">
              <div className="d-flex">
                <p className=" w-50 ">Person 1</p>
                <p className="text-left w-50  mobi-right-text"><span></span></p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">Person 2</p>
                <p className="text-left w-50 mobi-right-text "> <span></span></p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-3">
            <div className="CorporateInformation-text border-left pl-3 p-2">
              <div className="d-flex">
                <p className=" w-50 ">XXXX</p>
                <p className="text-left w-50  mobi-right-text">Number of Directorship <br /> -</p>
              </div>
              <div className="d-flex">
                <p className=" w-50 ">XXXX</p>
                <p className="text-left w-50  mobi-right-text"> Number of Directorship <br /> -</p>
              </div>
            </div>
          </div>
        </div>
        {/****************************  End Row *********************************/}

      </div>
  );
};
export default CompanyAboutTab;
