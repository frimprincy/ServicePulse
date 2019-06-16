import React,{Component} from "react";
import Star from 'react-native-star-view';
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
    Dimensions,
    Linking
} from 'react-native';
import { CardViewWithImage ,CardView} from 'react-native-simple-card-view'
import Commercial from "./commercial.jpg";
import {Permissions} from 'expo'
import  MapView,{ Marker } from 'react-native-maps';
import Icon from '@expo/vector-icons/Ionicons';
import { Fbconfig } from './../firebase/firebase';
import Polyline from "@mapbox/polyline";


class ProvidersDetails extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.provider.fname}` +"  " +`${navigation.state.params.provider.Lname}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
           
        });

    state={
        AreaSub:[],
        longitude:null,
        latitude:null,
        deslongitude:null,
        deslatitude:null,
        coords:[],
        desCoords:{
            latitude:null,
            longitude:null,
           
        
        }
       ,
       name:"",
       vicinity:'',
       icon:'',
       time:"",
       distance:'',
       contact:''
        
       
    }

   async  componentDidMount(){
        const providerItem =this.props.navigation.state.params.provider
          const {status} =await Permissions.getAsync(Permissions.LOCATION)
          if(status!='granted'){
              const response =await Permissions.askAsync(Permissions.LOCATION)
          }

 
        
      this.setState({
          deslongitude:providerItem.lng ,
          deslatitude:providerItem.lat ,
          desCoords:{
            latitude:providerItem.lat  ,
            longitude:providerItem.lng ,
           
          },
          name:providerItem.fname,
          vicinity:providerItem.destination,
          icon:"",
          contact:providerItem.contact
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
                let points = Polyline.decode(resp.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                  return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
                  })
   
   
                 this.setState({coords:coords,
                   time:time,
                   distance:distance
                })
             })
          
                
            
            
        }catch(error){
            console.log('Error:',error)
        }
    }


    callHandler=()=>{
        const contact=this.state.contact
        Linking.openURL(`tel:${contact}`)
    }

   render(){
    
       const longitude=this.state.longitude
       const latitude=this.state.latitude
       const coords=this.state.coords
        const time=this.state.time
        const distance=this.state.distance
        const icon=this.state.icon
        const contact=this.state.contact
        const vicinity=this.state.vicinity
        
         
         if(latitude){
       return(
           <View style={{flex:1}}>
     <View style={{
              paddingTop:4,
            height:65,
            alignItems:'center',
            backgroundColor:'white',
            marginBottom:50
            
      }}>
          
      <Text style={{fontWeight:'bold'}}>Estimated Time:{time}</Text>
      <Text style={{fontWeight:'bold'}}>Estimated Distance:{distance}</Text>
      <Text style={{fontWeight:'bold',color:'blue'}}>Vicinity:{vicinity}</Text>
      <Text style={{fontWeight:'bold',color:'blue'}}>contact:{contact}</Text>
         <View 
         style={{
              flexDirection:'row',
              justifyContent:'space-between',
              
            }}
          >
          <TouchableOpacity onPress={this.callHandler()}>
           <View >
          <View style={{paddingHorizontal:13}} ><Icon style={{color:"red",marginTop:2}}   name="ios-call" size={30}  /></View>
          </View>
          </TouchableOpacity>
          <View style={{paddingHorizontal:13}}><Icon style={{color:"purple",marginTop:2}}  name="ios-mail" size={30} /></View>
        </View>
      </View>
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
            title={this.state.name} 
            description={this.state.vicinity}         
            coordinate={this.state.desCoords}
           
         />

            <MapView.Polyline
              strokeWidth={3}
              strokeColor="red"
              coordinates={coords}

            />
           
            </MapView>
       
         </View>
       )
    }else{
        return(
            <View style={styles.Loadcontainer}>
                
               <ActivityIndicator size='large'/>
               
            </View>
        )
    }
   }
}


const styles=StyleSheet.create({
    safeAreaView:{
        flex:1,
        backgroundColor:'#E8E8E8'
      },
      container: {
        flex: 1,
        backgroundColor:'#E8E8E8',
       
      },
      Loadcontainer:{
                 flex:1,
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"#F0FFFF"}

    })
export default  ProvidersDetails





// <SafeAreaView style={styles.safeAreaView}> 
     
// <View style={styles.container}>

//      <View style={{ height:230,width:400,backgroundImage:"url(" + Commercial + ")",
//         borderColor:'#8c7373'}}
//         >
//        <ImageBackground source={Commercial} style={{width: '100%', height: '100%'}}>
//       <View style={{marginTop:120,marginLeft:20}}>
//       <CardViewWithImage
   
//         width={310}
//        content={ 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!' }
//        source={ {uri: 'https://placeimg.com/640/480/tech'} }
//        title={"frim" }
//        buttonComponent={ <Button title="Click here to view Location"  color='#00bfff' style={{borderRadius:15,height:30}} /> }
//        imageWidth={ 100 }
//        imageHeight={ 100 }
//        onPress={() => console.log("CardViewWithImage Clicked!")}
//        roundedImage={ true }
//        roundedImageValue={ 50 }
//        imageMargin={ {top: 10} }
// />


// </View>
// </ImageBackground>
// </View>

//    </View>
   
// </SafeAreaView>