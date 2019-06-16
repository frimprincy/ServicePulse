import React,{Component} from 'react';
import './../table/css/demo_page.css';
import './../table/css/demo_table.css';
import './../table/css/demo_table_jui.css';
import { Fbconfig } from './../../../firebase/index';
import firebase from 'firebase'
const nodemailer = require("nodemailer");
const xoauth2=require("xoauth2")

class ProvidersTable extends Component{

    
  constructor(){
    super();

    this.state={
        ProvidersData:[],
        loading:false
        
    }

    this.app = Fbconfig
    this.database= this.app.database().ref("AssignedProviders");
}



componentWillMount(){
        
    this.database.on('value',snapshot=>{
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
//     this.setState({
//                 Service:100
//             })
}


handleDelete=(key)=>{
   
    const ref= firebase.database().ref('AssignedProviders')
    ref.orderByChild('password').equalTo(key).on('value',snap=>{
          const providers=snap.val()
          if(providers!==null){
      const id=Object.keys(providers)[0]
      console.log(id)
     firebase.database().ref('AssignedProviders').child(id).remove().then(function() {
      alert("Provider deleted successfully!")
    }).then(()=>{
  
    })
   .catch((error)=>{
       console.log(error)
   })
  }
    })
  }


  handleEmail=async ()=>{
    
    var transporter = nodemailer.createTransport({
    
      service:'gmail',
    
      auth: {
        xoauth2:xoauth2.createXOAuth2Generator({
          user: 'smartpulseapp@gmail.com',
          clientId:'783676123973-htdsgpdniaslg51ae36ekrk7nt5odcal.apps.googleusercontent.com',
          clientSecret:'yFBsvAxCq8OltZiWDxlS6IT7',
          refreshToken:'1/6RS-jOgQDLWnpKD5_FQf44ke76d5Gl8Kf_jC_3PkFvA'
        })
        
      }
    });
    
    var mailOptions = {
      from: 'smartpulseapp@gmail.com',
      to: 'frimprincy@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        alert('Email sent: ' + info.response);
      }
    });
  }
    render(){
      if(this.state.ProvidersData.length){
        const providerData=this.state.ProvidersData
        const ProvidersList =providerData.map(provider=>{
            const id =provider.password
            return(
              <tbody key={provider.uid}>
              <tr className="gradeA">
                <td>{provider.Lname}    {provider.fname}</td>
                <td>{provider.email}</td>
                <td className="hidden-phone">{provider.contact}</td>
                <td className="hidden-phone">{provider.destination}</td>
                <td className="hidden-phone">{provider.Registerdate}</td>
                <td className="hidden-phone">{provider.password}</td>
                <td>
                <img src={provider.nationIDPicture} width='170' height='100' alt="picID" />
               </td>
                <td>
            
                <button className="btn btn-primary btn-xs" onClick={()=>this.handleEmail()}><i className="fa fa-pencil"></i></button>
                <button className="btn btn-danger btn-xs" onClick={()=>this.handleDelete(id)}><i className="fa fa-trash-o "></i></button>
               </td>
              </tr>
             
              
            </tbody>
            )
        })
        return(
        <div className='tabledata'>
          <div className="content-panel">    
            <div className="adv-table">
              <table    className="display table table-bordered" id="hidden-table-info">
                <thead>
                  <tr>
                    <th className="hidden-phone"> Name</th>
                    <th className="hidden-phone"> Email</th>
                    <th className="hidden-phone"> Contact</th>
                    <th className="hidden-phone"> Location</th>
                    <th className="hidden-phone">Registered Date</th>
                    <th className="hidden-phone">password</th>
                    <th className="hidden-phone">SNN ID</th>
                    <th className="hidden-phone">Actions</th>
                  </tr>
                </thead>
                {ProvidersList}
              </table>
            </div>
          </div>
                
                
        </div>
        )
      }else{
        return(
          <div style={{flex:1,justifyContent:"center",alignItems:"center",fontSize:20,marginTop:300}}>
             Loading .....
          </div>
        )
      }
    }
}

export default ProvidersTable;
