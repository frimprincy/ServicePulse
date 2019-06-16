import React,{Component} from "react";
import {View,
    ActivityIndicator,
         StyleSheet,
            
      } from "react-native";
import { createStackNavigator } from 'react-navigation';
import firebase  from 'firebase';
import Icon from '@expo/vector-icons/Ionicons';
import signUpStack from './signUpScreen';


class LoadingScreen1 extends Component{
        
       componentDidMount(){
           this.checkIfLogged()
       }
      

       checkIfLogged=()=>{
           firebase.auth().onAuthStateChanged(
               function(user){
               if(user){
                    this.props.navigation.navigate('Main');
               }else{
                this.props.navigation.navigate('SignUp');
               }
           }.bind(this)
        );
       }
        
    render(){
        return(
            <View style={styles.container}>
              <ActivityIndicator  size="large" />
            </View>
        )

        
    }
}


const LoadingStack2= createStackNavigator({
      Loading2:{
          screen:LoadingScreen1,
              headerTitle:"ServicePulse Provider",
               navigationOptions:{
                   header:null
               }
                
               
            
      }
      , SignUp:{
        screen:signUpStack,
        navigationOptions:({navigation})=>{
            return{
              headerTitle:"SignUp",
                headerStyle:{
                  backgroundColor:"white",
                  height:90,
                  borderBottomColor:"white", 
                },
                headerTitleStyle: { color: '#3a455d',textAlign:'center',alignSelf:'center' }
               }
            }
      
    }
    
   
   


})



const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#ffffff"
    }
})


export default LoadingStack2