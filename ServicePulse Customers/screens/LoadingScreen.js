import React,{Component} from "react";
import {View,ActivityIndicator,
         StyleSheet    
      } from "react-native";
import { createStackNavigator } from 'react-navigation';

import {Fbconfig} from "./../components/firebase/firebase";
import AuthStack from './Auth/AuthScreen';


class LoadingScreen extends Component{
        
       componentDidMount(){
           this.checkIfLogged()
       }
      

       checkIfLogged=()=>{
           Fbconfig.auth().onAuthStateChanged(
               function(user){
               if(user){
                    this.props.navigation.navigate('MainDrawer');
               }else{
                this.props.navigation.navigate('Auth');
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


const LoadingStack= createStackNavigator({
      Loading:{
          screen:LoadingScreen,
          navigationOptions:{
            header:null
        }
      }
      ,
    
    Auth:{
        screen:AuthStack,
        navigationOptions:{
            header:null
        }
    },
   


})



const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#F0FFFF"
    }
})


export default LoadingStack