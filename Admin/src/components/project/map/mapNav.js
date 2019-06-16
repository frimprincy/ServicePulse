import React from 'react';
import './../../layout/Layout.css';


const MapNavbar=()=>{

    return(
        <div className=".NavCon">
        <nav className="nav-extended blue-grey lighten-1 navCom ">
        <div className="nav-wrapper ">
        
        <ul id="nav-mobile" className="right hide-on-med-and-down">
         
        </ul>
      </div>
      <div className="nav-content nav-tabs">
        <ul className="tabs tabs-transparent navComponents">
          <li className="tab "><a  href="/">dashboard</a></li>
          <li className="tab"><a className="active " href="/map">MAP</a></li>
        </ul>
      </div>
        </nav>
      </div>

       
        

    )

}

export default MapNavbar;