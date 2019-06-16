import React,{Component} from "react";
import { connect } from 'react-redux';
import { createSubCommercial } from "../../store/actions/ProjectActions";
import { Fbconfig } from './../../firebase/index';




class AddCommercialSub extends Component{
     
      state={
        picture:null,
        pictureUrl:null,
        show:"none",
        AreaSubName:"",
        AreaSubID:"",
        SubLocation:"",
        AreaName:"",
        imageFile:null,
        commercialArea:[]
      }


      componentDidMount(){
        this.app = Fbconfig
        this.database= this.app.database().ref("CommercialArea");
        this.database.on('value',snapshot=>{
            const CommercialObject=snapshot.val()
            if(CommercialObject!==null){
           const CommercialList =Object.keys(CommercialObject).map(key=>({
            ...CommercialObject[key],
            uid:(Math.random())
           }));
           this.setState({
               
            commercialArea:CommercialList,
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
    handleClick=(e)=>{
      e.preventDefault();
      this.setState({
          show:""
      })
    }

    handleClose=(e)=>{
        e.preventDefault();
        this.setState({
            show:"none"
        })
      }
      TextHandler=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    Handlersubmit=(e)=>{
        e.preventDefault();
        console.log(this.state)
       this.props.createSubArea(this.state.AreaSubName,this.state.AreaSubID,this.state.SubLocation,this.state.AreaName,this.state.imageFile.value)
        this.setState({
            AreaSubName:"",
            AreaSubID:"",
            SubLocation:"",
            imageFile:null,
            picture:null,
            pictureUrl:null,
        })
    }
    render(){
               if(this.state.commercialArea.length){

                const commercial=this.state.commercialArea

                const commercialList=commercial.map(comArea=>{
                        return(
                            <option style={{marginTop:5,fontSize:12}} id="AreaName"  required>{comArea.AreaName}</option>
                        )
                })
      
              let submitBottom=(
                <button type="submit" className="btn btn-primary bt">Save details </button>
               )
             if(this.props.isLoading){
                 submitBottom=<div>Loading ...</div>
             }
        return(

            <div>
           
            
            <button type="submit" className="btn btn-primary right" data-target="#exampleModal" onClick={this.handleClick}  >
                 <i className="fa fa-plus"></i>
                     Add Commercial Area
             </button>
              
              <div style={{display:this.state.show}}  className="modal-dialog" aria-hidden="true">
               <div className="modal-content">
                     <div className="modal-header">
                             <h5 className="modal-title" id="exampleModalLabel">Add Commercial Area</h5>
                          <button type="submit" className="close" data-dismiss="modal-dialog" aria-label="Close" onClick={this.handleClose}>
                              <span aria-hidden="true" >&times;</span>
                           </button>
                      </div>
                     <div className="modal-body">
                         <form className="mb-5" onSubmit={this.Handlersubmit}>
                             <div className="form-row spaceTop">
                                 <div className="col">
                                      <input type="text" 
                                       className="form-control" 
                                        id="AreaSubName"
                                        value={this.state.AreaSubName}
                                        placeholder="CommecialSub Area Name" 
                                        onChange={this.TextHandler}
                                        required
                                      />
                                  </div>
                                 <div className="col">
                                     <input type="text"
                                      className="form-control"
                                       id="AreaSubID"
                                       value={this.state.AreaSubID}
                                       placeholder="CommercialSub Area ID" 
                                       onChange={this.TextHandler}
                                       required 
                                       />
                                  </div>
                              </div>

                              <div className="form-row spaceTop" >
                                 <div className="col">
                                    <input type="text" 
                                      className="form-control" 
                                     id="SubLocation"
                                     value={this.state.SubLocation}
                                     placeholder="CommecialSub Location" 
                                     onChange={this.TextHandler}
                                      required
                                    />
                                 </div>
                                 <div className="col">
                                   <select style={{marginTop:15,marginBottom:20}} className="browser-default custom-select" id="AreaName"  onChange={this.TextHandler} >
                                      <option style={{marginTop:5,fontSize:12}} > select service Category</option>
                                          {commercialList}
                                     </select>
                                  </div>
                              </div>

                                  
                              <div className="form-row spaceTop" >
                              <label  style={{marginTop:5,fontSize:12}} htmlFor="">Choose Area Image</label>
                              <div className="col">
                                 
                                    <div className="form-group" style={{marginTop:2,width:230,marginLeft:5}}> 
                                     <input 
                                         type="file"
                                          className="form-control-file"
                                          id="Image1"
                                    
                                          onChange={(event)=>{this.disPlayPictureHandler(event)}}
                                          required
                                        />
                                    </div>
                                 </div>
                               
                                   
                                 
                              </div>

                              <div className=" left">
                                 
                                   {submitBottom}
                              </div>
                          </form>
                     </div>
               </div>
             </div>
      
          </div>
        )
    }else{
        return(
            <div style={{fontSize:20,marginTop:50}}>
            Loading ....
            </div>
        )
    }
    }
}



const mapDispatchToProps=(dispatch)=>{
    return{
       createSubArea:(AreaSubName,AreaSubID,AreaSubLocation,AreaName,AreaSubImage)=>dispatch(createSubCommercial(AreaSubName,AreaSubID,AreaSubLocation,AreaName,AreaSubImage))
       
    }
 }

const mapStateToProps=(state)=>{
    return{
        isLoading:state.ui.isLoading,
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (AddCommercialSub)