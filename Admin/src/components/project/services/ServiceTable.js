import React,{ Component } from 'react';
import "./Services.css";
import { Fbconfig } from './../../../../src/firebase/index';
import firebase from 'firebase'







class ServiceTable extends Component{

    constructor(){
        super();

        this.state={
            Service:[],
            loading:false
            
        }

        this.app = Fbconfig
        this.database= this.app.database().ref("Services");
    }
    
        componentWillMount(){
            
            this.database.on('value',snapshot=>{
                const serviceObject=snapshot.val()
                if(serviceObject!==null){
               const serviceList =Object.keys(serviceObject).map(key=>({
                ...serviceObject[key],
                uid:(Math.random())
               }));
               this.setState({
                   
                   Service:serviceList,
                   loading:true
               })
            }
            })
        //     this.setState({
        //                 Service:100
        //             })
        }

   
handleDelete=(key)=>{
   
    const ref= firebase.database().ref('Services')
    ref.orderByChild('ServiceID').equalTo(key).on('value',snap=>{
          const Service=snap.val()
          if(Service!==null){
      const id=Object.keys(Service)[0]
      console.log(id)
     firebase.database().ref('Services').child(id).remove().then(function() {
      
    }).then(()=>{
        alert("Service deleted successfully!")
    })
   .catch((error)=>{
       console.log(error)
   })
  }
    })
  }
       
    render(){
       if(this.state.Service.length && this.state.Service!==undefined && this.state.Service!==null){
           const services=this.state.Service
           
            const serviceList=services.map(service=>{
                const pictureUrl=service.image
                const id =service.ServiceID
                return(
                    <tbody key={service.uid}>
                    <tr>
                     <td>{service.ServiceID}</td>
                     <td>{service.names}</td> 
                      <td><img src={pictureUrl} className="tablepic" alt="" /></td>
                      <td>
                      
                      <button className="btn btn-primary btn-xs"><i className="fa fa-pencil"></i></button>
                      <button className="btn btn-danger btn-xs" onClick={()=>this.handleDelete(id)}><i className="fa fa-trash-o "></i></button>
                     </td>
                    </tr>
                </tbody>
                )
            })
        
        return(
           <div>
              
            <div>
              <table>
                 <thead className="tdh">
                     <tr>
                         <th>Service ID</th>
                         <th>Service Name</th>
                          <th>Service Picture </th>
                          <th>Actions </th>
                      </tr>
                 </thead>
                  {serviceList}
              </table>
             </div>
           </div>
        )
}else{
    return(
        <div className="LoadingData">
         {this.state.loading}
           <div>Loading Data  .......</div>
           <div>Please wait </div>
        </div>
    )
}

   
    }

   



}

export default ServiceTable