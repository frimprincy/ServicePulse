import React, { Component } from 'react';
import CommercialSidebar from './commercialSidebar';
import AddCommercial from './AddCommercial';
import CommercialAreaTable from './commercialTable';
import BookingNav from './../bookings/BookingNav';



class Commercial extends Component{
    render(){
        return(
               <div>
                      <CommercialSidebar /> 
                      <section className='main'>
                      <BookingNav />
                   </section>
                    <section className="main wrapper">
                         <AddCommercial />
                    </section>

                    <section className="main wrapper">
                         <CommercialAreaTable  />
                    </section>
               </div>

            
        )
    }
}


export default Commercial