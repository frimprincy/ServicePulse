
import { Fbconfig } from './../../firebase/firebase';

import { setServices,setServiceSub,setCommercial } from './actionTypes';


export const getServices =()=>{
         return dispatch=>{
            this.app = Fbconfig
            this.database= this.app.database().ref("Services");
            this.database.on('value',snapshot=>{
                const serviceObject=snapshot.val()
                if(serviceObject!==null){
               const serviceList =Object.keys(serviceObject).map(key=>({
                ...serviceObject[key],
                uid:key
               }));
              dispatch(setServices(serviceList))
            }
            })
            
              
            }
         }

 export const getSubServices=()=>{
  return dispatch=>{
    this.app = Fbconfig
    this.database= this.app.database().ref("SubServices");
    this.database.on('value',snapshot=>{
        const subServiceObject=snapshot.val()
        if( subServiceObject!==null){
       const subServiceList =Object.keys(subServiceObject).map(key=>({
        ...subServiceObject[key],
        uid:key
       }));
      dispatch(setServiceSub(subServiceList))
    }
    })
    
      
    }
 }        


 export const getCommercial=()=>{
  return dispatch=>{
    this.app = Fbconfig
    this.database= this.app.database().ref("CommercialArea");
    this.database.on('value',snapshot=>{
        const commercialObject=snapshot.val()
        if( commercialObject!==null){
       const commercialList =Object.keys(commercialObject).map(key=>({
        ...commercialObject[key],
        uid:key
       }));
      dispatch(setCommercial(commercialList))
    }
    })
    
      
    }
 }   