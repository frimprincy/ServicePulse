import React,{Component} from 'react';
import './Layout.css'
import firebase from 'firebase'


class TopNabar extends Component{
 
  handleLogout=()=>{
      firebase.auth().signOut()
  }


  render(){
    return(
        <div className=".NavCon">
        <nav className="nav-extended blue-grey lighten-1 navCom ">
        <div className="nav-wrapper ">
        
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li style={{marginRight:60}}><button onClick={this.handleLogout} class='btn btn-primary btn-lg'>Logout</button></li>
        </ul>
      </div>
      <div className="nav-content nav-tabs">
        <ul className="tabs tabs-transparent navComponents">
          <li className="tab "><a className="active " href="#test1">dashboard</a></li>
          <li className="tab"><a  href="/map">MAP</a></li>
        </ul>
      </div>
        </nav>
      </div>

       
        

    )
  }
}

export default TopNabar;