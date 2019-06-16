import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import {ListItem,Avatar,List } from 'react-native-elements';
import {TouchableScale} from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import * as Animatable from 'react-native-animatable';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from "firebase"


class Profile extends React.Component {
     
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

  componentWillMount(){
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

  sigunOutHandler=()=>{
    firebase.auth().signOut().then(function() {
      Alert.alert("you have signout")
    }, function(error) {
      
    });
  }
  render() {
           if(this.state.photoUrl){
    return (

          <View style={styles.container}>
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
              title={this.state.name}
              subtitle={this.state.email}
              titleStyle={{ color:'#2F4F4F', fontWeight:'bold' }}
              subtitleStyle={{ color:'#2F4F4F' }}
              leftAvatar={<Avatar rounded large source={{uri:this.state.photoUrl}} width={70} height={70} />}
              rightIcon={<TouchableOpacity onPress={()=>{this.props.navigation.navigate("update",{id:this.state.uid})}}><Text style={styles.iconStyle} > <Icon style={{marginTop:20}} color={'#2F4F4F'} name={'md-create'} size={20} /> </Text></TouchableOpacity>}
              bottomDivider
              topDivider
              subtitleNumberOfLines={5}
           
        />


            <View style={{marginTop:12}}>
             <TouchableOpacity onPress={()=>{this.props.navigation.navigate("About")}}>
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
      
          roundAvatar={true}
           subtitle='About Service Pulse'
           subtitleStyle={{ color: '#2F4F4F', justifyContent:"flex-start" }}
           leftIcon={ <Icon  color={'#ff4000'} name={'md-wallet'} size={26} /> }
           bottomDivider
           topDivider
           subtitleNumberOfLines={5}
           chevronColor="white"
           chevron
          
           />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Help")}}>
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
   
           roundAvatar={true}
           subtitle='Help Center'
           subtitleStyle={{ color: '#2F4F4F', justifyContent:"flex-start" }}
           leftIcon={ <Icon  color={'#ffff00'} name={'md-information-circle-outline'} size={26} /> }
           bottomDivider
           topDivider
           subtitleNumberOfLines={5}
           chevronColor="white"
           chevron
       
        />
       </TouchableOpacity>
        

     <TouchableOpacity>
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

       roundAvatar={true}
       subtitle='Rate ServicePulse'
       subtitleStyle={{ color: '#2F4F4F', justifyContent:"flex-start" }}
       leftIcon={ <Icon  color={'#00ff80'} name={'ios-star-outline'} size={26} /> }
       bottomDivider
       topDivider
       subtitleNumberOfLines={5}
       chevronColor="white"
        chevron

     />
     </TouchableOpacity>

    <TouchableOpacity >  
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

     roundAvatar={true}
     subtitle='Terms and Privacy'
     subtitleStyle={{ color: '#2F4F4F', justifyContent:"flex-start" }}
     leftIcon={ <Icon  color={'#00ffff'} name={'ios-cloudy'} size={26} /> }
     bottomDivider
     topDivider
     subtitleNumberOfLines={5}
     chevronColor="white"
     chevron

   />
 </TouchableOpacity>
 <TouchableOpacity onPress={this.sigunOutHandler}>
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

          roundAvatar={true}
          subtitle='SignOut'
          subtitleStyle={{ color: '#2F4F4F', justifyContent:"flex-start",marginLeft:6 }}
          leftIcon={ <Icon  color={'#FFA500'} name={'md-log-out'} size={26} /> }
          bottomDivider
          topDivider
          subtitleNumberOfLines={5}
          chevronColor="white"
         chevron
 
      />
     </TouchableOpacity>      
     </View> 
     </View>
    )
  }else{
    return(
      <View>
           <ActivityIndicator size="large"   />
      </View>
    )
  }
  }
}


const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },

  iconStyle:{
    width: 45, 
    height: 40, 
    borderRadius: 50, 
    borderWidth: 1, 
    borderColor: 'cyan',
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:15,
    paddingTop:7,
    backgroundColor:"cyan",
    opacity:2
    
  }
})

export default  Profile