import React,{Component} from "react";
import {View,ActivityIndicator,
         StyleSheet    
      } from "react-native";
import { createStackNavigator } from 'react-navigation';


import SignInScreen from './sigInScreen';
import  firebase  from 'firebase';


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
                this.props.navigation.navigate('SignIn');
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


const LoadingStack1= createStackNavigator({
      Loading1:{
          screen:LoadingScreen1,
          navigationOptions:{
            header:null
        }
      }
      , SignIn:{
        screen:SignInScreen,
        navigationOptions:({navigation})=>{
            return{
              headerTitle:"SignIn",
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
        backgroundColor:"white"
    }
})


export default LoadingStack1