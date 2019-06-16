import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator
    ,StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native'
import {getSubServices,getServices} from "./../store/Actions/projectActions"
import {List,ListItem,Avatar,SearchBar } from 'react-native-elements';
import {connect}   from "react-redux";
import {TouchableScale} from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import * as Animatable from 'react-native-animatable';
import Icon from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';
import { firebase } from 'firebase';
import { Fbconfig } from './../firebase/firebase';


// <Text>{this.props.navigation.state.params.ServiceName} </Text>

class ServiceSubCat extends Component{
      
  constructor(props){
      super(props);
    this.state={
        subServices:[],
        loading:false
    }
  }
   

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.ServiceName}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
       
    });

    
    componentDidMount(){ 
        this.app =Fbconfig
        this.setState({
          loading:true
        })
        this.database= this.app.database().ref("SubServices");
        const serviceName=this.props.navigation.state.params.ServiceName
        this.database.orderByChild('ServiceName').equalTo(serviceName).on('value',snapshot=>{
            const subServiceObject=snapshot.val()
            if( subServiceObject!==null){
           const subServiceList =Object.keys(subServiceObject).map(key=>({
            ...subServiceObject[key],
            uid:key
           }));
          this.setState({
            subServices:subServiceList,
            loading:false
          })
        }
        })
    
       
    }
    
    renderHeader=()=>{
      return <SearchBar placeholder="Search for Service Here...."  lightTheme round   />
    }
  
    renderFooter=()=>{
      if(!this.state.loading) return null;
      return(
        <View style={{paddingVertical:20,borderTopWidth:1,borderTopColor:"#CED0CE"}}>
          <ActivityIndicator animating size="large" />
        </View>
      )
    }
    // <ListItem
    //                      title={`${item.subServiceName}`}
    //                      subtitle={item.subServiceID}

    //                  />
       
    render(){


       
          if(this.state.subServices.length  ){
            const subservices=this.state.subServices
           
          
            
           
        return(

     <SafeAreaView style={styles.safeAreaView}> 
        <View style={styles.container}>
       
         
  
         
     
     <View>
     
      
     </View>
    
     <ScrollView 
     scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      
  >
    
       <FlatList
       data={subservices}
       renderItem={({item})=>{
          
       return(
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate("providers",{Sub:item})}}>
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
           
              
                title={`${item.subServiceName}`}
                titleStyle={{ color: 'black', fontWeight:'bold' }}
                subtitleStyle={{ color: 'black' }}
                leftAvatar={<Avatar rounded large source={{uri:item.subImage}} width={65} height={65} borderRadius={5}/>}
                subtitleNumberOfLines={5}
                chevronColor="white"
                 chevron
                
            />
            </Animatable.View>
            </TouchableOpacity>
         
       )}}
       keyExtractor={(item, index) => index.toString()}
       ListHeaderComponent={this.renderHeader}
       ListFooterComponent={this.renderFooter}
     
     /> 

           
  </ScrollView>
    </View>
  </SafeAreaView>
            
         
         
        )
    }else{
        return(
        <View style={styles.Loadcontainer}>
           <ActivityIndicator  animating  size='large' />
        </View>
        )
    }
    }
}
  


const mapStateToProps=(state)=>{
    return{
     
       Services:state.serviceProject.services
    }
 }

const mapDispatchToProps=(dispatch)=>{
  return{
      onLoadServices:()=>dispatch(getServices())
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
        backgroundColor:"#F0FFFF"
      },
      cardContainer: {
        borderStyle:"solid",
        borderRadius:10,
        borderTopWidth:1,
        flexDirection:'row',
       
        paddingTop:10,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:"grey",
        paddingLeft:50,
        paddingRight:50,
        paddingBottom:10,
        backgroundColor:"#ffffff",
        
      
      }
    
})
 
export default connect(mapStateToProps,mapDispatchToProps) (ServiceSubCat);