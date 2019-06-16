import React from 'react';
import {View,Button,StyleSheet,ImageBackground,Text,TouchableNativeFeedback,TouchableOpacity} from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'; 
import { createStackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import LoadingStack1 from './loadingScreen1';
import LoadingStack2 from './loadingScreen2';




const Welcome=(props)=>{
    onpressHandler=()=>{
        
    }

   

  return(
    <View style={{flex:1}}>
       <ImageBackground
          source={require('./welcome.png')}
          style={{flex:1}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                <Animatable.View
                    animation='slideInDown'  iterationCount="infinite" direction="alternate"
                 style={{backgroundColor:'#ffffff',height:100,width:220,alignItems:'center',justifyContent:"center",
                 borderRadius:2}}
                >
                   <Text style={{fontWeight:'bold',fontSize:26}}>Service <Icon 
                      name="ios-phone-portrait" size={45} color='#ff8000'/> Pulse 
                      
                    </Text>
                  
                </Animatable.View>
                </View>
                 {/**BOTTOM HALF **/}
                <Animatable.View animation='slideInUp' iterationCount={1}>
                    <View style={{height:60,backgroundColor:"white"}}>
                        <View 
                        style=
                        {{
                            alignItems:'flex-start',paddingHorizontal:25,marginTop:25,opacity:0.8
                        }}
                        >
                           <Text style={{fontSize:15}}>Welcome to ServicePulse Providers App</Text> 
                        </View>
                    </View>
                   
                   <View
                      style={{height:100,backgroundColor:'white',flexDirection:'row',
                       alignItems:'center',justifyContent:'center',borderTopWidth:1,borderTopColor:'#e8e8ec'
                      }}
                    >
                    <TouchableOpacity>
                        <View style={{paddingHorizontal:25,borderColor:'white', borderRadius:15, width:150}}>
                          <Button title="SIGN UP" color='#ff8000'  onPress={()=>props.navigation.navigate('Loading2')} />
                        </View>
                        </TouchableOpacity>

                    <TouchableOpacity>
                      <View style={{paddingHorizontal:25, width:150,borderColor:'white',borderRadius:15}}>
                         <Button title="SIGN IN"  color='#ff8000' style={{borderRadius:15}} onPress={()=>props.navigation.navigate('Loading1')} />
                      </View>
                     </TouchableOpacity>
                   </View>
                </Animatable.View>

           
      
       
        </ImageBackground>
       
    </View>

  )
}

const WelcomeStack= createStackNavigator({
    Welcome:{
        screen:Welcome,
        navigationOptions:{
            header:null
        }
    },
    Loading1:{
        screen:LoadingStack1,
        navigationOptions:{
            header:null
        }
    },
    Loading2:{
        screen:LoadingStack2,
        navigationOptions:{
            header:null
        }
    },
  
})

const styles=StyleSheet.create({

     
            
})

export default WelcomeStack;


