import React, { Component } from 'react';
import Sidebar from './../../layout/Sidebar';
import './../../layout/Layout.css';
import MapNavbar from './mapNav';
import MapStats from './mapView';


class MapPage extends Component{
  render(){
      return(
          
           
         <div className="">
            
             <Sidebar />
            <section id="main-content">
               <MapNavbar />  
            </section>
            <section id="main-content">
            <MapStats />
            </section>
            <section id="main-content">
           
            </section>
            
          </div>

            
        
          
      )
  }
}


export default MapPage  