import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  AppRegistry,
 SafeAreaView,TouchableOpacity,StyleSheet,ScrollView
} from 'react-native';

import { List, ListItem,Avatar,SearchBar } from "react-native-elements";
var _ = require('lodash');

import {connect}   from "react-redux";
import {TouchableScale} from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import * as Animatable from 'react-native-animatable';
import Icon from '@expo/vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Star from 'react-native-star-view';
import { createStackNavigator } from 'react-navigation';
import { Fbconfig } from './../firebase/firebase';
import {Permissions} from 'expo'
import Polyline from "@mapbox/polyline";

export default class  ServiceProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: '',
      Subname:'',
      rate:'',
      distance:'',
      longitude:null,
      latitude:null,
      deslongitude:null,
      deslatitude:null,
    };
  }

 async componentDidMount() {
   const subItems=this.props.navigation.state.params.Sub
   const sub=this.props.navigation.state.params.Sub.subServiceName;

   const subitem =this.props.navigation.state.params.Area
   const {status} =await Permissions.getAsync(Permissions.LOCATION)
   if(status!='granted'){
       const response =await Permissions.askAsync(Permissions.LOCATION)
   }
    
    const dataObject=this.state.data
   
    this.app =Fbconfig
    this.setState({
      loading:true,
      
    })
   
   const ref= this.app.database().ref("AssignedProviders");
    ref.orderByChild('ProvidersService').equalTo(sub).on('value',snap=>{
      const ProvidersObject=snap.val()
      if( ProvidersObject!==null){
     const ProvidersList =Object.keys(ProvidersObject).map(key=>({
      ...ProvidersObject[key],
      uid:key
     }));
    this.setState({
      data:ProvidersList,
      loading:false
    })
    this.setState({
      deslongitude:ProvidersList[0].lng,
      deslatitude:ProvidersList[0].lat,
    })

    
  }
    })

    

    navigator.geolocation.getCurrentPosition(
      (position) => {
              const lat =position.coords.latitude;
                const long = position.coords.longitude;
         

          this.setState({
              latitude:lat,
              longitude:long
          })
                   
              
          this.getDirections()
       
      }

    )


  
  }


  getDirections(){

   if(this.state.deslatitude){
    try{
      let resp =fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=${this.state.deslatitude},${this.state.deslongitude}&key=AIzaSyDNUc1tvYgj2Rx8yMOCcdHsWpyfh_dlOqI`)
      .then(resp=>{
        return  resp.json();
        
      })
       .then(resp=>{
           const response=resp.routes[0]
           
           const distanceTime=response.legs[0]
           const distance =distanceTime.distance.text
           const time =distanceTime.duration.text
          
    


           this.setState({
             distance:distance
          })
       })
    
          
      
      
  }catch(error){
      console.log('Error:',error)
  }
}
}

//   .equalTo(sub).once('value',snapshot=>{
//     const providersObject=snapshot.val()
//     alert(providersObject)
//     if( providersObject!==null){
//    const providersList =Object.keys(providersObject).map(key=>({
//     ...providersObject[key],
//     uid:key
//    }));

//   this.setState({
//     data:providersList,
//     loading:false
//   })
  
// }
// })
  
    
    static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.Sub.subServiceName}`+   ' Near By' ,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},   
     });


 


  renderSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "86%",
         backgroundColor: "#CED0CE",
         marginLeft: "14%"
       }}
     />
   );
  };
 
  renderFooter = () => {
    if(!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  

 
  render() {
    const distance=this.state.distance
    
    return (
      <View>    
   
      <FlatList
        data={this.state.data}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) =>{
   
         
         

          return (
            <TouchableOpacity key={item.uid} onPress={()=>{this.props.navigation.navigate("ProvidersDetails",{provider:item})}}>
            <Animatable.View animation='slideInDown' iterationCount={1}>
            <ListItem
            Component={TouchableScale}
                                friction={90} 
                                tension={100} 
                                activeScale={0.95} 
                                linearGradientProps={{
                                colors: ['#ffffff', '#ffffff'],
                                start: [1, 0],
                                end: [0.2, 0]
                             }}
              roundAvatar
              title={`${item.fname}` }
              subtitle={`${item.destination}`}
              leftAvatar={<Avatar rounded large source={{uri:item.profilePicture}} width={65} height={65} borderRadius={5}/>}
              containerStyle={{ borderBottomWidth: 0 }}
                          chevronColor="white"
                           chevron
            />
            <View
              style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%"
              }}
            /></Animatable.View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={50}
      />
    
      </View>
      
    );
  }
}