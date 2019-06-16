import React from 'react';
import {Link} from "react-router-dom";




const CommercialSidebar =()=>{


  return(
    
    <div className="sidebarContainer">
    <div id="sidebar" className="nav-collapse">
    <ul className="sidebar-menu" id="nav-accordion">
    <li className="mt">
    <Link className="" to="/">
      <i className="fa fa-home"></i>
      <span>Home</span>
      </Link>
     </li>

     

     <li className="mt">
     <Link   to="/providers">
       <i className="fa fa-male"></i>
       <span>Providers</span>
       </Link>
      </li>

      <li className="mt">
      <Link to="/customers">
        <i className="fa fa-users"></i>
        <span>Customers</span>
        </Link>
       </li>

    

       <li className="mt">
       <Link   to="/services">
         <i className="fa fa-user-secret"></i>
         <span>Services</span>
         </Link>
        </li>

        <li className="mt">
         <Link  to="/serviceSub">
           <i className="fa fa-street-view"></i>
           <span> Services SubCategories </span>
           </Link>
          </li>

          <li className="mt">
          <Link className="active"  to="/commercial">
            <i className="fa fa-university"></i>
            <span> Commercial Areas </span>
            </Link>
           </li>


       

        <li className="mt">
        <Link  to="/setting">
          <i className="fa fa-wrench"></i>
          <span> Settings </span>
          </Link>
         </li>

    </ul>
        
   
      </div>

      </div>

        

        
  

  )
}

export default  CommercialSidebar;