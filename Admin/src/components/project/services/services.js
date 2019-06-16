import React, { Component } from 'react';
import AddService from "./AddService"
import ServiceSidebar from './ServiceSidebar';
import "./../../layout/Layout.css"
import ServiceTable from "./ServiceTable";
import BookingNav from './../bookings/BookingNav';

class Services extends Component{
    render(){
        return(
            <div>
                   <ServiceSidebar />
                <section className='main'>
                       <BookingNav />
                    <section className="wrapper">
                      <AddService />
                    </section>
                    <section className="wrapper">
                         <ServiceTable />
                      </section>
                </section>
            </div>
        )
    }
}

export default Services;