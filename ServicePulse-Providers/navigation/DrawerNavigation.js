
import React from 'react';
import {createDrawerNavigator,DrawerItems,createStackNavigator} from 'react-navigation';
import HomeStackNavigator from './MainTabNavigator';
import { SafeAreaView, ScrollView, View, Image, Text, ImageBackground,ActivityIndicator } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import ProfileScreen from './../screens/ProfileScreen';
import firebase from "firebase"
import About from './../components/project/AboutServicePulse';
import Help from './../components/project/help';
import Terms from './../components/project/Terms';



class  CustomDrawerNavigation extends React.Component{
  constructor(props){
    super(props)
    this.state={
     name:"", 
    email:'',
    photoUrl:'', 
    uid:'',
   emailVerified:'',
   data:[]
     
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
  const email=user.email
  const ref= firebase.database().ref("AssignedProviders");
    ref.orderByChild("email").equalTo(email).on("value",snap=>{
      const currentProvider=snap.val()
      if( currentProvider!==null){
       const ProvidersList =Object.keys(currentProvider).map(key=>({
        ...currentProvider[key],
        uid:key
       }));
      this.setState({
        data:ProvidersList,
        loading:false,
        fname:ProvidersList[0].fname,
        lname:ProvidersList[0].Lname,
        photoUrl:ProvidersList[0].profilePicture,
      })
  
      
    }
    })                  
  }
    }
  render(){

    if(this.state.data.length){
    
  return(
  
  
   <SafeAreaView style={{flex:1}}>
  
   <ImageBackground source={require('./drawerNav.jpeg')}
   style={{flex:1}}> 
    <View style={{height:300,alignItems:"center",
    justifyContent:"center"}}>
     
     <Image source={{uri:this.state.photoUrl}} style={{height:120,width:120,borderRadius:60}} />
      <Text style={{color:'white'}}>{this.state.fname + "" +this.state.lname}</Text>
      <Text style={{color:'white'}}>{this.state.email}</Text>
      
    </View>
    </ImageBackground>
     <ScrollView>
     <DrawerItems {...this.props} />
     </ScrollView>
     
   </SafeAreaView>
)}else{
  return(
    <View><ActivityIndicator  size="large"  /></View>
  )
}

  }
  
}
 const AppDrawer= createDrawerNavigator({
  Home:{
          screen:HomeStackNavigator,
          navigationOptions:{
              drawerIcon:({tintColor})=>(<Icon name="md-locate" color={tintColor} size={24}/>)
            
          }
        },
        Profile:{
          screen:ProfileScreen,
          navigationOptions:{
            drawerIcon:({tintColor})=>(<Icon name="md-contact" color={tintColor} size={24}/>)
          
        }
        },
        About:{
          screen:About,
          navigationOptions:{
            drawerIcon:({tintColor})=>(<Icon name="md-information-circle" color={tintColor} size={24}/>)
          
        }
        },
        Help:{
          screen:Help,
          navigationOptions:{
            drawerIcon:({tintColor})=>(<Icon name="md-help-circle" color={tintColor} size={24}/>)
          
        },
        
        },
        Terms:{
          screen:Terms,
          navigationOptions:{
            drawerIcon:({tintColor})=>(<Icon name="md-analytics" color={tintColor} size={24}/>)
          
        },
        
        }
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



















