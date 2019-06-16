import React,{Component} from 'react';
import './../../layout/Layout.css'
import firebase from 'firebase'


class BookingNav extends Component{
 
  handleLogout=()=>{
      firebase.auth().signOut()
  }


  render(){
    return(
        <div className=".NavCon">
        <nav className="nav-extended blue-grey lighten-1 navCom ">
        <div className="nav-wrapper ">
        
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li style={{marginRight:60,marginTop:-10}}><button onClick={this.handleLogout} class='btn btn-primary btn-lg'>Logout</button></li>
        </ul>
      </div>
      <div className="nav-content nav-tabs">
      
      </div>
        </nav>
      </div>

       
        

    )
  }
}

export default BookingNav;