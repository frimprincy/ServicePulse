import React,{Component} from 'react';
import './../../layout/Layout.css';
import BookingNav from './../bookings/BookingNav';
import ProvidersTable from './providersTable';
import ProvidersSidebar from './providersSidebar';





  class Providers extends Component{
      render(){
          return(
            <div>
            <ProvidersSidebar />
              <section className='main'>
                 <BookingNav />
              </section>

              <section className='main'>
              
                <ProvidersTable />
              
              </section>

            
            </div>
          )
      }
  }

  export default Providers;