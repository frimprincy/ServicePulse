import React,{Component} from "react";
import { createSubServices } from './../../../store/actions/ProjectActions';
import { connect } from 'react-redux';
import { Fbconfig } from './../../../../src/firebase/index';


class Addsub extends Component{

    state={
        picture:null,
        pictureUrl:null,
        SubName:"",
        SubID:"",
        imageFile:null,
        ServiceName:"",
        Service:[]

     }
 
 
    componentDidMount(){
        this.app = Fbconfig
        this.database= this.app.database().ref("Services");
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


     TextHandler= (e )=>{
        
        
       this.setState({
          [e.target.id]:e.target.value
       })
    }


    handleSubmit=(e)=>{
        console.log(this.state)
        e.preventDefault()
        this.props.createSub(this.state.SubName,this.state.SubID,this.state.ServiceName,this.state.imageFile.value);
          
        this.setState({
            picture:null,
            pictureUrl:null,
            SubName:"",
            imageFile:null,
            ServiceName:"",
            SubID:""
        })
    }

   
    render(){
        if(this.state.Service.length && this.state.Service!==undefined && this.state.Service!==null){
            const services=this.state.Service

          const serviceList=services.map(service=>{
                  return(
                    <option>{service.names}</option>
                  )
          })

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
                      <input 
                      id="SubName"
                       type="text" 
                       onChange={this.TextHandler} 
                       value={this.state.SubName}
                       required
                    />
                     <label htmlFor="SubName" >subService Name</label>
                    </div>

                    <div className="input-field LableStyle">
                      <input 
                      id="SubID"
                       type="text" 
                       onChange={this.TextHandler} 
                       value={this.state.SubID}
                       required
                    />
                     <label htmlFor="SubID" >subService ID</label>
                    </div>

                    <select style={{marginTop:15,marginBottom:20}} class="browser-default custom-select" id="ServiceName"  onChange={this.TextHandler} >
                        <option selected> select service Category</option>
                           {serviceList}
                       
                    </select>
                     <div className="card">

                     
                       <div className="card-image">
                         <img src={this.state.pictureUrl} alt="Add_service_Image" className="imageStyles"    required/>
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
    }else{
        return(
            <div></div>
        )

        
    }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
       createSub:(subServiceName,subServiceID, ServiceName,subImage)=>dispatch(createSubServices(subServiceName,subServiceID, ServiceName,subImage))
       
    }
 }

const mapStateToProps=(state)=>{
    return{
        isLoading:state.ui.isLoading,
       
    }
}



export default connect(mapStateToProps,mapDispatchToProps) (Addsub)