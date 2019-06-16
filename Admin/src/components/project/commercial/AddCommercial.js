import React,{ Component } from 'react';
import { createCommercial } from './../../../store/actions/ProjectActions';
import { connect } from 'react-redux';




class AddCommercial extends Component{

    state={
        picture:null,
        pictureUrl:null,
        show:"none",
        AreaName:"",
        AreaID:"",
        imageFile:null
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
          this.props.createCommercial(this.state.AreaName,this.state.AreaID,this.state.imageFile.value)
          this.setState({
            AreaName:"",
            AreaID:""
    
          })
      }
    render(){
                 
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
                                          id="AreaName"
                                          value={this.state.AreaName}
                                          placeholder="Commecial Area Name" 
                                          onChange={this.TextHandler}
                                          required
                                        />
                                    </div>
                                   <div className="col">
                                       <input type="text"
                                        className="form-control"
                                         id="AreaID"
                                         value={this.state.AreaID}
                                         placeholder="Commercial Area ID" 
                                         onChange={this.TextHandler}
                                         required 
                                         />
                                    </div>
                                </div>

                                <div className="form-row spaceTop" >
                                  
                                    <div className="col">
                                   
                                    <div className="form-group" style={{marginTop:2,width:230,marginLeft:5}}> 
                                        <input 
                                           type="file"
                                           className="form-control-file"
                                           id="exampleFormControlFile1" 
                                           onChange={(event)=>{this.disPlayPictureHandler(event)}}
                                          required
                                        />
                                     </div>
                                     </div>
                                </div>

                                <div className=" left">
                                    <button type="submit" className="btn btn-primary bt">Save details </button>
                                     
                                </div>
                            </form>
                       </div>
                 </div>
               </div>
        
            </div>

    
            
          
        )
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        createCommercial:(AreaName,AreaID,AreaImage)=>dispatch(createCommercial(AreaName,AreaID,AreaImage))
       
    }
 }



export default connect(null ,mapDispatchToProps) (AddCommercial)