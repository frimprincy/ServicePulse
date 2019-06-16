import React,{ Component } from 'react';
import "./../services/Services.css";
import { Fbconfig } from './../../../firebase/index';
import firebase from 'firebase'

class CommercialAreaTable extends Component{


    
    constructor(){
        super();

        this.state={
            CommercialArea:[],
            loading:false
            
        }

        this.app = Fbconfig
        this.database= this.app.database().ref("CommercialArea");
    }



    componentWillMount(){
            
        this.database.on('value',snapshot=>{
            const serviceObject=snapshot.val()
            if(serviceObject!==null){
           const AreaList =Object.keys(serviceObject).map(key=>({
            ...serviceObject[key],
            uid:(Math.random())
           }));
           this.setState({
               
            CommercialArea:AreaList,
               loading:true
           })
        }
        })
    //     this.setState({
    //                 Service:100
    //             })
    }


    
handleDelete=(key)=>{
   
    const ref= firebase.database().ref('CommercialArea')
    ref.orderByChild('AreaID').equalTo(key).on('value',snap=>{
          const commercialArea=snap.val()
          if(commercialArea!==null){
      const id=Object.keys(commercialArea)[0]
      console.log(id)
     firebase.database().ref('CommercialArea').child(id).remove().then(function() {
      
    }).then(()=>{
        alert("Commercial Area deleted successfully!")
    })
   .catch((error)=>{
       console.log(error)
   })
  }
    })
  }
   
   
    render(){


        if(this.state.CommercialArea.length && this.state.CommercialArea!==undefined && this.state.CommercialArea!==null){
            const commercial=this.state.CommercialArea
            
             const AreaList=commercial.map(comArea=>{
                 const pictureUrl=comArea.AreaImage
                 const id =comArea.AreaID
                 return(
                     <tbody key={comArea.uid}>
                     <tr>
                      <td>{comArea.AreaID}</td>
                      <td>{comArea.AreaName}</td> 
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
            <thead className="tdCom">
                <tr>
                    <th>Commercial Area ID</th>
                    <th>Commercial Area Name</th>
                     <th>Commercial Area Picture </th>
                     <th>Actions </th>
                     
                 </tr>
            </thead>

               {AreaList}
             
         </table>
                
    
            
          
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


export default CommercialAreaTable