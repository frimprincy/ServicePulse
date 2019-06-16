
import { setServices,setServiceSub,setCommercial } from './../Actions/actionTypes';


initState={
    services:[],
    subServices:[],
    commercialAreas:[]
}


const ProjectReducer =(state=initState,action)=>{
    switch(action.type){
         case setServices:
         return{
            ...state,
               services:action.Services
         }
        case setServiceSub:
             return{
                 ...state,
                 subServices:action.subServices
             }
        case setCommercial:
             return{
                 ...state,
                 commercialAreas:action.commercial
             }
         default:
        return state;
      }
}
export default ProjectReducer