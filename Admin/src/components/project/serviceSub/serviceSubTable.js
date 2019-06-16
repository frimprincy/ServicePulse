import React,{ Component } from 'react';
import "./../services/Services.css";
import { Fbconfig } from './../../../../src/firebase/index';
import firebase from 'firebase'

class ServiceSubTable extends Component{


    constructor(){
        super();

        this.state={
            SubServices:[],
            loading:false
            
        }

        this.app = Fbconfig
        this.database= this.app.database().ref("SubServices");
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
               
            SubServices:serviceList,
               loading:true
           })
        }
        })
    //     this.setState({
    //                 Service:100
    //             })
    }


    handleDelete=(key)=>{
   
        const ref= firebase.database().ref('SubServices')
        ref.orderByChild('subServiceID').equalTo(key).on('value',snap=>{
              const subService=snap.val()
              if(subService!==null){
          const id=Object.keys(subService)[0]
          console.log(id)
         firebase.database().ref('SubServices').child(id).remove().then(function() {
          
        }).then(()=>{
            alert("SubService deleted successfully!")
        })
       .catch((error)=>{
           console.log(error)
       })
      }
        })
      }
   
    render(){


        if(this.state.SubServices.length && this.state.SubServices!==undefined && this.state.SubServices!==null){
            const Subservices=this.state.SubServices
            
             const serviceList=Subservices.map(Subservice=>{
                 const pictureUrl=Subservice.subImage
                 const id =Subservice.subServiceID
                 return(
                     <tbody key={Subservice.uid}>
                     <tr>
                      <td>{Subservice.subServiceID}</td>
                      <td>{Subservice.subServiceName}</td> 
                      <td>{Subservice.ServiceName}</td> 
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
           
                
         
        <table>
            <thead className="tdSub">
                <tr>
                    <th>ServiceSub ID</th>
                    <th>ServiceSub Name</th>
                     <th>Service Name </th>
                     <th>ServiceSub Picture </th>
                     <th>Actions </th>
                 </tr>
            </thead>

           
                {serviceList}
                
            
             
         </table>
                
    
            
          
        )
    }else{
        return(
            <div>
            Loading data ....
            </div>
        )
    }
    }

}


export default ServiceSubTable