import {storage} from "./../../../src/firebase/index"
import { uiStartLoading,uiStopLoading } from './ActionTypes';
import { Fbconfig } from './../../../src/firebase/index';







export const createServices=(ServiceName,ServiceID,image)=>{

    return dispatch =>{
          dispatch(uiStartLoading())
       const uploadTask = storage.ref(`ServiceImages/${image.name}`).put(image);
          uploadTask.on('state_changed',()=>{
             storage.ref(`ServiceImages`).child(image.name).getDownloadURL().then(url=>{

             
          
                const ServiceData={
            names:ServiceName,
            image:url,
            ServiceID:ServiceID
            } 
            console.log(url)
            
        fetch("https://servicepulse-5a75b.firebaseio.com/Services.json",{
            method:"POST",
            body:JSON.stringify(ServiceData)
           
        })
        
        .catch(err=>{
             
            console.log(err)
            dispatch(uiStopLoading())
        }
        )
        .then(res=>res.json)
        .then(parsedRes=>{
            console.log(parsedRes)
            dispatch(uiStopLoading())
        })
        dispatch(uiStopLoading())

    }).catch(err=>{
             
        console.log(err)
        dispatch(uiStopLoading())
    })
})
        

        }
       
    }


    // export const getServices =()=>{
    //      return (dispatch)=>{
    //           firebase.database().ref("Services").on("value",snapshot=>{
    //               const serviceData = snapshot.val()
    //               dispatch(setServices(serviceData))
    //           },function(error){
                  
    //           })
             

              
    //         }
    //      }
    
    

    
export const createSubServices=(subServiceName,subServiceID, ServiceName,subImage)=>{

    return (dispatch) =>{
        dispatch(uiStartLoading())
       const uploadTask = storage.ref(`subServiceImages/${subImage.name}`).put(subImage);
          uploadTask.on('state_changed',()=>{storage.ref(`subServiceImages`).child(subImage.name).getDownloadURL().then(url=>{
                
                Fbconfig.database().ref("SubServices/").push({
                    subServiceName:subServiceName,
                    subServiceID:subServiceID,
                    subImage:url,
                    ServiceName:ServiceName
                   
                }).then(()=>{
                    console.log("Inserted");
                    dispatch(uiStopLoading())
                }).catch((error)=>{
                      console.log(error);
                      dispatch(uiStopLoading())
                })
    
    }).catch(err=>{
             
        console.log(err)
        dispatch(uiStopLoading())
    })
})
    




        }
       
    }
        
   
   
    // )
    // .then(res=>res.json)
    // .then(parsedRes=>{
    //     console.log(parsedRes)
    //     dispatch(uiStopLoading())
    // })
    // dispatch(uiStopLoading())



    // export const CheckSubExist=()=>{
    //    return dispatch=>{
          
    //      Fbconfig.database().ref().child("SubServices").orderByChild("ServiceID").equalTo("ServiceID").on('child_added',snap=>{
    //            if("ServiceID"===snap.val.ServiceID){
    //             dispatch(uiStopLoading())
    //            }
    //        })
    //    }
    // }

// Add commercial Area
    
    export const createCommercial=(AreaName,AreaID,AreaImage)=>{
        
        return (dispatch) =>{
            dispatch(uiStartLoading())
           const uploadTask = storage.ref(`AreaImages/${AreaImage.name}`).put(AreaImage);
              uploadTask.on('state_changed',()=>{storage.ref(`AreaImages`).child(AreaImage.name).getDownloadURL().then(url=>{
               
                    Fbconfig.database().ref("CommercialArea/").push({
                        AreaName:AreaName,
                        AreaID:AreaID,
                        AreaImage:url
                       
                    }).then(()=>{
                        console.log("Inserted");
                        dispatch(uiStopLoading())
                    }).catch((error)=>{
                          console.log(error);
                          dispatch(uiStopLoading())
                    })
        
        }).catch(err=>{
                 
            console.log(err)
            dispatch(uiStopLoading())
        })
    })
        
    
    
    
    
            }
           
        }
            


        // Add commercial Sub Area


           
    export const createSubCommercial=(AreaSubName,AreaSubID,AreaSubLocation,AreaName,AreaSubImage)=>{
        
        return (dispatch) =>{
            dispatch(uiStartLoading())
           const uploadTask = storage.ref(`AreaSubImages/${AreaSubImage.name}`).put(AreaSubImage);
              uploadTask.on('state_changed',()=>{storage.ref(`AreaSubImages`).child(AreaSubImage.name).getDownloadURL().then(url=>{
                     
                    Fbconfig.database().ref("CommercialSubArea/").push({
                        AreaSubName:AreaSubName,
                        AreaSubID:AreaSubID,
                        AreaSubLocation:AreaSubLocation,
                        AreaName:AreaName,
                        AreaSubImage:url
                       
                    }).then(()=>{
                        console.log("Inserted");
                        dispatch(uiStopLoading())
                    }).catch((error)=>{
                          console.log(error);
                          dispatch(uiStopLoading())
                    })
        
        }).catch(err=>{
                 
            console.log(err)
            dispatch(uiStopLoading())
        })
    })
        
    
    
    
    
            }
           
        }
            