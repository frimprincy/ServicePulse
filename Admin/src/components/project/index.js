import React, { Component } from 'react';
import Sidebar from './../layout/Sidebar';
import './../layout/Layout.css';
import TopNabar from './../layout/Navbar';
import Cards from './cards';
import TableHeading from './table/tableHeading';
import TableItems from './table/tableItems';



class IndexPage extends Component{
  render(){
      return(
          
           
         <div className="">
            
             <Sidebar />
            <section id="main-content">
               <TopNabar />  
            </section>
            <section id="main-content">
            <section className="wrapper ">
             <Cards />
            </section>
            </section>
            <section id="main-content">
            <section className="wrapper ">
             <TableHeading />
            </section>
            </section>

            <section id="main-content">
             <TableItems />
            </section>
           
          
              

            
          </div>

            
        
          
      )
  }
}


export default IndexPage  