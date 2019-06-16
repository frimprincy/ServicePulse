import React,{Component} from "react";
import _ from 'lodash';   
import * as Animatable from 'react-native-animatable';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
   Alert,
   Button
   
}from "react-native";
import { createStackNavigator } from 'react-navigation';
import firebase  from 'firebase';
import SignUpContStack from './../components/signupCont'



class SignInScreen  extends Component{
    constructor(){
        super()

        this.state={
            
            email:'',
            password:'',
            emailValidate:true,
            passwordValidate:true,
            emailError:'',
            passwordError:'',
            isLoading:false,
            error:'',
            isError:false,
            errorPlace:'',
            PasswordCheck:'',
            email:'',
            EmailCheck:''
    
        };
        
    }
     

componentDidMount(){
 

}
            
    
     updateInputValue=(text,type)=>{
         textChar=/^[a-zA-Z '.-]+$/
         re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         regPhone = /^[0]?[789]\d{9}$/

    


      

          
       if(type=="email"){
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

    

     else  if(type=="password"){
        if(text.length<6){
          
           this.setState({passwordValidate:false,
            passwordError:"Enter a password not less than 6!",isError:false})
        }else{
       this.setState({
           passwordValidate:true,
           password:text,
           isError:false
       })
    
      }
      }
     }

  

    submitHandler=(email,password)=>{
        if( this.state.email=='' || this.state.password==''){
            this.setState({
                error:"Email or password is missing!",
                isError:true

            })
            Alert.alert('Email or password is missing!')


        }else{
          this.setState({
              isLoading:true,
          })

        
        
          const ref=firebase.database().ref('AssignedProviders');
          ref.orderByChild('password').equalTo(password).on("value",snapshot=>{
           const providers=snapshot.val()
           if(providers!==null){
          const ProvidersDataList =Object.keys(providers).map(key=>({
           ...providers[key],
           uid:(Math.random())
          }));
        
          this.setState({
              
          PasswordCheck:ProvidersDataList[0].password,
          isLoading:true,
          }) 



         const Emailref=firebase.database().ref('AssignedProviders')
          Emailref.orderByChild('email').equalTo(email).on("value",snapshot=>{
           const providersEmail=snapshot.val()
           if(providersEmail!==null){
          const providersEmailList =Object.keys(providersEmail).map(key=>({
           ...providersEmail[key],
           uid:(Math.random())
          }));
          
          this.setState({
              
          EmailCheck:providersEmailList[0].email,
          isLoading:true
          })
        
            try{
              firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
                
            })
            this.props.navigation.navigate('Main')
            }catch(error){
                console.log(error)
            }
        }else{
            alert("Email does not exist!")
            this.setState({
                isLoading:false,
                })
        }
        })

    }else{
        alert("password does not exist!")
        this.setState({
            isLoading:false,
            })
    }
          })
    
        
       
    
   
    }

}


    render(){
      
        let submitButtom=(
            <TouchableOpacity  >
            <Button title='LogIn' color='#59cbbd'  onPress={()=>{this.submitHandler(this.state.email,this.state.password)}} style={[styles.bottomTxt,styles.bottom,!this.state.emailValidate ||!this.state.passwordValidate?styles.disabled:styles.noDisabled]}> </Button>    
            
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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>
                        <TextInput style={[styles.textInput,!this.state.emailValidate?styles.error:styles.success]} keyboardType={'email-address'} style={styles.textInput} placeholder="Email Address*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'email')}  />
                        <Text style={styles.ErrorInput}>{!this.state.emailValidate?this.state.emailError:null}</Text>
    
                        <TextInput secureTextEntry={true}  style={[styles.textInput,!this.state.passwordValidate?styles.error:styles.success]} placeholder="Password*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'password')}  />
                        <Text style={styles.ErrorInput}>{!this.state.passwordValidate?this.state.passwordError:null}</Text>
                        
                      </View>
                    </TouchableWithoutFeedback>
                      {submitButtom}
                      <TouchableOpacity style={{marginTop:20,borderRadius:10}} >
                      <Button rounded full  onPress={()=>this.props.navigation.navigate('SignUp')}  title='SignUp' style={[styles.bottomTxt,styles.bottom1]}> </Button>    
                      
                    </TouchableOpacity>
                    
                </View>
           </ScrollView>
           </KeyboardAvoidingView>
      
        )
    }
}



const styles = StyleSheet.create({
   
    container: {
      flex:1,
      backgroundColor: '#ffffff',
     
      justifyContent:"center",
      marginTop:50
      
     
    },
    forms:{
        alignSelf:'stretch',
        paddingLeft:40,
        paddingRight:40,
    },

    textInput:{
       
        alignSelf:'stretch',
        height:50,
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
       
        alignItems:"center",
        padding:10,
        backgroundColor:'#59cbbd',
        marginBottom:10,
        borderRadius:20
    },
    bottom1:{
       
        alignItems:"center",
        padding:10,
        backgroundColor:'#59cbbd',
        marginTop:5,
        borderRadius:20
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
  
})


export default SignInScreen