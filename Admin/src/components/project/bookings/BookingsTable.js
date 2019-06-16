import React, { Component } from 'react';
import './../table/table.css';
import './book.css';

class BookTable extends Component{
  render(){
    return(
        <div className="tableItems">
      
        <div class="table-responsive m-b-40">
                                    <table class="table table-borderless table-data3">
                                        <thead>
                                        <tr>
                                        <th><i className="fa fa-bullhorn"></i> BookingID</th>
                                        <th className="hidden-phone"><i className="fa fa-question-circle"></i>Service Details</th>
                                        <th><i className="fa fa-bookmark"></i>Customer Name</th>
                                        <th><i className=" fa fa-edit"></i>Customer Number</th>
                                        <th><i className=" fa fa-edit"></i>Customer Location</th>
                                        <th><i className=" fa fa-edit"></i>Booking Date/Time</th>
                                        <th><i className=" fa fa-edit"></i>Provider Name</th>
                                        <th><i className=" fa fa-edit"></i>Provider Number</th>
                                        <th><i className=" fa fa-edit"></i>Provider Category</th>
                                        <th><i className=" fa fa-edit"></i>Status</th>
                                        <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>2018-09-29 05:57</td>
                                                <td>Mobile</td>
                                                <td>iPhone X 64Gb Grey</td>
                                                <td className="process">Processed</td>
                                                <td>$999.00</td>
                                                <td>iPhone X 64Gb Grey</td>
                                                <td className="process">Processed</td>
                                                <td>$999.00</td>
                                                <td className="process">Processed</td>
                                                <td>$999.00</td>
                                                <td>
                
                                                 <button className="btn btnW btn-primary btn-xs"><i className="fa fa-pencil"></i></button>
                                                 <button className="btn btn-danger btn-xs"><i className="fa fa-trash-o "></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td>2018-09-29 05:57</td>
                                            <td>Mobile</td>
                                            <td>iPhone X 64Gb Grey</td>
                                            <td class="process">Processed</td>
                                            <td>$999.00</td>
                                            <td>iPhone X 64Gb Grey</td>
                                            <td class="process">Processed</td>
                                            <td>$999.00</td>
                                            <td class="process">Processed</td>
                                            <td>$999.00</td>
                                            <td>
            
                                             <button className="btn btnW btn-primary btn-xs"><i className="fa fa-pencil"></i></button>
                                             <button className="btn btn-danger btn-xs"><i className="fa fa-trash-o "></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>2018-09-29 05:57</td>
                                        <td>Mobile</td>
                                        <td>iPhone X 64Gb Grey</td>
                                        <td class="process">Processed</td>
                                        <td>$999.00</td>
                                        <td>iPhone X 64Gb Grey</td>
                                        <td class="process">Processed</td>
                                        <td>$999.00</td>
                                        <td class="process">Processed</td>
                                        <td>$999.00</td>
                                        <td>
        
                                         <button className="btn btnW btn-primary btn-xs"><i className="fa fa-pencil"></i></button>
                                         <button className="btn btn-danger btn-xs"><i className="fa fa-trash-o "></i></button>
                                        </td>
                                    </tr>
                                           
                                        </tbody>
                                    </table>
                                </div>


        
        </div>
    )

  }

}

export default BookTable;
