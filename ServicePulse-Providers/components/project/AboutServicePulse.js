import React,{Coomponent} from 'react'
import { Component } from 'react';
import { View,Text,Button } from 'react-native';


class About extends Component{
    render(){
        return(
           <View style={{flex:1,backgroundColor:"white"}}>
             <Text  style={{justifyContent:"center",alignItems:"center",marginBottom:20,marginTop:100,marginHorizontal:12}}>ServicePulse is an app that is first of is kind.
             The mobile application finds the list of available service renders and display their contact should someone need their help</Text>
           </View>
        )
    }
}

export default About