import React,{Component} from 'react';
import CustomersSidebar from './customerSidebar';
import './../../layout/Layout.css';
import CustomerTable from './customerTable';

import BookingNav from './../bookings/BookingNav';





  class Customers extends Component{
      render(){
          return(
            <div>
            <CustomersSidebar />
              <section className='main'>
                 <BookingNav />
              </section>

              <section className='main'>
              
                <CustomerTable />
              
              </section>

            
            </div>
          )
      }
  }

  export default Customers;