import React,{Component} from "react";
import "./../../layout/Layout.css"
import ServiceSubSidebar from './serviceSubSidebar';
import BookingNav from './../bookings/BookingNav';
import ServiceSubTable from './serviceSubTable';
import Addsub from './AddSub';




class ServiceSub extends Component{
    render(){
        return(
            <div>
                 <ServiceSubSidebar />
               
                <section className='main'>
                    <BookingNav />
                 
                    <section className='wrapper'>
                     <Addsub />
                  </section>
                   <section className='wrapper'>
                     <ServiceSubTable />
                   </section>
                     
                 </section>
            
            </div>
        )
    }
}

export default ServiceSub