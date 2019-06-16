import React, { Component } from 'react';
import './App.css';
import IndexPage from './components/project/index';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Bookings from './components/project/bookings/Bookings';
import Customers from './components/project/customers/customer';
import Services from './components/project/services/services';
import ServiceSub from './components/project/serviceSub/serviceSub';
import Commercial from './components/project/commercial/commercial';
import Commercialsub from './components/commercialAreaSub/commercialSub';
import Providers from './components/project/providers/providers';
import MapPage from './components/project/map/map';
import firebase from 'firebase'
import SignIn from './components/Auth/login';

class App extends Component {

  constructor(props){
    super(props)

    this.state={
      user:{}
    }
  }

  componentDidMount() {
    this.authListner()
  }
  

  authListner=()=>{
   firebase.auth().onAuthStateChanged((user)=>{
     if(user){
       this.setState({
          user
       })
     }else{
       this.setState({user:null})
     }
   })
  } 
  
  render() {
    return (

      
      <BrowserRouter>
        <div className="App">
        {this.state.user?(<Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/map" component={MapPage} />
          <Route path="/bookings"  component={Bookings} />
          <Route path="/customers"  component={Customers} />
          <Route path="/providers"  component={Providers} />
          <Route path="/services"  component={Services} />
          <Route path="/serviceSub" component={ServiceSub} />
          <Route path="/commercial" component={Commercial} />
          <Route path="/commercialSub" component={Commercialsub} />
        </Switch>):(<SignIn />)}
        
           
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
