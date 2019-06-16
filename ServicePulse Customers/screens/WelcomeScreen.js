import React from 'react';
import {View,Button,StyleSheet,ImageBackground,Text,TouchableNativeFeedback,TouchableOpacity} from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'; 
import { createStackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import LoadingStack from './LoadingScreen'





const Welcome=(props)=>{
    onpressHandler=()=>{
        
    }

   

  return(
    <View style={{flex:1}}>
       <ImageBackground
          source={require('./welcome.jpg')}
          style={{flex:1}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                <Animatable.View
                    animation='slideInDown'  iterationCount="infinite" direction="alternate"
                 style={{backgroundColor:'#ffffff',height:100,width:220,alignItems:'center',justifyContent:"center",
                 borderRadius:2}}
                >
                   <Text style={{fontWeight:'bold',fontSize:26}}>Service <Icon 
                      name="ios-phone-portrait" size={45} color='#00bfff'/> Pulse 
                      
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
                           <Text style={{fontSize:15}}>Search & Book for Services with SevicePulse</Text> 
                        </View>
                    </View>
                   
                   <View
                      style={{height:100,backgroundColor:'white',flexDirection:'row',
                       alignItems:'center',justifyContent:'center',borderTopWidth:1,borderTopColor:'#e8e8ec'
                      }}
                    >
                        <View style={{paddingHorizontal:25,borderColor:'white', borderRadius:15, width:150}}>
                         <TouchableOpacity>
                          <Button title="SIGN UP" color='#00bfff'  onPress={()=>props.navigation.navigate('LoadingStack')} />
                          </TouchableOpacity>
                        </View>
                       
                     <View style={{paddingHorizontal:25, width:150,borderColor:'white',borderRadius:15}}>
                        <TouchableOpacity>  
                         <Button title="SIGN IN"  color='#00bfff' style={{borderRadius:15}} onPress={()=>props.navigation.navigate('LoadingStack')} />
                        </TouchableOpacity>
                     </View>
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
    LoadingStack:{
        screen:LoadingStack,
        navigationOptions:{
            header:null
        }
    }
})

const styles=StyleSheet.create({

     
            
})

export default WelcomeStack;


