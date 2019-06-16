export const setServices=(Services)=>{

    return{
    type:setServices,
    Services:Services
    }
}



 export const setServiceSub=(subServices)=>{
    return{
     type:setServiceSub,
     subServices:subServices
    }
   
}


export const setCommercial=(commercial)=>{
    return{
     type:setCommercial,
     commercial:commercial
    }
   
}