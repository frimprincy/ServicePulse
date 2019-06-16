import React,{Component} from "react";
import _ from 'lodash';   
import * as Animatable from 'react-native-animatable';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from '@expo/vector-icons/Ionicons';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
import {
   View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    YellowBox,
   Alert
   
}from "react-native";
import { createStackNavigator } from 'react-navigation';
import firebase  from 'firebase';
import Geocoder from 'react-native-geocoding';




class UpdateProfile extends Component{
    
    constructor(){
        super()

        this.state={
            fname:'',
            Lname:'',
            email:'',
            phone:'',
            destination:'',
            password:'',
            fnameValidate:true,
            lnameValidate:true,
            emailValidate:true,
            phoneValidate:true,
            cityValidate:true,
            passwordValidate:true,
            fnameError:'',
            LnameError:'',
            emailError:'',
            phoneError:'',
            passwordError:'',
            isLoading:false,
            error:'',
            isError:false,
            latitude:0,
            longitude:0,
            errorPlace:'',
            // destination:"",
            // predictions:[]
            lng:'',
            lat:'',
            date:'',
            data:[],
            proId:"",
            nationIDPicture:"",
            notificationToken:"",
            profilePicture:"",
            Registerdate:''
    
        };
        
    }
     

componentDidMount(){
    const provider=this.props.navigation.state.params.provider
    const email=this.props.navigation.state.params.provider.email
     const id=this.props.navigation.state.params.provider.uid
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
        isLoading:false,
        fname:ProvidersList[0].fname,
        Lname:ProvidersList[0].Lname,
        phone:ProvidersList[0].contact,
        password:ProvidersList[0].password,
        email:ProvidersList[0].email,
        lat:ProvidersList[0].lat,
        lng:ProvidersList[0].lng,
        proId:id,
        Registerdate:ProvidersList[0].Registerdate,
        profilePicture:ProvidersList[0].profilePicture,
        notificationToken:ProvidersList[0].notificationToken,
        nationIDPicture:ProvidersList[0].nationIDPicture,
      })
  
      
    }
    })  




    navigator.geolocation.getCurrentPosition(
        Position=>{
            this.setState({
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            })
        },
        error=>this.setState({errorPlace:error.message}),
        {enableHighAccuracy:true,maximumAge:2000,timeout:2000}
    )

    // this.getData()
    const date = new Date().getDate() 
   const  month =new Date().getMonth() + 1
   const year = new Date().getFullYear()
   const hours = new Date().getHours();
   const min = new Date().getMinutes();
   const sec = new Date().getSeconds();
    
    

    this.setState({
        date:date +'/'+month+'/' + year +' '+ hours+':'+min+':'+sec
    })
}
            
    
     updateInputValue=(text,type)=>{
         textChar=/^[a-zA-Z '.-]+$/
         re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         regPhone = /^[0]?[789]\d{9}$/

         if(type=="fname"){
          if(!textChar.test(text)){
             this.setState({fnameValidate:false,
                fnameError:"Enter a valid Name!",isError:false})
          }else{
         this.setState({
             fnameValidate:true,
             isError:false,
           
             fname:text
         })
        }
        }
    


       
       else if(type=="lname"){
            if(!textChar.test(text)){
               this.setState({lnameValidate:false,
                lnameError:"Enter a valid  name!",isError:false})
            }else{
           this.setState({
               lnameValidate:true,
               Lname:text,
               isError:false
           })
          }
          }

          
     else   if(type=="email"){
            if(!re.test(text)){
               this.setState({emailValidate:false,
                emailError:"Enter a valid email address!",
                isError:false})
            }else{
           this.setState({
               emailValidate:true,
               email:text,
               isError:false
           })
        
          }
          }

             
       else if(type=="phone"){
        if(text.length!=10){
            
           this.setState({phoneValidate:false,
            phoneError:"Enter a valid phone number!",isError:false})
        }else{
       this.setState({
        phoneValidate:true,
           phone:text,
           isError:false
       })
    
      }
      }

     else  if(type=="password"){
        if(text.length<6){
          
           this.setState({passwordValidate:false,
            passwordError:"Enter a password not less than 6!",isError:false})
        }else{
       this.setState({
           passwordValidate:true,
           password:text,
           isError:false
       })
    
      }
      }
     }

     //onchange Destination handler

    //  onChangeDestination= async (destination)=>{
      
    //        this.setState({
    //            cityValidate:true,
    //            isError:false,
    //            destination:destination
    //        })

    //        const apiUrl=`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCtZHP6xV3nisHnepgmnP59lyK8CiuKfxU&input=${destination}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
    //        try{
    //        const result=await fetch(apiUrl);
    //        const json =await result.json();
    //        console.log(json)
    //        this.setState({
    //            predictions:json.predictions
    //        })
    //        }catch(err){
    //            console.log(err)
    //        }
          
          
    //  }


    //  onselectDestination=(value)=>{
    //      this.setState({
    //          destination:value,
    //          predictions:[]
    //      })
    //  }

    submitHandler=()=>{
        
        if( this.state.destination==''){
            this.setState({
                error:"Please enter a  location!",
                isError:true,
                
                
            })
            alert("Please enter a  location!")
        }else{
          this.setState({
              isLoading:true,
              isError:false
          })

          if(this.state.proId){
            const id=this.state.proId
        firebase.database().ref("AssignedProviders/"+id).update({
            email:this.state.email,
            contact:this.state.phone,
            password:this.state.password,
            destination:this.state.destination,
            lat:this.state.lat,
            lng:this.state.lng,
            Registerdate:this.state.date,
            profilePicture:this.state.profilePicture,
            notificationToken:this.state.notificationToken,
            nationIDPicture:this.state.nationIDPicture,
           
        }).then((snap)=>{
            alert("your profile updated succesfully!")
            this.setState({
                isLoading:false
            })
            
        }).catch((error)=>{
              console.log(error)
            this.setState({
                isLoading:false
            }) 
        })

    }else{
        alert("your profile not updated")

        this.setState({
            isLoading:false
        })
    }
    }

}
// <TextInput style={styles.textInput} placeholder="Enter your location.." value={this.state.destination} underlineColorAndroid={'transparent'} onChangeText={(destination)=>this.onChangeDestination(destination,'city')}  />

//getting providers Longitute and latitude

// getData=()=>{
//     Geocoder.init("AIzaSyANUCtR2tCZpCavsh580NcEhrSMf7uq39g");
//     Geocoder.from(this.state.destination)
// 		.then(json => {
// 			const location = json.results[0].geometry.location;
// 			alert(location.lat);
// 		})
// 		.catch(error => console.warn(error));
// }

    render(){

        if(this.state.data.length){
            const data=this.state.data
            const dataList=data.map(providers=>{
                return(
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} key={providers.uid}>
                    <View>
                      <TextInput editable={false}  value={providers.fname} style={[styles.textInput,!this.state.fnameValidate?styles.error:styles.success]} placeholder="First Name*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'fname')}  />
                       <Text style={styles.ErrorInput}>{!this.state.fnameValidate?this.state.fnameError:null}</Text>
                      <TextInput editable={false} value={providers.Lname}  style={[styles.textInput,!this.state.lnameValidate?styles.error:styles.success]}  placeholder="Last Name*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'lname')}  />
                      <Text style={styles.ErrorInput}>{!this.state.lnameValidate?this.state.lnameError:null}</Text>
                      <TextInput value={providers.email}  style={[styles.textInput,!this.state.emailValidate?styles.error:styles.success]} keyboardType={'email-address'} style={styles.textInput} placeholder="Email Address*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'email')}  />
                      <Text style={styles.ErrorInput}>{!this.state.emailValidate?this.state.emailError:null}</Text>
                      <TextInput value={providers.contact} returnKeyType={'next'} style={[styles.textInput,!this.state.phoneValidate?styles.error:styles.success]}
                      keyboardType={'numeric'}   placeholder="Phone Number*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'phone')}  />
                      <Text style={styles.ErrorInput}>{!this.state.phoneValidate?this.state.phoneError:null}</Text>
                      
                      <GooglePlacesAutocomplete
                      placeholder='Enter your location*'
                      minLength={2} // minimum length of text to search
                      autoFocus={false}
                      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                      listViewDisplayed='auto'    // true/false/undefined
                      fetchDetails={true}
                      renderDescription={row => row.description} // custom description render
                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        this.setState({
                            destination:details.formatted_address,
                            lat:details.geometry.location.lat,
                            lng:details.geometry.location.lng
                        })
                      }}
                
                      getDefaultValue={() => ''}
                
                      query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCtZHP6xV3nisHnepgmnP59lyK8CiuKfxU',
                        language: 'en', // language of the results
                        
                      }}
                
                      styles={{
                        textInputContainer: {
                          width: '100%',
                          backgroundColor: '#FFF',
                          borderColor:"black",
                          borderWidth:0.2,
                          borderRadius:5,
                          color:"#000000",
                          
                        },
                        description: {
                          fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb'
                        }
                      }}
                
                    
                      GooglePlacesSearchQuery={{
                          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          rankby: 'distance',
                        
                        }}
                      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI='GooglePlacesSearch'
                      
                     
                
                      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      predefinedPlacesVisibility={true}
                    />





                      
                      <Text style={styles.ErrorInput}>{!this.state.cityValidate?this.state.cityError:null}</Text>
                      <TextInput value={providers.password} secureTextEntry={true}  style={[styles.textInput,!this.state.passwordValidate?styles.error:styles.success]} placeholder="Password*"  underlineColorAndroid={'transparent'} onChangeText={(text)=>this.updateInputValue(text,'password')}  />
                      <Text style={styles.ErrorInput}>{!this.state.passwordValidate?this.state.passwordError:null}</Text>
                      
                    </View>
                  </TouchableWithoutFeedback>
                )
            })
        
        //  <ScrollView>
        // const predictions=this.state.predictions.map(prediction=>
        //     <TouchableOpacity key={prediction.id} onPress={()=>this.onselectDestination(item)}>
        //     <Text  style={styles.suggestions} >{prediction.description}</Text>
        //     </TouchableOpacity>
        // )
        // </ScrollView>
        let submitButtom=(
            <TouchableOpacity style={[styles.bottom,!this.state.fnameValidate ||!this.state.lnameValidate ||!this.state.cityValidate || !this.state.phoneValidate ||!this.state.passwordValidate?styles.disabled:styles.noDisabled]} disabled={!this.state.fnameValidate ||!this.state.lnameValidate ||!this.state.emailValidate ||!this.state.cityValidate || !this.state.phoneValidate ||!this.state.passwordValidate} onPress={this.submitHandler}>
            <Text style={styles.bottomTxt}>Update </Text>    
            
          </TouchableOpacity>
        )

        if(this.state.isLoading){
            submitButtom=<View style={styles.bottomTxt}><ActivityIndicator  size='large'/></View>
        }
        return(
         
        
            <KeyboardAvoidingView style={styles.container}
               behavior="padding"
            
            >
        
               <ScrollView>
                <View style={styles.forms}>
                
                        
                        <Text style={styles.ErrorInput}>{this.state.isError?this.state.error:null}</Text>
                           {dataList}
                      {submitButtom}
                     
                </View>
           </ScrollView>
           </KeyboardAvoidingView>
      
        )
    }else{
        return(
            <View style={styles.Loading}><ActivityIndicator  /></View>
        )
    }
    }
}





const styles = StyleSheet.create({
   
    container: {
      flex:1,
      backgroundColor: '#ffffff',
     
      justifyContent:"center",
      marginTop:10
      
     
    },
    Loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
     },
    forms:{
        alignSelf:'stretch',
        paddingLeft:40,
        paddingRight:40,
        marginBottom:30,
    },

    header:{
        marginTop:10,
        fontSize:24,
        color:"indigo",
        paddingBottom:10,
        marginBottom:40,
        borderBottomColor:"indigo",
        borderBottomWidth:1
    },
    textInput:{
       
        alignSelf:'stretch',
        height:45,
        color:"#000000",
        borderColor:"black",
        borderWidth:0.1,
        borderRadius:5,
        padding:7
    },
    ErrorInput:{
        alignSelf:'stretch',
        marginBottom:30,
        color:"red",
    },
    bottom:{
        alignSelf:'stretch',
        alignItems:"center",
        padding:20,
        backgroundColor:'#59cbbd',
        marginTop:30
    },
    bottomTxt:{
        color:'#fff',
        fontWeight:"bold"
    },
    error:{
       borderWidth:2,
       borderColor:"red" 
    },
    success:{
        borderWidth:0.1,
       borderColor:"black" 
    },
    disabled:{
        backgroundColor:"#eee",
        color:'#aaa',
        borderColor:'#aaa'
    },
    noDisabled:{
        alignSelf:'stretch',
        alignItems:"center",
        padding:20,
        backgroundColor:'#59cbbd',
        marginTop:30
    },
    suggestions:{
        backgroundColor:"white",
        padding:5,
        borderWidth:0.3,
        marginLeft:5,
        marginRight:5
    }
})

// ()=>

export default  UpdateProfile