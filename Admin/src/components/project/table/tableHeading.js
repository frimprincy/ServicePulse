import React,{Component} from 'react';
import './table.css'
import firebase from 'firebase'
class TableHeading extends Component{

    state={
        providers:[]
    }

    componentDidMount() {
          //Request Pending Report
          const refPending=firebase.database().ref('Providers')
          refPending.on("value",snapshot=>{
           const providersData=snapshot.val()
           if(providersData!==null){
          const providersList =Object.keys(providersData).map(key=>({
           ...providersData[key],
           uid:(Math.random())
          }));
          this.setState({
              
            providers:providersList,
              loading:true
          })
       }else{
         
       }
          })
    }
    
    render(){
    return(
        <div className="">

        <div className="topnav" id="myTopnav">
          <a href="#home" className="active">Service Requests({this.state.providers.length})</a>
       
        </div>
        
        </div>
    )
}
}

export default TableHeading;