import { YellowBox } from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
  FlatList
  
} from 'react-native';
import {Card} from 'react-native-elements';
import {connect}  from "react-redux";
import {getServices,getCommercial} from './../components/store/Actions/projectActions'


 class Home extends React.Component {

    

    componentDidMount(){
      this.props.onLoadServices();
      this.props.onLoadCommercial();
    }
 

  render() {
    
    if(this.props.Services.length && this.props.CommercialAreas.length ){
         const services=this.props.Services
          const numColumns=2;
        const Commercial=this.props.CommercialAreas;
        const CommercialList=Commercial.map(comArea=>{
             return(
               <TouchableOpacity  key={comArea.uid} onPress={()=>{this.props.navigation.navigate("CommercialSub",{commercialSubName:comArea.AreaName})}}>
                   <View style={{height:130,width:130,marginLeft:20,borderWidth:0.5,backgroundColor:"white",
                     borderColor:'white'}}
                     >
            
                         <View style={{flex:2}}>
                               <Image source={{uri:comArea.AreaImage}} style={{flex:1,width:null,
                                 height:null,resizeMode:'cover'}} />
                         </View>
                         <View style={{flex:1}} style={{paddingLeft:10,paddingTop:10}}>
                              <Text>{comArea.AreaName}</Text>
                         </View>
                    </View>
               </TouchableOpacity>
             )
        })

      return (
         
        <SafeAreaView style={styles.safeAreaView}> 
            <View style={styles.container}>
          <ScrollView 
            scrollEventThrottle={16}
             showsVerticalScrollIndicator={false}
        >
           
        
         
       <FlatList
       data={services}
       renderItem={({item})=>{
          
       return(
        <Animatable.View animation='bounceInUp' iterationCount={1}>
         <View style={styles.cardContainer} key={item.key}  >
         <View style={{width:170}}>
           <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("ServiceSubCat",{ServiceName:item.names})}}>
             <View style={styles.card} >
              <Image source={{uri:item.image}} style={styles.img}/>
              <Text style={styles.text}>{item.names}</Text>
            </View>
           </TouchableOpacity>
          </View>
         </View>
         </Animatable.View>
       )}}
       keyExtractor={(item, index) => index.toString()}
       numColumns={numColumns}
     /> 
        
     


       <View style={{marginTop:40}}>
         <Text style={{fontSize:20,fontWeight:'100'}}>
         Commercial Areas
         </Text>

          <View style={{height:160,marginTop:20}}>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
           
             {CommercialList}
           
            
            </ScrollView>
          </View>
       </View>
       </ScrollView>
       </View>
       

       </SafeAreaView>
     
        
   
  
    );
  }else{

    return(
     <View  style={styles.Loadcontainer} >
       <ActivityIndicator size='large' />
     </View>
    )
  }
  }  
}


const styles = StyleSheet.create({
  safeAreaView:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  cardContainer: {
   
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingTop:13,
    paddingLeft:2,
    paddingRight:8,  
  
  },
  card:{
    height:130,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    margin: 10,
    width:130,
    paddingLeft:8,
    paddingRight:8,
    borderRadius:5,
    fontWeight:"bold"
    
   
   
  },
  
   img:{
    width: 60, 
    height: 50,
    borderRadius:50,
    margin:14,
    overflow: 'hidden'
   
   }
  ,
  text: {
    backgroundColor: 'transparent',
    color:'#330000'
  },
  Loadcontainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#F0FFFF"
  }
 
});


 const mapStateToProps=(state)=>{
    return{
       Services:state.serviceProject.services,
      CommercialAreas:state.serviceProject.commercialAreas
    }
 }

const mapDispatchToProps=(dispatch)=>{
  return{
      onLoadServices:()=>dispatch(getServices()),
      onLoadCommercial:()=>dispatch(getCommercial())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)  (Home)