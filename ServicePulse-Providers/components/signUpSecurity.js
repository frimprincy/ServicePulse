import React,{Component} from "react";
import {
    View,
    StyleSheet,
    Text,
    Picker,
    Alert,
    TouchableOpacity,
    Button,
    Image,
    ActivityIndicator,
}from "react-native";


import { createStackNavigator } from 'react-navigation';
import { ImagePicker, Permissions,Notifications } from 'expo';
import firebase from "firebase"
import { storage } from './../App';
import uuid from 'uuid';
import Toast from './Toast';




class SignUpSecuirity  extends Component{


    state={
        pictureSource:null,  
        cameraRollStatus: '',
        cameraStatus: '',
        testmsg: '',
        isLoading:false,
        key:"",
        isNotPictureError:true,
        pictureError:'',
        visible: false,
        NotToken:""
    }


  async  componentDidMount(){
        const keyParams=this.props.navigation.state.params.providerkey
     
 
        this.setState({
         key:keyParams
        })
       await this.registerForPushNotificationsAsync();
    }
    uploadImageAsync=async (uri)=> {
  
       
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
                        nationIDPicture:picUrl,
                        notificationToken:this.state.NotToken
                    }).then(()=>{
                        this.props.navigation.goBack('SignUpSecuirityStack')
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
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({  pictureSource:result.uri });
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
            this.setState({ pictureSource:result.uri });
          }
      }
     

        
        
    }



    HandleSubmit =async ()=>{

        if(this.state.pictureSource==null){
           this.setState({
               isLoading:false,
               pictureError:'Please insert picture of SNN card!',
               isNotPictureError:false,
             
           })
           
        }
       else{
        pictureUrl= await this.uploadImageAsync(this.state.pictureSource);
           this.setState({
            isLoading:false,
            isNotPictureError:true,
            pictureError:'',
            visible: true,
           },
           () => {
             this.hideToast();
           },
         );

         let response=fetch('https://exp.host/--/api/v2/push/send',{
           method:'POST',
           headers:{
               Accept:'application/json',
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
               to:this.state.NotToken,
               sound:'default',
               title:'SignUp Success',
               body:'Your Request have been sent for approval.You will been notice if your request have been accepted or denied '
           })

         }).then(()=>{
            this.props.navigation.navigate('Welcome')
         })
       };
       
       
    }
    hideToast = () => {
        this.setState({
          visible: false,
        });
       }

         registerForPushNotificationsAsync=async ()=> {
             //check for awaiting permissions
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        //if no awaiting permissions, ask user for permission
        if (existingStatus !== 'granted') {
        
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }

         // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
         
         
       this.setState({
           NotToken:token
       })
    }
    render(){
        let submitButtom=(
            <TouchableOpacity style={styles.bottom} onPress={this.HandleSubmit}>
               <Text style={styles.bottomTxt}>Submit Request </Text>    
           </TouchableOpacity>
        )

        if(this.state.isLoading){
            submitButtom=<View style={styles.bottomTxt}><ActivityIndicator  size='large'/></View>
        }
        return(
           <View style={styles.container}>
                  <Text style={{paddingHorizontal:40,color:"#2F4F4F",fontWeight:'bold',marginBottom:10,marginLeft:20,fontSize:21}}>Uplaod Your SSN Card</Text>
                  <Text
                  style=
                  {{color:'red', alignItems:"center",
                  justifyContent:'center',
                  marginLeft:50
                  }}
              >
              {!this.state.isNotPictureError?this.state.pictureError:null}
              </Text>
                  <Text 
                     style={{paddingHorizontal:40,color:"#B22222",fontWeight:'bold',marginBottom:15,marginLeft:20,marginTop:10,fontSize:12}}
                     >Please make sure your details correspond with that on the card and let the picture be clear
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
                  <View style={{paddingHorizontal:70,marginBottom:10}}> 
                  <Toast visible={this.state.visible} message="Your Request Have be sent for approval" />
                    {submitButtom}
                  </View>
           </View>
        )
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
    }
})

const SignUpSecuirityStack=createStackNavigator({
    SignUpSecuirity:{
        screen:SignUpSecuirity,
         navigationOptions:{
            header:null
        }
    }
})

export default SignUpSecuirityStack