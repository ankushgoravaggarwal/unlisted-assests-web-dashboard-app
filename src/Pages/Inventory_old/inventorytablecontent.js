import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeader from './myinventorytableheader';
import { makeStyles } from '@material-ui/core/styles';
import SunPharma from "./sun_pharma.svg";
import "./inventorytablecontent.css"
import Buttons from "../../Components/Buttons"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToogleButton from '../../Components/ToogleButton/toogleswitch';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";
import { apiCall } from '../../Utils/Network';


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
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 700,
      width: 700,
      border: "1px solid #CFCBCF",
      borderRadius:"4px",
      margin: "10px"
    },
  });
export default function InventoryTableContent(props){
    let history = useHistory();
    const classes = useStyles();
    const [orderDirection,setOrderDirection]=React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy]=React.useState('company');
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(10);
    const [rowInformation,setRowInformation]=React.useState([])
    const [open, setOpen] = React.useState(false);
    const [remove, setRemove] = React.useState(null)
    const [loading,setLoading]=React.useState(false)
    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
        
    }
    React.useEffect(() => {
        getAllInventory()
      }, []);
    const getAllInventory = async function (){
        let response = await apiCall("trade/findAll",'GET')
        console.log(response)
        let responseJSON = await response.json();
        console.log(responseJSON)
        setRowInformation(responseJSON)
    }
    const deleterow = async function(id){
        setLoading(true)
        try{
            let response = await apiCall("trade/"+id, 'DELETE') 
            await getAllInventory()
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

    return( <div style={{display:"flex",justifyContent:"center"}}>
                
            <div>
                <div className="Inventory_Table_title"> <p>Available Listings</p> 
                {/* <Buttons.SecondaryButton value="Create Inventory" 
                onClick={()=>{history.push("/create_inventory")}}/>  */}
                {/* <button className="view_all_button">View all</button> */}
                {/* <Buttons.SecondaryButton value="Edit Inventory" 
                onClick={()=>{history.push("/edit_inventory")}} />
                <Buttons.SecondaryButton value="View All"/> */}
                </div> 
               
           <TableContainer className={classes.container}>
           
            <Table stickyHeader>
                <TableHeader
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />
                {
                    sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trade,index) => (
                        <TableRow key={index}>
                                                        
                            <TableCell>
                                {trade.commodityName}
                                {trade.updateDate}
                            </TableCell>
                            <TableCell>
                                {trade.qty}
                            </TableCell>
                            <TableCell>
                                {trade.price}
                            </TableCell>
                            <TableCell>
                                {trade.minBidPriceAccepted}
                            </TableCell>
                            <TableCell>
                                {trade.isNegotiable}
                                
                            </TableCell>
                            <TableCell>
                                {trade.isTradeOwner === false ? 
                                <h4 style={{cursor:"pointer",color: "#721B65"}}
                                onClick={()=>{
                                    history.push({ pathname: "/transactions", state: { selectedTrade: trade } })
                                }}>
                                Negotiate</h4>
                                :<p>You are the Owner</p> }
                                
                            </TableCell>
                        </TableRow>
                    ))
                }
                
            </Table>
            
        </TableContainer>
            
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
        
        </div>
    )
    
 
}