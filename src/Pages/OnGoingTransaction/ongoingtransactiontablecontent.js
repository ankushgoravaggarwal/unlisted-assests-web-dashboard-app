import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import OngoingTransactionTableHeader from './ongoingtransactiontableheader';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import "./myholdingstablecontent.css"
import Buttons from "../../Components/Buttons"
import axios from 'axios'
import ToogleButton from '../../Components/ToogleButton/toogleswitch';
import FloatingActionButtons from '../../Components/FabButton/fabbutton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { apiCall, setAccessToken } from "../../Utils/Network"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
// import FilterCard from "../../Components/FilterCard"
import EmptyHoldings from "../Holdings/index"
import edit from "./edit.png";
import deleteicon from "./delete.png"
import "../../Components/FilterCard/filterCard.css"
import '../Companies/bootstrap4/css/bootstrap.scoped.css';

import "../Companies/style.scoped.css"

import PriceRangeSlider from '../Companies/PriceRangeSlider';




import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory,useLocation
  } from "react-router-dom";

function descendingComparator(a,b, orderBy){
    if(b[orderBy] < a[orderBy]){
        return -1
    }
    if(b[orderBy] > a[orderBy]){
        return 1
    }
    return 0
}
function getComparator(order, orderBy){
    return order === "desc" 
    ? (a,b) => descendingComparator(a,b, orderBy) 
    : (a,b) => -descendingComparator(a,b, orderBy)
}
const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el,index) => [el,index])
    stabilizedRowArray.sort((a,b)=> {
        const order = comparator(a[0], b[0])
        if(order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el)=> el[0])
}

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
      },
      container: {
        maxHeight: 600,
        border:"0.5px solid #E5E5E5",
        borderRadius:"4px",
      },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px dashed #CFCBCF',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    
  }));
  const StyledButton = withStyles({
    root: {
      background: '#ED2939',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

export default function OngoingTransactionTableContent(props){
    let history = useHistory();
    
    const [rowInformation, setRowInformation] = React.useState([])
    const [allinventory,setAllinventory] = React.useState([]);
    const [transactioinformation,setTransactioninformation] = React.useState([])
    const [isShown, setIsShown] = React.useState(false);
    
    React.useEffect(() => {
        getData();
        getAllInventory();
        
      }, []); // <-- Have to pass in [] here!
      
    const getAllInventory = async function (){
        let allinventoryresponse = await apiCall("trade/findAll",'GET')
        console.log(allinventoryresponse)
        let allinventoryresponseJSON = await allinventoryresponse.json();
        console.log(allinventoryresponseJSON)
        setAllinventory(allinventoryresponseJSON)
    }
    const getData = async function () {
        // let response = await fetch('getholding').toJson()
        // setRowInformation(response)
       
        let response = await apiCall("tradeongoingtranaction/tradeaccount",'GET')
        // let transactionresponse = await apiCall("tradeongoingtranaction/tradeaccount",'GET')
        
            // setRowInformation(response)
        
        // let responseJSON = await response.json()
        
        console.log("api called ",response)

        let responseJSON = await response.json()
        //let transactionresponseJSON = await transactionresponse.json()
        
        console.log("responseJson", responseJSON)
        setRowInformation(responseJSON);
        // setRowInformation(responseJSON.map((item, idx) => {
        //     item = {...item, ...transactionresponseJSON[idx]}
        //     return item
        //     }))
        console.log(rowInformation)
       // setTransactioninformation(transactionresponseJSON)
        

        
    }
    
    const deleterow = async function(id){
        setLoading(true)
        try{
            let response = await apiCall(`myholding/${id}`, 'DELETE') 
            await getData()
            console.log(response) 
            setOpen(false) 
            setLoading(false) 
        }
        catch(e){
            console.log(e)
        }
        
    }
    const DeletePopUp =(id)=>{
            setOpen(true) 
            setRemove(id)
                     
    } 
    

    const classes = useStyles();
    const [orderDirection,setOrderDirection]=React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(10);
    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
        
    }

    // [
    //     {"company":,"qty":36,"sharetype":"John","price":15,"amount":100,"date":"9 Oct 2020","verified": "Yes","availableforsell": "Yes","action":"Edit"},
    //     {"company":"Moon Pharma","qty":23,"sharetype":"Rose","price":25,"amount":200,"date":"28 Oct 2020","verified": "Yes","availableforsell": "Yes","action":"Delete"},
    //     {"company":"Venus Pharma","qty":30,"sharetype":"Daniel","price":5,"amount":10,"date":"9 nov 2020","verified": "No","availableforsell": "Yes","action":"Edit"},
    //     {"company":"Earth Pharma","qty":34,"sharetype":"Aari","price":65,"amount":160,"date":"9 Oct 2021","verified": "Yes","availableforsell": "Yes","action":"Edit"},
    //     {"company":"jupiter Pharma","qty":37,"sharetype":"Rio","price":16,"amount":180,"date":"11 Oct 2020","verified": "No","availableforsell": "Yes","action":"Edit"},
    //     {"company":"Mercury Pharma","qty":28,"sharetype":"Rafiq","price":24,"amount":250,"date":"28 Oct 2020","verified": "Yes","availableforsell": "Yes","action":"Delete"},
    //     {"company":"Saturn Pharma","qty":38,"sharetype":"Dinesh","price":51,"amount":105,"date":"20 nov 2020","verified": "No","availableforsell": "Yes","action":"Edit"},
    //     {"company":"Pluto Pharma","qty":39,"sharetype":"Aajith","price":67,"amount":180,"date":"23 Oct 2021","verified": "Yes","availableforsell": "Yes","action":"Delete"},
    // ]
    const [addHoldings,setAddHoldings]=React.useState(false); 
    const [open, setOpen] = React.useState(false);
    const [remove, setRemove] = React.useState(null)
    const [loading,setLoading]=React.useState(false)
    const [modalStyle] = React.useState(getModalStyle);
    const [listing, setListing]=React.useState(1)
    
    

    const showAddorEditListing =(holding)=>{
        if (holding.qtysale === 0){
            setListing(2)
        }
    }
    const body = (
        <div style={modalStyle} className={classes.paper} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div>
               
                <p style={{paddingLeft:"35px"}}>Loading</p>  
    
        </div>
        </div>
        
      );

    


    const [panelShow1, setPanelShow1] = React.useState(false)
    const [panelShow2, setPanelShow2] = React.useState(false)
    const [panelShow3, setPanelShow3] = React.useState(false)

    const [SectorList, setSectorList] = React.useState([])

    const [SeriesOfFundingList, setSeriesOfFundingList] = React.useState([])

    React.useEffect(() => {

        axios.get(`https://api.unlistedassets.com/company/findAll`)
        .then(res => {
           const resData = res.data;
    
        //   this.setState({ 
        //     companies:resData,
        //     companyLenght:res.data.length,
        //     isLoading:false
        //    });
        //    this.getPrice();
        //    this.setState({
        //     maxpricerange:this.state.maxprice,
        //     minpricerange:this.state.minprice
        //    })
    
        }).catch((error) => {
          console.log(error)
      });

        axios.get(`https://api.unlistedassets.com/company/sector/findAll`)
            .then(res => {
                const resData = res.data;
                setSectorList(resData);
            }).catch((error) => {
                console.log(error)
            });

            axios.get(`https://api.unlistedassets.com/company/fundingseries/findAll`)
            .then(res => {
               const resData = res.data;
          
               setSeriesOfFundingList(resData)
            }
            ).catch((error) => {
              console.log(error)
          });
    }, []); // <-- Have to pass in [] here!

 
        

        


    let showPanel1 = () => {
        setPanelShow1(!panelShow1)
    }

    let showPanel2 = () => {
        setPanelShow2(!panelShow2)
    }

    let showPanel3 = () => {
        setPanelShow3(!panelShow3)
    }

    let sectorChange = () => {

    }

    let fundingChange = () => {

    }

    let finalChange  = () => {

    }

    let FilterCard = () => {

        let minprice = 10
        let maxprice = 10000
        return (
            <div className="filter-card-container">
                <div className="filter-card">
                    <div className="sun">
                        <div className="moon">
                            <h4>Filter<span className="pull-right"><Link to="#">Clear All</Link></span></h4>
                        </div>
                        <div className="earth">
                            <button className={panelShow1 ? "accor active1" : "accor"} onClick={showPanel1}>Sector</button>
                            <div className={panelShow1 ? "panel1 show-panel1" : "panel1"} >
                                {SectorList && SectorList.map((item, index) => {
                                    return <div className="form-group" key={index}>
                                        <p>  <input type="checkbox" name="sector_value" value={item.value} onChange={sectorChange} /> <span>{item.label}</span></p>
                                    </div>;
                                })}


                            </div>
                            <button className={panelShow2 ? "accor active1" : "accor"} onClick={showPanel2}>Series of Funding</button>
                            <div className={panelShow2 ? "panel1 show-panel1" : "panel1"}>
                                {SeriesOfFundingList && SeriesOfFundingList.map((item, index) => {
                                    return <div className="form-group" key={index}>
                                        <p>  <input type="checkbox" name="company_series_of_funding" value={item.value} onChange={fundingChange} /> <span>{item.label}</span></p>
                                    </div>;
                                })}
                            </div>
                            <button className={panelShow3 ? "accor active1" : "accor"} onClick={showPanel3}>Valuation</button>
                            <div className={panelShow3 ? "panel1 show-panel1" : "panel1"}>
                                {
                                    minprice && maxprice ? <PriceRangeSlider minVal={minprice} maxVal={maxprice} finalChange={finalChange} /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
      
    return(
                
            <div className="my-holdings-page">
                {rowInformation.length === 0 ? <EmptyHoldings/> : 
                 <React.Fragment>
                 <FilterCard/>
 
                 <div className="table-container">
 
                 <div className="Table_title"> <h2>  Ongoing Transactions</h2> 
                 {/* <button className="view_all_button">View all</button> */}
                
                 {/* <button onClick={()=>setAddHoldings(true)}>Add Holdings</button> */}
                 {/* <Buttons.SecondaryButton value="Add Holdings" onClick={()=>setAddHoldings(true)}/> */}
                 <Buttons.SecondaryButton value="Add Holdings" id="add-holdings-button" onClick={()=>{history.push("/addholdings")}}/>
                 
                {/* {addHoldings} */}
                 </div> 
                 { addHoldings ? null :
 
            <TableContainer className={classes.container}>
            
             <Table stickyHeader>
                 <OngoingTransactionTableHeader
                 valueToOrderBy={valueToOrderBy}
                 orderDirection={orderDirection}
                 handleRequestSort={handleRequestSort}
                 />
                 {
                     sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                     .map((holding,index) => (
                         <TableRow key={index}>
                             <TableCell>
                             <div className="company_cell">
                                 <div ><img src={holding.companyLogo} className="product-company-logo"/> </div>
                                 <div className="company_details ">
                                 <p className="company_name">{holding.companyName}</p>
                                 <p className="Share_type ">{holding.commodityName}</p>
                                 <p className="myHoldings_id">HOLD{holding.companyId}</p>
                                 </div>
                             </div>
                             </TableCell>
                             
                             
                             
                             <TableCell>
                                 {holding.tradeId}
                             </TableCell>
                             <TableCell>
                             {holding.action}
                             </TableCell>
                             <TableCell>
                             {holding.qtyUnderNegotiation}
                             </TableCell>
                             <TableCell>
                             {holding.priceUnderNegotiation}    
                             </TableCell>
                             <TableCell>
                             {holding.updateDate}
                             </TableCell>
                             <TableCell 
                             onMouseEnter={() => setIsShown(true)}
                             onMouseLeave={() => setIsShown(false)}
                             >
                                 <span>
                             {isShown === true && holding.ongoingTransactionStatus === "inprogress" ? 
                             <Buttons.PrimaryButton value="See Details"
                            
                             onClick={()=>{
                                history.push({ pathname: "/transactions", state: { selectedTrade: allinventory[index]} })
                            }}
                             />:
                             holding.ongoingTransactionStatus}</span>
                             </TableCell>
                         </TableRow>
                     ))
                 }
                 
             </Table>
         </TableContainer>
 }
         {/* <TablePagination
             rowsPerPageOptions={[5,10,25,50]}
             component="div"
             count={rowInformation.length}
             rowsPerpage={rowsPerPage}
             page={page}
             onChangePage={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
         /> */}
                                     <Dialog
                                             open={open}
                                             onClose={() => { setOpen(false) }}
                                         ><div style={{width:"300px",backgroundColor:"white"}}>
                                             {loading ? <p style={{paddingLeft:"120px"}}> Loading...</p> :
                                             <>
                                             <DialogTitle id="alert-dialog-title">{"Do You Want To Delete?"}</DialogTitle>
                                             
                                             <DialogActions>
                                             <Button  onClick={()=>{deleterow(remove)}} color="primary">
                                                 YES
                                             </Button>
                                             <Button onClick={() => { setOpen(false) }} color="primary">
                                                 NO
                                             </Button>
                                             
                                             </DialogActions>
                                             </>
                                         }
                                         </div>
                                         </Dialog>
 
                     </div>       
                     </React.Fragment>
                
            }

                        
        </div>
        
    )
    
 
}
