

export const createServiceData=(service)=>{
    return{
        type:createServiceData,
        value:service
    }
};


export const createSubService=(subService)=>{
    return{
        type:createSubService,
        value:subService
    }
};

export const uiStartLoading =()=>{
    return{
        type:uiStartLoading
    }
}



export const uiStopLoading =()=>{
    return{
        type:uiStopLoading
    }
}

export const setServices=(serviceData)=>{
    return{
        type:setServices,
        serviceData:serviceData
    }
}



