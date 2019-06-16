import React,{Component} from 'react';
import './../table/css/demo_page.css';
import './../table/css/demo_table.css';
import './../table/css/demo_table_jui.css';
import { Fbconfig } from './../../../firebase/index';
import firebase from 'firebase'
class CustomerTable extends Component{

    
  constructor(){
    super();

    this.state={
        customersData:[],
        loading:false
        
    }

    this.app = Fbconfig
    this.database= this.app.database().ref("users");
}



componentWillMount(){
        
    this.database.on('value',snapshot=>{
        const customers=snapshot.val()
        if(customers!==null){
       const customersDataList =Object.keys(customers).map(key=>({
        ...customers[key],
        uid:(Math.random())
       }));
       this.setState({
           
        customersData:customersDataList,
           loading:true
       })
    }
    })
//     this.setState({
//                 Service:100
//             })
}


handleDelete=(key)=>{
   
  const ref= firebase.database().ref('users')
  ref.orderByChild('gmail').equalTo(key).on('value',snap=>{
        const users=snap.val()
        if(users!==null){
    const id=Object.keys(users)[0]
    console.log(id)
   firebase.database().ref('users').child(id).remove().then(function() {
    alert("Customer deleted successfully!")
  }).then(()=>{

  })
 .catch((error)=>{
     console.log(error)
 })
}
  })
}
    render(){
      if(this.state.customersData.length){
        const UsersData=this.state.customersData
        const ProvidersList =UsersData.map(users=>{
          const id =users.gmail
            return(
              <tbody>
              <tr className="gradeC">
                <td>{users.first_name}</td>
                <td>{users.last_name}</td>
                <td className="hidden-phone">{users.gmail}</td>
                <td>
            
                <button className="btn btn-primary btn-xs"><i className="fa fa-pencil"></i></button>
                <button className="btn btn-danger btn-xs" onClick={()=>this.handleDelete(id)} ><i className="fa fa-trash-o "></i></button>
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
                    <th className="hidden-phone">Customer firstName</th>
                    <th className="hidden-phone">Customer LastName</th>
                    <th className="hidden-phone">customer Email</th>
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

export default CustomerTable;
