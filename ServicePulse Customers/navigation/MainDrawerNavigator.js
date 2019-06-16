import React from 'react';
import {createDrawerNavigator,DrawerItems,createStackNavigator} from 'react-navigation';
import HomeStackNavigator from './MainTabNavigator'
import Home from '../screens/HomeScreen';
import Notifications from '../screens/NotificationScreen';
import Profile from '../screens/ProfileScreen';
import { SafeAreaView, ScrollView, View, Image, Text, ImageBackground,ActivityIndicator } from 'react-native';
import Filling from './../screens/ap.jpg';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from "firebase"
import About from './../components/projects/About';
import Help from './../components/projects/help';



class  CustomDrawerNavigation extends React.Component{
  constructor(props){
    super(props)
    this.state={
     name:"", 
    email:'',
    photoUrl:'', 
    uid:'',
   emailVerified:''
     
    }
    
  }
  
    componentDidMount(){
    const user = firebase.auth().currentUser;
     if (user != null) {
     
    this.setState({
    name:user.displayName,
    email:user.email,
    photoUrl:user.photoURL,
    uid:user.uid  
  })               
                     
  }
    }
  render(){
    if(this.state.photoUrl){
    
  return(
  
  
   <SafeAreaView style={{flex:1}}>
  
   <ImageBackground source={require('./drawerNav.jpeg')}
   style={{flex:1}}> 
    <View style={{height:200,alignItems:"center",
    justifyContent:"center"}}>
     
     <Image source={{uri:this.state.photoUrl}} style={{height:70,width:80,borderRadius:60}} />
      <Text style={{color:'white'}}>{this.state.name}</Text>
      <Text style={{color:'white'}}>{this.state.email}</Text>
      
    </View>
    </ImageBackground>
     <ScrollView>
     <DrawerItems {...this.props} />
     </ScrollView>
     
   </SafeAreaView>
)
    }else{

      return(
      <View>
        <ActivityIndicator  />
      </View>
      )
    }

}

}
 const AppDrawer= createDrawerNavigator({
    Home:{
      screen:HomeStackNavigator,
      navigationOptions:{
          drawerIcon:({tintColor})=>(<Icon name="md-home" color={tintColor} size={24}/>)
        
      }
    },
    Profile:{
      screen:Profile,
      navigationOptions:{
        drawerIcon:({tintColor})=>(<Icon name="md-contact" color={tintColor} size={24}/>)
      
    }
    },
    Notifications:{
      screen:Notifications,
      navigationOptions:{
        drawerIcon:({tintColor})=>(<Icon name="md-notifications" color={tintColor} size={24}/>)
      
    }
    },
    About:{
      screen:About,
      navigationOptions:{
        drawerIcon:({tintColor})=>(<Icon name="md-information-circle-outline" color={tintColor} size={24}/>)
      
    }
    },
    Help:{
      screen:Help,
      navigationOptions:{
        drawerIcon:({tintColor})=>(<Icon name="md-help-circle-outline" color={tintColor} size={24}/>)
      
    }
    },
},{
  contentComponent:CustomDrawerNavigation,
  contentOptions:{
    activeTintColor:'#78BAC4'
  }
})

const AppDrawerStackNavigator=createStackNavigator({
  AppDrawer :{
    screen:AppDrawer,
     navigationOptions:{
       header:null
     }
  }
})

export default AppDrawerStackNavigator  ;