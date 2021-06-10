import React from "react";
import "./Tab2.css"
import '../../Pages/Companies/bootstrap4/css/bootstrap.scoped.css';
import Graph from "./ownershipGraph.tsx"

let Ownership =()=>{
    
    return(
    <div className="ownership-tab-section">
        <div className="row">
            <div className="col-md-12 col-12">
                <div className="tab-desc">
                    <h6 className="text-primary">Ownership Summary</h6>
                    <p>Shareholding Summary as of <span>[XXX]</span></p>
                </div>
            </div>
            <div className="col-md-6 col-12">
                <div className="graph-section">
                    <Graph />
                </div>
            </div> 
            <div className="col-md-6 col-12">
                <div className="ownership-table">
                    <h6 className="text-primary">Promoters</h6>
                    <table>
                            <tr>
                                <th>Shareholder Name</th>
                                <th>% Ownership</th>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                    </table>
                </div>

                <div className="ownership-table mt-4">
                    <h6 className="text-primary">Public Shareholders</h6>
                    <table>
                            <tr>
                                <th>Shareholder Name</th>
                                <th>% Ownership</th>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>% </td>
                            </tr>
                    </table>
                </div>
            </div>     
        </div>
        <hr />
        <div className="row">
            <div className="col-md-12 col-12">
                <h6 className="text-primary">Select Key Investors</h6>
            </div>
            <div className="col-md-4 col-12">
                <div className="selectkeyinvestors mt-3">
                    <ul>
                        <li>  Sequoia, </li>
                        <li>  Sofina,  </li>
                        <li>  Sixth Sense Ventures,</li>
                        <li>  Neoplux, </li>
                        <li>  Kiril Holdings, </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-5 col-12">
                <div className="selectkeyinvestors mt-3">
                    <ul>
                        <li>Deepinder Goyal (Founder Zomato),</li>
                        <li>Kunal Bahl (Founder Snapdeal), </li>
                        <li>Rohit Bansal (Founder Snapdeal), </li>
                        <li>Other individual investors from leading Private Equity firms in India</li>
                    </ul>
                </div>
            </div>
            <div className="col-md-3 col-12">
                <div className="selectkeyinvestors">
                    
                </div>
            </div>
        </div>
    </div>

    )
}
export default Ownership