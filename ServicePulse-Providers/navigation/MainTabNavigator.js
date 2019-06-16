import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import NewScreen from '../screens/NewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import  Icon  from '@expo/vector-icons/Ionicons';
import About from './../components/project/AboutServicePulse';
import Help from './../components/project/help';
import UpdateProfile from './../components/project/update';


const ProfileStack=createStackNavigator({
  Profile:{
    screen:ProfileScreen,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Profile",
          headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
          headerStyle:{
            backgroundColor:"#ffe6e6",
            height:90,
            borderBottomColor:"#ffe6e6"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
          
 
    }
  },
  About:{
    screen:About,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"About ServicePulse",
          headerStyle:{
            backgroundColor:"#ffe6e6",
            height:90,
            borderBottomColor:"#ffe6e6"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
          
 
    }
  },
  Help:{
    screen:Help,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Help Center",
          headerStyle:{
            backgroundColor:"#ffe6e6",
            height:90,
            borderBottomColor:"#ffe6e6"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
          
 
    }
  },
  UpdateProfile :{
    screen:UpdateProfile ,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Update Profile",
          headerStyle:{
            backgroundColor:"#ffe6e6",
            height:90,
            borderBottomColor:"#ffe6e6"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
          
 
    }
  }
})


const LocationStack=createStackNavigator({
  Location:{
    screen:NewScreen,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"ServicePulse Provider",
          headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
          headerStyle:{
            backgroundColor:"#ffe6e6",
            height:90,
            borderBottomColor:"#ffe6e6"
          },
          headerTitleStyle: { color: '#3a455d' }


         }
          
 
    }
  }
})


const TabNavigator=createBottomTabNavigator({
  
  Location:{
      screen:LocationStack,
      navigationOptions:{
         
        tabBarIcon:({tintColor})=>(<Icon name="md-locate" color={tintColor} size={24}/>),
       
        
       }
  },
  Profile:{
    screen:ProfileStack,
    navigationOptions:{
         
      tabBarIcon:({tintColor})=>(<Icon name="md-contact" color={tintColor} size={24}/>),
     
      
     }
  },
},{
  navigationOptions:({navigation})=>{
    
    const {routeName}=navigation.state.routes[navigation.state.index]

    return{
      header:null,
      headerTitle:routeName
    }
  }
})


const HomeStackNavigator=createStackNavigator({
  TabNavigator :TabNavigator
},{
   defaultNavigationOptions:({navigation})=>{
     return{
         headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
         headerStyle:{
          backgroundColor:"#ffe6e6",
          height:90,
          borderBottomColor:"#ffe6e6"
         }
        }
         

   }
})



export default HomeStackNavigator