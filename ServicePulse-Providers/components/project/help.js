import React,{Coomponent} from 'react'
import { Component } from 'react';
import { View,Text,Button } from 'react-native';


class Help extends Component{
    render(){
        return(
           <View style={{flex:1,backgroundColor:"white"}}>
             <Text style={{justifyContent:"center",alignItems:'center',marginTop:100,paddingHorizontal:15}}>Please  Contact our customer care on 0549599528 
             or email us on smartserveapp@gmail.com
             </Text>
             
           </View>
        )
    }
}

export default Help