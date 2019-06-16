import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, openDrawer,createMaterialTopTabNavigator } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';


import Home from '../screens/HomeScreen';
import Notifications from '../screens/NotificationScreen';
import Profile from '../screens/ProfileScreen';
import TabBarIcon from './../components/TabBarIcon';

import ServiceSubCat from './../components/projects/serviceSubCat';
import CommercialSub from './../components/projects/commercialSub';
import CommercialDetails from './../components/projects/commercialSubDetails';
import ServiceProvider from './../components/projects/serviceProviders'
import ProvidersDetails from './../components/projects/providersDetails'
import Help from './../components/projects/help';
import About from './../components/projects/About';
import UpdateProfile from './../components/projects/update';





const HomeStack=createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Service Pulse",
          headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
          headerStyle:{
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575",
            
          },
          headerTitleStyle: { color: '#3a455d' }
         }
    }
  },
  ServiceSubCat:{
    screen:ServiceSubCat,
    navigationOptions:({navigation})=>{
      return{
        
          headerStyle:{
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
    }
  },
  CommercialSub:{
    screen:CommercialSub,
    navigationOptions:({navigation})=>{
      return{
        
          headerStyle:{
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
  }
},
CommercialDetails:{
  screen:CommercialDetails,
  navigationOptions:({navigation})=>{
    return{
      
        headerStyle:{
          backgroundColor:"#EC9B44",
          height:60,
          borderBottomColor:"#757575"
        },
        headerTitleStyle: { color: '#3a455d' }
       }
}
  
},
providers:{
  screen:ServiceProvider,
  navigationOptions:({navigation})=>{
    return{
      
        headerStyle:{
          backgroundColor:"#EC9B44",
          height:90,
          borderBottomColor:"#757575"
        },
        headerTitleStyle: { color: '#3a455d' }
       }
}
  
},
ProvidersDetails:{
  screen:ProvidersDetails,
  navigationOptions:({navigation})=>{
    return{
      
        headerStyle:{
          backgroundColor:"#EC9B44",
          height:50,
          borderBottomColor:"#757575"
        },
        headerTitleStyle: { color: '#3a455d' }
       }
}
  
}


})

const NotificationsStack=createStackNavigator({
  Notifications:{
    screen:Notifications,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Notifications",
          headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
          headerStyle:{
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
          },
          headerTitleStyle: { color: '#3a455d' }


         }
          
 
    }
  }
})


const ProfileStack=createStackNavigator({
  Profile:{
    screen:Profile,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Profile",
          headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
          headerStyle:{
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
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
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
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
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
          
 
    }
  },
  update:{
    screen:UpdateProfile,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:"Update Profile",
          headerStyle:{
            backgroundColor:"#EC9B44",
            height:90,
            borderBottomColor:"#757575"
          },
          headerTitleStyle: { color: '#3a455d' }
         }
          
 
    }
  }

})



 const HomeTabNavigator=createBottomTabNavigator({
    Home:{
       screen:HomeStack,
       navigationOptions:{
         
       tabBarIcon:({tintColor})=>(<Icon name="ios-home" color={tintColor} size={24}/>),
      
       
      }
    },
    Notifications:{
      screen:NotificationsStack,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(<Icon name="md-notifications" color={tintColor} size={24}/>)
      }
    },
    Profile:{
      screen:ProfileStack,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(<Icon name="md-contact" color={tintColor} size={24}/>)
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
    
});



const HomeStackNavigator=createStackNavigator({
  HomeTabNavigator :HomeTabNavigator
},{
   defaultNavigationOptions:({navigation})=>{
     return{
         headerLeft:(<Icon style={{paddingLeft:10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />),
         headerStyle:{
          backgroundColor:"#EC9B44",
          height:90,
          borderBottomColor:"#757575"
         }
        }
         

   }
})



export default HomeStackNavigator;