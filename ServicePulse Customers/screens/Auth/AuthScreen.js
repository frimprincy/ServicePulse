import React,{Component} from 'react';
import {
    View,Button,
    StyleSheet,ImageBackground,
    Text,TouchableNativeFeedback,
    TextInput,TouchableOpacity,
    Image,Animated,
    Dimensions,
    Keyboard,
    Platform,
    onPress,
    Alert
    }from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'; 
import { createStackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import { Google } from 'expo';
import AppDrawerStackNavigator from './../../navigation/MainDrawerNavigator';
import firebase from "firebase"










const SCREEN_HEIGHT=Dimensions.get('window').height

class AuthScreen extends Component{

    
    
    constructor(){
        super()

         this.state={
             placeholderText:"Enter your mobile number"
         }
    }
     
    // Mount facebook to dom

      
    

    //   google Login functions
    isUserEqual=(googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    onSignIn=googleUser=>{
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
                 console.log('')
                 if(result.additionalUserInfo.isNewUser){

                
                 firebase.database().ref("/users/" + result.user.uid)
                 .set({
                     gmail:result.user.email,
                     profile_picture:result.additionalUserInfo.profile.picture,
                     locale:result.additionalUserInfo.profile.locale,
                     first_name:result.additionalUserInfo.profile.given_name,
                     last_name:result.additionalUserInfo.profile.family_name,
                     created_at:Date.now()
                 })
                }else{
                    firebase.database().ref("/users/" + result.user.uid).update({
                        last_logged_in:Date.now()
                    })
                }
            })
            
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }
       
    signInWithGoogleAsync= async ()=>{
        try{
            const result =await Expo.Google.logInAsync({
                behavior:"web",
                androidClientId:'783676123973-ivlv5mknelm52b9bdvku9opegvg2r46v.apps.googleusercontent.com',
                scopes:['profile','email']
            });

            if (result.type === 'success') {
                Alert.alert(
                    'LogIn Success',
                    'You have logIn successfully!',
                    [
                     
                      {text: 'OK'},
                    ],
                    { cancelable: false }
                  )
                this.onSignIn(result)
                return result.accessToken;
            }else{
                return{cancelled:true}
            }

        }catch(e){
            return{error:true}
        }
        };




        isUserEqual=(facebookUser, firebaseUser)=> {
            if (firebaseUser) {
              var providerData = firebaseUser.providerData;
              for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === facebookUser.userID) {
                  // We don't need to re-auth the Firebase connection.
                  return true;
                }
              }
            }
            return false;
          }



        // facebook login functions

      checkLoginState=(facebookUser)=> {
        if (facebookUser) {
            // User is signed-in Facebook.
            var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
              unsubscribe();
              // Check if we are already signed-in Firebase with the correct user.
              if (!this.isUserEqual(facebookUser, firebaseUser)) {
                // Build Firebase credential with the Facebook auth token.
                var credential = firebase.auth.FacebookAuthProvider.credential(
                    facebookUser.token
                    );
                // Sign in with the credential from the Facebook user.
                firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
                  
                    // if(result.isNewUser){
   
                   
                    firebase.database().ref("/users/" + result.user.uid)
                    .set({
                        email:result.user.email,
                        profile_picture:result.user.picture,
                        first_name:result.user.first_name,
                        last_name:result.user.last_name,
                        created_at:Date.now()
                    })
                //    }else{
                //        firebase.database().ref("/users/" + result.user.uid).update({
                //            last_logged_in:Date.now()
                //        })
                //    }
               })
               
                .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
              } else {
                // User is already signed-in Firebase with the correct user.
              }
            }.bind(this));
          } else {
            // User is signed-out of Facebook.
            firebase.auth().signOut();
          }
          }


         loginWithFacebook=async ()=>{
             try {
                const 
                
                      result
                  
                 
                
                 = await Expo.Facebook.logInWithReadPermissionsAsync('2575709462501321', {
                     behavior:"web",
                  permissions: ['public_profile'],
                });
            if(result.type==='success'){
                Alert.alert(
                    'LogIn Success',
                    'You have logIn successfully!',
                    [
                     
                      {text: 'OK'},
                    ],
                    { cancelable: false }
                  )
                this.checkLoginState(result);
                return result.token;
               
            }
        }catch(e){
            return{error:true}
        }
    }

    componentWillMount(){
        this.loginHeight=new Animated.Value(150)
        this.KeyboardWillShowListener=Keyboard.addListener("keyboardWillShow",this.KeyboardWillShow)
        this.KeyboardWillHideListener=Keyboard.addListener("KeyboardWillHide",this.KeyboardWillHide)

        this.KeyboardDidShowListener=Keyboard.addListener("keyboardDidShow",this.KeyboardWillShow)
        this.KeyboardDidHideListener=Keyboard.addListener("KeyboardDidHide",this.KeyboardWillHide)

        this.keyboardHeight=new Animated.Value(0)
        this.fowardArrowOpacity=new Animated.Value(0)
        this.borderBottomWidth=new Animated.Value(0)
    }

    KeyboardWillShow=(facebookUser)=>{
        if( Platform.OS='android'){
            duration=100
        }else{
            duration=facebookUser.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight,{
                duration:duration +100,
                toValue:facebookUser.endCoordinates.height + 10
            }),
            Animated.timing(this.fowardArrowOpacity,{
                duration:duration,
                toValue:1
            }),
            Animated.timing(this.borderBottomWidth,{
                duration:duration,
                toValue:1
            })
        ]).start()

    }


    KeyboardWillHide =(facebookUser)=>{
        if( Platform.OS='android'){
            duration=100
        }else{
            duration=facebookUser.duration
        }
        Animated.parallel([
            Animated.timing(this.keyboardHeight,{
                duration:duration +100,
                toValue:0
            }),
            Animated.timing(this.fowardArrowOpacity,{
                duration:duration,
                toValue:0
            }),
            Animated.timing(this.borderBottomWidth,{
                duration:facebookUser.duration,
                toValue:0
            })
        ]).start()

       

    }

    increaseHeightOfLogin= ()=>{
        this.setState({
            placeholderText:"0549599528"
        })
        Animated.timing(this.loginHeight,{
            toValue:SCREEN_HEIGHT,
            duration:500
        }).start(()=>{
            this.refs.textInputMobile.focus()
        })

    } 

    decreaseHeightOfLogin =()=>{
        Keyboard.dismiss()
        Animated.timing(this.loginHeight,{
            toValue:150,
            duration:500
        }).start()
    }

   render(){
       const headerTextOpacity= this.loginHeight.interpolate({
           inputRange:[150,SCREEN_HEIGHT],
           outputRange:[1,0]
       })

       const marginTop= this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[25,100]
       })

       const headerBackArrowOpacity= this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[0,1]
    })

    const tittleTextLeft= this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[100,25]
    })

    const titleTextBottom= this.loginHeight.interpolate({
        inputRange:[150,400,SCREEN_HEIGHT],
        outputRange:[0,0,100]
    })

    const titleTextOpacity= this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[0,1]
    })

  return(
    <View style={{flex:1}}>

       <Animated.View
          style={{
                position:'absolute',
                height:50,
                width:60,
                top:22,
                left:35,
                zIndex:100,
                opacity:headerBackArrowOpacity
          }}
       >
         
            <TouchableOpacity onPress={()=>this.decreaseHeightOfLogin()}>
                <Icon name='md-arrow-back' style={{color:"black"}} size={30} />
                
            </TouchableOpacity>

       </Animated.View >

       <Animated.View  
          style={{
            position:'absolute',
            height:50,
            width:60,
            right:10,
            bottom:this.keyboardHeight,
            opacity:this.fowardArrowOpacity,
            zIndex:100,
            backgroundColor:"#54575e",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:30
          }}
       >

          <TouchableOpacity >
            <Icon name='md-arrow-forward' style={{color:"white"}} size={26}  />
       
         </TouchableOpacity>
       </Animated.View>

       <ImageBackground
          source={require('./../Authbackground.jpg')}
          style={{flex:1}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                <Animatable.View
                   animation='zoomIn' iterationCount={1}
                   style={{backgroundColor:'#ffffff',height:100,width:220,alignItems:'center',justifyContent:"center",
                   borderRadius:2}}
                >
                   <Text style={{fontWeight:'bold',fontSize:26}}>Service <Icon 
                      name="ios-phone-portrait" size={45} color='#00bfff'/> Pulse 
                      
                    </Text>
                  
                </Animatable.View>
                </View>
                 {/**BOTTOM HALF **/}
                <Animatable.View 
                    animation='slideInUp' iterationCount={1}
                >
                    <Animated.View 
                       style={{
                        height:this.loginHeight,
                        backgroundColor:"white"
                        }}
                    >
                        <Animated.View 
                        style=
                        {{
                            alignItems:'flex-start',
                            paddingHorizontal:25,
                            marginTop:marginTop,
                            opacity:headerTextOpacity
                        }}
                        >
                           <Text style={{fontSize:20}}>Get Started With ServicePulse</Text> 
                        </Animated.View >
                        
                        <TouchableOpacity 
                           onPress={()=>this.increaseHeightOfLogin()}
                        >
                            <Animated.View 
                                style=
                                   {{
                                    marginTop:marginTop,paddingHorizontal:25,flexDirection:'row'
                                    }}
                                >
                                
                                 <Animated.Text  
                                    style={{
                                            fontSize:24,
                                            color:"gray",
                                            position:"absolute",
                                            bottom:titleTextBottom,
                                            left:tittleTextLeft,
                                            opacity:titleTextOpacity

                                    }}
                                 >
                                 
                                 Enter your mobile number


                                 </Animated.Text>

                                <Image source={require('./../flag.jpg')} style={{height:30,width:24,resizeMode:'contain'}}/>
                                <Animated.View
                                    pointerEvents='none'
                                    style={{
                                        flexDirection:'row',
                                        flex:1,
                                        borderBottomWidth:this.borderBottomWidth
                                     }}
                                    
                                >
                                    <Text style=
                                       {{fontSize:20,
                                        paddingHorizontal:10
                                       }}
                                    >
                                      +233
                                    </Text>

                                    <TextInput
                                    keyboardType="numeric"
                                    ref="textInputMobile"
                                     style={{
                                         flex:1,
                                         fontSize:19,
                                        }}
                                        placeholder={this.state.placeholderText}
                                        underlineColorAndroid='transparent'
                                     >
                                    </TextInput>
                                    
                                </Animated.View>
                            </Animated.View>
                             
                        </TouchableOpacity>

                    </Animated.View>
                   
                   <View
                      style={{
                          height:105,
                          backgroundColor:'white',
                          alignItems:'center',
                         borderTopWidth:1,
                         borderTopColor:'#e8e8ec'
                      }}
                    >
                        <Text style={{fontSize:12,color:'#5a7fdf' }}>-- Or --</Text> 
                        <Text style={{fontSize:12,color:'#5a7fdf',fontFamily:"sans-serif",marginStart:5}}>Continue With</Text> 

                        <View 
                          style={{
                            alignItems:"center"
                            ,justifyContent:"center",
                            flexDirection:"row",
                            marginTop:15,
    
                           }}
                        >
                           <TouchableOpacity onPress={()=>this.signInWithGoogleAsync()}>
                                <View style={{paddingHorizontal:15,borderColor:'white'}}>
                                   <Image source={require('./../google.jpg')} style={{height:35,width:75}}/>
                                </View>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.loginWithFacebook()} >
                            <View style={{paddingLeft:15,borderColor:'white'}}>
                               <Image source={require('./../facebok.png')} style={{height:35,width:80}} />
                            </View>
                            </TouchableOpacity>
                     
                        </View>
                    </View>
                </Animatable.View>

           
      
       
        </ImageBackground>
       
    </View>

  )
}
}


const AuthStack= createStackNavigator({
    AuthScreen:{
        screen:AuthScreen,
        navigationOptions:{
            header:null
        }
    },
  

})

const styles=StyleSheet.create({
             
})
export default AuthStack;


