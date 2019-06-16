import React, { Component } from 'react';
import "./Services.css";
import {connect} from "react-redux"

import { createServices} from './../../../store/actions/ProjectActions';










class AddServices extends Component{
   
    state={
       picture:null,
       pictureUrl:null,
     
           ServiceName:"",
           ServiceID:"",
           imageFile:{
               value:null,
               valid:false,
              
           }
     
      
       
    }


   
    

    disPlayPictureHandler =(event)=>{
        let reader =new FileReader()
        let file = event.target.files[0]
        reader.onloadend =()=>{
            this.setState(prevState=>{
             return{
                
                picture:file,
                pictureUrl:reader.result,
                
                
                    imageFile:{
                        value:file,
                        valid:true,
                        
                    }
                    
            
               
             } 
            });
        };

       
        reader.readAsDataURL(file)
    }
    

    TextHandler= (e) =>{  
       this.setState({
        [e.target.id]:e.target.value
       })
           
      
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        console.log(this.state.imageFile.value)
        this.props.createServices(this.state.ServiceName,this.state.ServiceID,this.state.imageFile.value)
       
        this.setState({
            pictureUrl:null,
            file:null,
            ServiceName:"",
            ServiceID:""
        })
    }

    render(){
             let submitBottom=(
                <button type="submit" className="btn btn-success btn-lg" >Add Service</button>
             )
           if(this.props.isLoading){
               submitBottom=<div>Loading ...</div>
           }
        return(
            <div className="container formContainer">
               
                
                   <form onSubmit={this.handleSubmit}>
                      
                   <div className="input-field LableStyle">
                      <input id="ServiceName" type="text" value={this.state.ServiceName}   className="validate" onChange={this.TextHandler} />
                     <label htmlFor="ServiceName" >Service Name</label>
                    </div>
                        
                   <div className="input-field LableStyle">
                   <input id="ServiceID" type="text" value={this.state.ServiceID}   className="validate" onChange={this.TextHandler} />
                  <label htmlFor="ServiceID" >Service ID</label>
                 </div>
                     <div className="card">

                     
                       <div className="card-image">
                         <img src={this.state.pictureUrl} alt="Add_service_Image" className="imageStyles"   required/>
                       </div>
                      
                      
                     </div>
                     <div className="Addfile file-field">
                          <span className="btn-floating peach-gradient ">
                          <i className="fa fa-paperclip"></i>
                          <input type="file" onChange={(event)=>{this.disPlayPictureHandler(event)}} required/>
                           </span>
                     </div>
                       
                     <div  className="Addfile" >
                         {submitBottom}
                     </div>

                   </form>
               
                    
            </div>
        )
    }
}

 const mapStateToProps=(state)=>{
     return{
         isLoading:state.ui.isLoading,
        
     }
 }

const mapDispatchToProps=(dispatch)=>{
    return{
       createServices:(serviceName,ServiceID,image)=>dispatch(createServices(serviceName,ServiceID,image)),
      
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (AddServices);