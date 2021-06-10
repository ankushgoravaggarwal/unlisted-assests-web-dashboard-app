import React,{useState} from 'react'
import { Link } from "react-router-dom";
// import "../bootstrap3/css/bootstrap.min.scoped.css"

import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"


function CompanyPagination(props) {
 const [start, setStart] = useState(0);
 const [end, setEnd] = useState(5);
 let pageNo = [];
 for(let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerpage); i++){
   pageNo.push(i);
 }

 
 function NavigateNext(){
  setStart(start+5);
  setEnd(end+5);
};
function NavigatePrev(){
  setStart(start-5);
  setEnd(end-5);
};


const showpageNo = pageNo.slice(start,end);
  return (
    <>
    <div className="text-center">
       <ul className="pagination">
         <li className="page-item">
         {
              start === 0 ? null : <Link className="page-link" onClick={NavigatePrev}> <i className="fa fa-angle-double-left" aria-hidden="true"></i> </Link>
            }
              
           
         </li>
          {
            showpageNo.map( number =>(
                 <li key={number} className="page-item">
                 <Link className="page-link" onClick={()=> props.paginate(number)}>  {number} </Link>   
                 </li>
             ))
           } 
           <li className="page-item">
              {
                pageNo.length > end ? <Link className="page-link" onClick={NavigateNext}> <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link> :null
            }
              
              </li>
           </ul>
           </div>
   </>
  )
}

export default CompanyPagination
