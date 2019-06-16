import React,{Component} from "react";
import _ from 'lodash';   
import * as Animatable from 'react-native-animatable';
import Icon from '@expo/vector-icons/Ionicons';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
import {
   View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    YellowBox,
   Alert
   
}from "react-native";
import { createStackNavigator } from 'react-navigation';
import firebase  from 'firebase';





class UpdateProfile extends Component{
    
    constructor(){
        super()

        this.state={
            
            name:'',
            email:'',
            phone:'',
           
            fnameValidate:true,
            emailValidate:true,
            phoneValidate:true,
            fnameError:'',
            emailError:'',
            phoneError:'',
            isLoading:false,
            error:'',
            isError:false,
            id:""
           
           
           
        };
        
    }
     

componentDidMount(){
    const id=this.props.navigation.state.params.id
    const user = firebase.auth().currentUser;
    if (user != null) {
    
   this.setState({
   name:user.displayName,
   email:user.email,
   photoUrl:user.photoURL,
   uid:user.uid ,
   id:id 
 })
}
}
            
    
     updateInputValue=(text,type)=>{
         textChar=/^[a-zA-Z '.-]+$/
         re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         regPhone = /^[0]?[789]\d{9}$/

         if(type=="name"){
          if(!textChar.test(text)){
             this.setState({fnameValidate:false,
                fnameError:"Enter a valid Name!",isError:false})
          }else{
         this.setState({
             fnameValidate:true,
             isError:false,
           
             fname:text
         })
        }
        }
    



          
     else   if(type=="email"){
            if(!re.test(text)){
               this.setState({emailValidate:false,
                emailError:"Enter a valid email address!",
                isError:false})
            }else{
           this.setState({
               emailValidate:true,
               email:text,
               isError:false
           })
        
          }
          }

             
       else if(type=="phone"){
        if(text.length!=10){
            
           this.setState({phoneValidate:false,
            phoneError:"Enter a valid phone number!",isError:false})
        }else{
       this.setState({
        phoneValidate:true,
           phone:text,
           isError:false
       })
    
      }
      }

    
     }

   

    submitHandler=()=>{
        this.setState({
            isLoading:true
        })
        if(this.state.id){
            const id=this.state.id
       firebase.database().ref("users/"+id).update({
          contact:this.state.phone
       }).then(()=>{
           alert("Profile updated succesfully!")
           this.setState({
            isLoading:false
        })
       })
        }else{
            alert("update fail")
            this.setState({
                isLoading:false
            })
        }

            

}


    render(){

        if(this.state.name){
           
    
        let submitButtom=(
            <TouchableOpacity style={[styles.bottom,!this.state.phoneValidate?styles.disabled:styles.noDisabled]} disabled={ !this.state.phoneValidate } onPress={this.submitHandler}>
            <Text style={styles.bottomTxt}>Update </Text>    
            
          </TouchableOpacity>
        )

        if(this.state.isLoading){
            submitButtom=<View style={styles.bottomTxt}><ActivityIndicator  size='large'/></View>
        }
        return(
         
        
            <KeyboardAvoidingView style={styles.container}
               behavior="padding"
            
            >
        
               <ScrollView>
                <View style={styles.forms}>
                
                        
                        <Text style={styles.ErrorInput}>{this.state.isError?this.state.error:null}</Text>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <View>
                          <TextInput   value={this.state.name} style={[styles.textInput,!this.state.fnameValidate?styles.error:styles.success]} placeholder="Name*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'name')}  />
                           <Text style={styles.ErrorInput}>{!this.state.fnameValidate?this.state.fnameError:null}</Text>
    
                          <TextInput value={this.state.email}  style={[styles.textInput,!this.state.emailValidate?styles.error:styles.success]} keyboardType={'email-address'} style={styles.textInput} placeholder="Email Address*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'email')}  />
                          <Text style={styles.ErrorInput}>{!this.state.emailValidate?this.state.emailError:null}</Text>
                          <TextInput  returnKeyType={'next'} style={[styles.textInput,!this.state.phoneValidate?styles.error:styles.success]}
                          keyboardType={'numeric'}   placeholder="Phone Number"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'phone')}  />
                          <Text style={styles.ErrorInput}>{!this.state.phoneValidate?this.state.phoneError:null}</Text>
                          
                        </View>
                      </TouchableWithoutFeedback>
                      {submitButtom}
                     
                </View>
           </ScrollView>
           </KeyboardAvoidingView>
      
        )
    }else{
        return(
            <View style={styles.Loading}><ActivityIndicator  /></View>
        )
    }
    }
}





const styles = StyleSheet.create({
   
    container: {
      flex:1,
      backgroundColor: '#ffffff',
     
      justifyContent:"center",
      marginTop:10
      
     
    },
    Loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
     },
    forms:{
        alignSelf:'stretch',
        paddingLeft:40,
        paddingRight:40,
        marginBottom:30,
    },

    header:{
        marginTop:10,
        fontSize:24,
        color:"indigo",
        paddingBottom:10,
        marginBottom:40,
        borderBottomColor:"indigo",
        borderBottomWidth:1
    },
    textInput:{
       
        alignSelf:'stretch',
        height:45,
        color:"#000000",
        borderColor:"black",
        borderWidth:0.1,
        borderRadius:5,
        padding:7
    },
    ErrorInput:{
        alignSelf:'stretch',
        marginBottom:30,
        color:"red",
    },
    bottom:{
        alignSelf:'stretch',
        alignItems:"center",
        padding:20,
        backgroundColor:'#59cbbd',
        marginTop:30
    },
    bottomTxt:{
        color:'#fff',
        fontWeight:"bold"
    },
    error:{
       borderWidth:2,
       borderColor:"red" 
    },
    success:{
        borderWidth:0.1,
       borderColor:"black" 
    },
    disabled:{
        backgroundColor:"#eee",
        color:'#aaa',
        borderColor:'#aaa'
    },
    noDisabled:{
        alignSelf:'stretch',
        alignItems:"center",
        padding:20,
        backgroundColor:'#59cbbd',
        marginTop:30
    },
    suggestions:{
        backgroundColor:"white",
        padding:5,
        borderWidth:0.3,
        marginLeft:5,
        marginRight:5
    }
})

// ()=>

export default  UpdateProfile