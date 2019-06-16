import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import {ListItem,Avatar,List } from 'react-native-elements';
import {TouchableScale} from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import * as Animatable from 'react-native-animatable';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from "firebase"


class ProfileScreen extends React.Component {
     
constructor(props){
  super(props)
  this.state={
   fname:"", 
   lname:"",
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
      email:user.email,  
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

  sigunOutHandler=()=>{
    firebase.auth().signOut().then(function() {
      Alert.alert("you have signout")
    }, function(error) {
      
    });
  }
  render() {

    if(this.state.data.length){
      const data=this.state.data
      const dataList=data.map(provider=>{
        return(
          <ListItem
           key={provider.uid}
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
         title={provider.fname +" " +provider.Lname}
         subtitle={provider.email}
         titleStyle={{ color:'#2F4F4F', fontWeight:'bold' }}
         subtitleStyle={{ color:'#2F4F4F' }}
         leftAvatar={<Avatar rounded large source={{uri:provider.profilePicture}} width={70} height={70} />}
         rightIcon={<TouchableOpacity onPress={()=>this.props.navigation.navigate("UpdateProfile",{provider:provider})}><Text style={styles.iconStyle} > <Icon style={{marginTop:20}} color={'#2F4F4F'} name={'md-create'} size={20} /> </Text></TouchableOpacity>}
         bottomDivider
         topDivider
         subtitleNumberOfLines={5}
      
   />
        )
      })
    

    return (

          <View style={styles.container}>

            {dataList}
            
           
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
      <View style={styles.Loading}><ActivityIndicator size="large"  /></View>
    )
  }
}
}


const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  Loading:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
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

export default  ProfileScreen