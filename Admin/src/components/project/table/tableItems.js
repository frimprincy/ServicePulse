import React, { Component } from 'react';
import './css/theme.css';
import './table.css'
import { Fbconfig } from './../../../firebase/index';
import firebase from 'firebase'



class TableItems extends Component{

    
    
    constructor(){
        super();

        this.state={
            ServiceProviders:[],
            loading:false,
            uid:"",
            AssignProvider:[]

            
        }

        this.app = Fbconfig
        this.database= this.app.database().ref("Providers");
    }



    componentWillMount(){
            
        this.database.on('value',snapshot=>{
            const Providers=snapshot.val()
            if(Providers!==null){
           const ServiceProvidersList =Object.keys(Providers).map(key=>({
            ...Providers[key],
            uid:(Math.random())
           }));
           this.setState({
            ServiceProviders:ServiceProvidersList,
               loading:true, 
           })

           

        }
       
        })
    //     this.setState({
    //                 Service:100
    //             })



    
    }

    handleDelete =(key)=>{
          
        const ref= firebase.database().ref('Providers')
        ref.orderByChild('password').equalTo(key).on('value',snap=>{
         const DeclinedRequest=snap.val()
         if(DeclinedRequest!==null){
         const DeclinedRequestList =Object.keys(DeclinedRequest).map(key=>({
            ...DeclinedRequest[key],
            uid:(Math.random())
           }));
           
         firebase.database().ref('DeclinedRequest/').push(
            DeclinedRequestList[0]
         ).then(()=>{
             const ref= firebase.database().ref('Providers')
             ref.orderByChild('password').equalTo(key).on('value',snap=>{
                   const Providers=snap.val()
                   if(Providers!==null){
               const id=Object.keys(Providers)[0]
               console.log(id)
            //   firebase.database().ref('Providers').child(id).remove().then(function() {
            //    alert("Provider have been declined!")
            //  }).then(()=>{
       
            //  })
            // .catch((error)=>{
            //     console.log(error)
            // })
           }
             })
         })
 
        }
        })
      }
    
    handleAssign =(key,email,password)=>{
         //create email signIn for Providers
         try{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            }
            catch(error){
               console.log(error)
            }



            
            
       const ref= firebase.database().ref('Providers')
       ref.orderByChild('password').equalTo(key).on('value',snap=>{
        const assignedPro=snap.val()
        if(assignedPro!==null){
        const assignedProList =Object.keys(assignedPro).map(key=>({
            ...assignedPro[key],
            uid:(Math.random())
           }));
        firebase.database().ref('AssignedProviders').push(
            assignedProList[0]
        ).then(()=>{
           

          //delete Provider from Pending List
            const ref= firebase.database().ref('Providers')
            ref.orderByChild('password').equalTo(key).on('value',snap=>{
                  const Providers=snap.val()
                  if(Providers!==null){
              const id=Object.keys(Providers)[0]
              console.log(id)
             firebase.database().ref('Providers').child(id).remove().then(function() {
            
            }).then(()=>{
                alert("Assign Service Provider succeeded!")
            })
           .catch((error)=>{
               console.log(error)
           })
          }
            })
        })

    }
       })
    
     
     }
  render(){ 
    if(this.state.ServiceProviders.length){
        const servicePro=this.state.ServiceProviders
        const ProvidersList =servicePro.map(provider=>{
            const id =provider.password
            
            return(
                <tbody key ={provider.uid}>
                <tr className="tr-shadow">
                   
                <td>{provider.ProvidersService}</td>
                <td>
                    <span >{provider.Lname}  {provider.fname}</span>
                </td>
                <td className="desc">{provider.contact}</td>
                <td>{provider.destination}</td>
                <td>
                    <img src={provider.nationIDPicture} width='67' height='75' alt="picID" />
                </td>
                <td> {provider.Registerdate} </td>
              
                <td>
                <button className="btn btn-primary btn-xs"><i className="fa fa-check" onClick={()=>this.handleAssign(id,provider.email,provider.password)}></i></button>
                <button  className="btn btn-danger btn-xs" onClick={()=>this.handleDelete(id)} ><i className="fa fa-trash-o "></i></button>
               </td>
            </tr>
            <tr className="spacer"></tr>
            </tbody>
            )
        })
    return(
        
        <div className="tableItems ">
        <div className="table-responsive table-responsive-data2">
        <table className="table table-data2">
            <thead className="htdh">
                <tr>
                   
                    <th>Provider Category</th>
                    <th>Provider Name</th>
                    <th>Provider Contact</th>
                    <th>Location</th>
                    <th>SNN picture</th>
                    <th>date</th>
                    <th>Action</th>
                </tr>
            </thead>
              
           {ProvidersList}
               
            
        </table>
    
    </div>
        
        </div>
    
    )
}else{
    return(
        <div style={{flex:1,justifyContent:"center",alignItems:"center",fontSize:20,marginTop:50}}>
          Loading ...
        </div>
    )
}

  }

}

export default TableItems;
