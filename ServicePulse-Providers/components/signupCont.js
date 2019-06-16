import React,{Component} from "react";

import {
    View,
    StyleSheet,
    Text,
    Picker,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Button
    
}from "react-native";
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';


import { createStackNavigator } from 'react-navigation';

import SignUpSecuirityStack from './signUpSecurity';
import firebase from "firebase"
import { storage } from './../App';
const url =
  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

class SignUpCont extends Component{


        state={
            ServiceRender:"",
            subService:[],
            pictureSource:null,  
            cameraRollStatus: '',
            cameraStatus: '',
            testmsg: '',
            imageUrl:null,
            providerService:"",
            key:"",
            pictureError:'',
            serviceRenderError:'',
            isLoading:false,
            isNotPictureError:true,
            isNotErrorservice:true
        }
    

   componentDidMount(){
       const keyParams=this.props.navigation.state.params.providerkey
    this.database= firebase.database().ref("SubServices");
    this.database.on('value',snapshot=>{
        const SubserviceObject=snapshot.val()
        if(SubserviceObject!==null){
       const SubserviceList =Object.keys(SubserviceObject).map(key=>({
        ...SubserviceObject[key],
        uid:key
       }));

       this.setState({

        subService:SubserviceList,
        key:keyParams
       })
       
    }
    })
    
   }



   uploadImageAsync=async (uri)=> {
  
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const providerskey=this.state.key
    
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET',uri, true);
      xhr.send(null);
    });
    this.setState({
        isLoading:true,
        
    })
    const ref = firebase
      .storage()
      .ref(`Providers-Profile/${uuid.v4()}`)
        ;
    const snapshot = await ref.put(blob);
  const picUrl=await snapshot.ref.getDownloadURL()
    // We're done with the blob, close and release it
    blob.close();
  
      const ProvidersRef=firebase.database().ref('Providers/').child(providerskey);
            ProvidersRef.update({
                    profilePicture:picUrl,
                    ProvidersService:this.state.ServiceRender
                }).then(()=>{
                    this.props.navigation.navigate('SignUpSecuirityStack',{providerkey:providerskey})
                    this.setState({
                        isLoading:false
                    })
                })
                .catch((error)=>{
                    this.setState({
                        isLoading:false
                    })
                })
       
     
   
    return await snapshot.ref.getDownloadURL();
  }
   

   imageHandler= async ()=>{
  


    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      
  
      if (!result.cancelled) {
      
        this.setState({  pictureSource:result.uri,
            isNotPictureError:true,});

       
      }
    
}
  
cameraHandler= async ()=>{
   
    this.setState({testmsg: 'forcing refresh'});

    const permissions = Permissions.CAMERA;
    const permissions2 = Permissions.CAMERA_ROLL
    const status = await Permissions.askAsync(permissions);
    const status2 = await Permissions.askAsync(permissions2);
    

  this.setState({cameraStatus: status.status});
  this.setState({cameraRollStatus: status2.status})
   console.log('Permission =>', permissions);
   console.log('Status => ', status);

    if (status.status !== 'granted' && status2.status !=='granted') {

        Alert.alert(
            'Permission',
            `[ pickFromCamera ] ${permissions} access: ${status.status}`,
            `[ pickFromCamera ] ${permissions2} access: ${status2.status}`,
            [
             
              {text: 'OK'},
            ],
            { cancelable: false }
          )

  

    } else {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
    
  
      if (!result.cancelled) {
        this.setState({ pictureSource:result.uri ,isNotPictureError:true,});
        Alert.alert("success")
      }
  }
 

    
    
}

HandleSubmit =async ()=>{

    if(this.state.pictureSource==null){
       this.setState({
           isLoading:false,
           pictureError:'Please insert a profile picture!',
           isNotPictureError:false,
         
       })
       
    }else if(this.state.ServiceRender==''){
        this.setState({
            isLoading:false,
            isNotErrorservice:false,
            serviceRenderError:"Please select a service!"
        })
        
    }
    
    
    
    else{
    pictureUrl= await this.uploadImageAsync(this.state.pictureSource);
       this.setState({
        isLoading:true,
        isNotPictureError:true,
        pictureError:'',
        isNotErrorservice:true,
        serviceRenderError:''
       })
    }



   
}
 



    render(){
           
        if(this.state.subService.length){
            let submitButtom=(
                <TouchableOpacity style={styles.bottom} onPress={this.HandleSubmit}>
                   <Text style={styles.bottomTxt}>Continue </Text>    
               </TouchableOpacity>
            )
    
            if(this.state.isLoading){
                submitButtom=<View style={styles.bottomTxt}><ActivityIndicator size='large' /></View>
            }
          const subService=this.state.subService
          const subServiceList=subService.map(sub=>{
              return(
                  
                  <Picker.Item label={sub.subServiceName} key={sub.uid} value={sub.subServiceName} />
                
              )
          })
        return(
           <View style={styles.container}>
                  <Text style={{paddingHorizontal:40,color:"#2F4F4F",fontWeight:'bold',marginBottom:10,marginLeft:20,fontSize:17}}>Add a profile picture</Text>
                   
                  <Text
                      style=
                      {{color:'red', alignItems:"center",
                      justifyContent:'center',
                      marginLeft:50
                      }}
                  >
                  {!this.state.isNotPictureError?this.state.pictureError:null}
                  </Text>
                  <View style={{flex:1,paddingHorizontal:40}}>
                  <View style={styles.placeholder}>
                    <Image  source={{uri:this.state.pictureSource}}  style={styles.previewImage} />
                  </View>
             
                   <View style={styles.button}>
                       <TouchableOpacity >
                            <Button color="#FF6347" title='Pick Image from files' onPress={this.imageHandler} />
                       </TouchableOpacity>
                   </View>
                   <View style={styles.button1}>
                       <TouchableOpacity >
                           <Button color="orange" title='take a picture' onPress={this.cameraHandler} />
                         </TouchableOpacity>
                   </View>
               </View>
            
               <View style={{justifyContent:"center",alignItems:'center',marginTop:10}}>
                     <Text style={{paddingHorizontal:20,color:"#2F4F4F",fontWeight:'bold',marginBottom:5,marginLeft:15,marginTop:30,fontSize:21}}>Select the Service You Render</Text>
                     <Text
                         style=
                         {{color:'red', alignItems:"center",
                          justifyContent:'center',
                          marginLeft:30
                        }}
                    >
                       {!this.state.isNotErrorservice?this.state.serviceRenderError:null}
                   </Text>
                  <Picker
                       selectedValue={this.state.ServiceRender}
                        style={{height: 50, width:170}}
                         onValueChange={(itemValue, itemIndex) =>
                         this.setState({ServiceRender: itemValue,
                            isNotErrorservice:true,})
                
                  }
                  >
                  <Picker.Item label='select'  value='' />
                    {subServiceList}
                  </Picker>
             
                 </View>

                  <View style={{paddingHorizontal:70,marginBottom:10}}> 
                     {submitButtom}
                  </View>
           </View>
        )
    }else{
        return(
            <View style={{flex:1,
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"#F0FFFF"}}
            >
                   <ActivityIndicator />
             </View>
        )
    }
    }
}



const styles = StyleSheet.create({
   
    container: {
        flex:1,
        backgroundColor: '#ffffff',
       
      
    },
    bottom:{
        alignSelf:'stretch',
        alignItems:"center",
        padding:20,
        backgroundColor:'#59cbbd',
        marginTop:20,
        justifyContent:"center"
    
      
    },
    bottomTxt:{
        color:'#fff',
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:'center'
    },
    
    placeholder: {
        borderWidth:1,
        borderColor:'black',
        backgroundColor:"#eee",
        width:'100%',
        height:190,
      
       
     },
     button:{
         margin:8,
         
     },
     button1:{
         marginLeft:8,
         marginRight:8,
        
     },
     previewImage:{
         width:'100%',
         height:'100%'
     },
})

const SignUpContStack=createStackNavigator({
    SignUpCont:{
        screen:SignUpCont,
         navigationOptions:{
            header:null
        }
    },
    SignUpSecuirityStack:{
        screen:SignUpSecuirityStack,
        navigationOptions:{
            header:null
        }
    }
})
// ()=>this.props.navigation.navigate('SignUpSecuirityStack')
export default SignUpContStack