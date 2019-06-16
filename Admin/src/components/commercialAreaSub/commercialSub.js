import React, { Component } from 'react';
import CommercialSubSidebar from './commercialSubSidebar';
import AddCommercialSub from './addCommercialSub';


class Commercialsub extends Component{
    render(){
        return(
               <div>
                     <CommercialSubSidebar  />

                    <section className="main wrapper">
                         <AddCommercialSub />
                    </section>

                    <section className="main wrapper">
                        
                    </section>
               </div>

            
        )
    }
}


export default Commercialsub 