import React,{Component} from 'react';
import './productCSS/cards.css';
import firebase from 'firebase'

class Cards extends Component{
 
     state={
      ProvidersData:[],
      providersDeniedData:[],
      providers:[],
      usersData:[]

     }

     componentDidMount() {

      //Request Proccessed Report
       const ref=firebase.database().ref('AssignedProviders')
       ref.on("value",snapshot=>{
        const providers=snapshot.val()
        if(providers!==null){
       const ProvidersDataList =Object.keys(providers).map(key=>({
        ...providers[key],
        uid:(Math.random())
       }));
       this.setState({
           
        ProvidersData:ProvidersDataList,
           loading:true
       })
    }
       })






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
         



        //Request Denied Report
        const reference=firebase.database().ref('DeclinedRequest')
        reference.on("value",snapshot=>{
         const providersDenied=snapshot.val()
         if(providersDenied!==null){
        const providersDeniedDataList =Object.keys(providersDenied).map(key=>({
         ...providersDenied[key],
         uid:(Math.random())
        }));
        this.setState({
            
          providersDeniedData:providersDeniedDataList,
            loading:true
        })
     }
        })


        //total customers

        const refCus=firebase.database().ref('users')
        refCus.on("value",snapshot=>{
         const users=snapshot.val()
         if(users!==null){
        const usersDataList =Object.keys(users).map(key=>({
         ...users[key],
         uid:(Math.random())
        }));
        this.setState({
            
          usersData:usersDataList,
            loading:true
        })
     }
        })
     }
     

 render(){
    return(
     <div className="row">
      <div className="col-lg-3 col-xs-6">
        <div className="statistic__item">
           <h2 className="number1">{this.state.ProvidersData.length}</h2>
           <span className="desc">Request Processed</span>
          <div className="icon">
            <i className="zmdi zmdi-account-o"></i>
         </div>
       </div>
      </div>
      <div className="col-lg-3 col-xs-6">
        <div className="statistic__item">
           <h2 className="number2">{this.state.providers.length}</h2>
           <span className="desc">Request Pending</span>
         <div className="icon">
            <i className="zmdi zmdi-account-o"></i>
         </div>
       </div>
      </div>
      <div className="col-lg-3 col-xs-6">
      <div className="statistic__item">
         <h2 className="number3">{this.state.providersDeniedData.length}</h2>
         <span className="desc">Request Cancelled</span>
       <div className="icon">
          <i className="zmdi zmdi-account-o"></i>
       </div>
     </div>
    </div>
    <div className="col-lg-3 col-xs-6">
    <div className="statistic__item">
       <h2 className="number4">{this.state.usersData.length}</h2>
       <span className="desc">Total Customers</span>
     <div className="icon">
        <i className="zmdi zmdi-account-o"></i>
     </div>
   </div>
  </div>
  </div>
    

                           
    )
  }
}


export default Cards;