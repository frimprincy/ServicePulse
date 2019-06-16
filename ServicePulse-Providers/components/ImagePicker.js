import React,{Component} from "react";
import {
    View,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    Text,
    Alert
}from "react-native";
import { ImagePicker, Permissions } from 'expo';



class ImagePick  extends Component{

    state={
        pictureSource:null,  
        cameraRollStatus: '',
        cameraStatus: '',
        testmsg: ''
    }

    imageHandler= async ()=>{
       


        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
      
          
      
          if (!result.cancelled) {
            this.setState({  pictureSource:result.uri });

            Alert.alert("success")
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
            Alert.alert("success")
          }
      }
     

        
        
    }
    render(){
       
        return(
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
        )
    }
}



const styles = StyleSheet.create({
   
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


export default ImagePick