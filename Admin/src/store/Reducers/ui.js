
import { uiStopLoading,uiStartLoading,setServices } from './../actions/ActionTypes';

const initialState={
    isLoading:false
}

const UiReducer=(state=initialState,action)=>{
 
    switch(action.type){
       case uiStartLoading:
       return{
           ...state,
           isLoading:true
       };
      case uiStopLoading:
      return{
        ...state,
        isLoading:false
    };

    case setServices:

   return{
       ...state,
     Services:action.serviceData
   }

    default:
      return state;
    }


}

export default UiReducer