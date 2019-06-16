import React,{Component} from "react";
import { View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    Dimensions
} from 'react-native';
import {Permissions} from 'expo'
import  MapView,{ Marker } from 'react-native-maps';
import  firebase  from 'firebase';






export default class New extends React.Component {
state={
  longitude:null,
  latitude:null,
  coords:{
    latitude:null,
    longitude:null,
  },
  vicinity:"",
  fname:"",
  lname:""
}


async componentDidMount(){
  const {status} =await Permissions.getAsync(Permissions.LOCATION)
     if(status!='granted'){
        const response =await Permissions.askAsync(Permissions.LOCATION)
     }
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
     latitude:ProvidersList[0].lat,
     longitude:ProvidersList[0].lng,
     coords:{
      latitude:ProvidersList[0].lat,
      longitude:ProvidersList[0].lng,
     
     },
     vicinity:ProvidersList[0].destination,
     fname:ProvidersList[0].fname,
     lname:ProvidersList[0].Lname
    })

    
  }
  })                  
}
  }
    
  render() {

    const longitude=this.state.longitude
       const latitude=this.state.latitude
       const coords=this.state.coords
       if(latitude){
    return (
      
      
      <MapView
      showsUserLocation
         style={{flex:1}}

         initialRegion={{
          latitude:latitude, 
          longitude:longitude, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
         }}
      >

    

      <Marker
      title={this.state.fname + " " + this.state.lname } 
      description={this.state.vicinity}         
      coordinate={this.state.coords}
     
   />


   </MapView>
      
      
      
      
      
      
    )
  }else{
    return(
      <View style={styles.Loading}><ActivityIndicator size="large" /></View>
    )
    
  }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Loading:{
     flex:1,
     justifyContent:"center",
     alignItems:"center"
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
