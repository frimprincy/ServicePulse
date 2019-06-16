import React, {Component} from 'react';
import BookingNav from './BookingNav';
import BookingsSidebar from './BookingsSidebar';
import BookTable from './BookingsTable';

class Bookings extends Component{
    render(){
        return(

          <div className="">
             <BookingsSidebar />
            <section id="main-content">
                 <BookingNav />
            </section>
            <section id="main-content">
              <section className="wrapper">
                 <BookTable />
              </section>
            </section>
          

          </div>
        )
    }
}

export default Bookings;