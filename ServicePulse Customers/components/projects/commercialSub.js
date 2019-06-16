import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  AppRegistry,
 SafeAreaView,TouchableOpacity,StyleSheet,ScrollView
} from 'react-native';

import { List, ListItem,Avatar,SearchBar } from "react-native-elements";
var _ = require('lodash');

import { Fbconfig } from './../firebase/firebase';
import {connect}   from "react-redux";
import {TouchableScale} from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import * as Animatable from 'react-native-animatable';
import Icon from '@expo/vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Star from 'react-native-star-view';
import { createStackNavigator } from 'react-navigation';

export default class  CommercialSub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: '',
      commercialSubName:'',
      rate:''
    };
  }

  componentDidMount() {
   const sub=this.props.navigation.state.params.commercialSubName;

    
    this.fetchData();
    const dataObject=this.state.data
  
  }


  
    
    static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.commercialSubName}`+   ' Near By' ,
      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},   
     });


  fetchData = () => {
     const PlaceName=this.props.navigation.state.params.commercialSubName
    navigator.geolocation.getCurrentPosition(
            (position) => {
    const latitude = Number(position.coords.latitude.toFixed(6));
    const longitude = Number(position.coords.longitude.toFixed(6));
    const { pageToken } = this.state;
    const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=${PlaceName}&key=AIzaSyDNUc1tvYgj2Rx8yMOCcdHsWpyfh_dlOqI
    `
    const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=${PlaceName}&key=AIzaSyDNUc1tvYgj2Rx8yMOCcdHsWpyfh_dlOqI&pagetoken=${pageToken}`;




    let url = pageToken === '' ? urlFirst : urlNext
    console.log(url);
    this.setState({ loading: true });
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => { 

        const AreaSubData = _.uniqBy( [...this.state.data, ...res.results] , 'id' )
        const SubData = res.results
    const ref =Fbconfig.database().ref('CommecialAreasSub');
    ref.set({
      SubData 
    }).then((data)=>{
     //success callback
    
 }).catch((error)=>{
     //error callback
     alert('error ' , error)
 })
        this.setState({
          siteTitle: "",
          data: pageToken === '' ? res.results : AreaSubData,
          loading: false,
          refreshing: false,
          pageToken: res.next_page_token,
          
        });

      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    })

  };


  renderSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "86%",
         backgroundColor: "#CED0CE",
         marginLeft: "14%"
       }}
     />
   );
  };
  renderHeader = () => {
    return (<Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10}}>{this.state.siteTitle}</Text>)
  };
  renderFooter = () => {

    if (this.state.pageToken === undefined) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        pageToken: '',
        refreshing: true
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleLoadMore = () => {
    this.fetchData();
  };
  render() {
  
    return (
      <View>    
   
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) =>{
   
          const rating = item.rating ? item.rating : '0'
          const ratin = item.rating
         

          return (
            <TouchableOpacity key={item.uid} onPress={()=>{this.props.navigation.navigate("CommercialDetails",{Area:item})}}>
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
              roundAvatar
              title={`${item.name}`+" ("+`${rating}`+")" }
              subtitle={`${item.vicinity}` }
              leftAvatar={<Avatar rounded large source={{uri:item.icon}} width={65} height={65} borderRadius={5}/>}
              containerStyle={{ borderBottomWidth: 0 }}
              rightAvatar={<Star   score={parseInt(`${item.rating}`)}   style={{ width: 80,
                                    height: 20,
                                    }}
                          />}
                          chevronColor="white"
                           chevron
            />
            <View
              style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%"
              }}
            /></Animatable.View>
            </TouchableOpacity>
          )
        }}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    
      </View>
      
    );
  }
}





















// class CommercialSub extends Component{
//     constructor(props){
//         super(props);
//       this.state={
//           commercialSub:[],
//           loading:false,
          
//       }
//     }
    
//     static navigationOptions = ({ navigation }) => ({
//         title: `${navigation.state.params.commercialSubName}`,
//          headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
           
//         });


//         componentDidMount(){ 
//             this.app =Fbconfig
//             this.setState({
//               loading:true
//             })
//             this.database= this.app.database().ref("CommercialSubArea");
//             const AreaName=this.props.navigation.state.params.commercialSubName
//             this.database.orderByChild('AreaName').equalTo(AreaName).on('value',snapshot=>{
//                 const  subCommercialObject=snapshot.val()
//                 if( subCommercialObject!==null){
//                const subCommercialList =Object.keys(subCommercialObject).map(key=>({
//                 ...subCommercialObject[key],
//                 uid:key
//                }));
//               this.setState({
//                 commercialSub:subCommercialList,
//                 loading:false
//               })
//             }
//             })
        
           
//         }

//         onStarRatingPress(rating) {
//           this.setState({
//             starCount:rating
//           });
//         }
      
//     renderHeader=()=>{
//         return <SearchBar placeholder="Search for Service Here...."  lightTheme round   />
//       }
    
//       renderFooter=()=>{
//         if(!this.state.loading) return null;
//         return(
//           <View style={{paddingVertical:20,borderTopWidth:1,borderTopColor:"#CED0CE"}}>
//             <ActivityIndicator animating size="large" />
//           </View>
//         )
//       }
//     render(){

//              if(this.state.commercialSub.length){
//                  const CommercialSub=this.state.commercialSub;
                 
//         return(
//             <SafeAreaView style={styles.safeAreaView}> 
//             <View style={styles.container}>
           
             
      
             
         
//          <View>
         
          
//          </View>
        
//          <ScrollView 
//          scrollEventThrottle={16}
//           showsVerticalScrollIndicator={false}
          
//       >
        
//            <FlatList
//            data={CommercialSub}
//            renderItem={({item})=>{
              
//            return(
//                <TouchableOpacity key={item.uid} onPress={()=>{this.props.navigation.navigate("CommercialDetails",{AreaSubName:item.AreaSubName})}}>
//                  <Animatable.View animation='slideInDown' iterationCount={1}>
//                   <ListItem
//                     Component={TouchableScale}
//                     friction={90} 
//                     tension={100} 
//                     activeScale={0.95} 
//                     linearGradientProps={{
//                     colors: ['#ffffff', '#ffffff'],
//                     start: [1, 0],
//                     end: [0.2, 0]
//                  }}
               
                  
//                     title={`${item.AreaSubName}`}
//                     subtitle={<Star   score={3}   style={{ width: 80,
//                       height: 20,
//                       }}/>}
//                     titleStyle={{ color: 'black', fontWeight:'bold' }}
//                     subtitleStyle={{ color: 'black' }}
//                     leftAvatar={<Avatar large source={{uri:item.AreaSubImage}} width={65} height={65} borderRadius={5}/>}
                   
//                     subtitleNumberOfLines={5}
//                     chevronColor="white"
//                      chevron
                    
//                 />
//                 </Animatable.View>
//                 </TouchableOpacity>
             
//            )}}
//            keyExtractor={(item, index) => index.toString()}
//            ListHeaderComponent={this.renderHeader}
//            ListFooterComponent={this.renderFooter}
         
//          /> 
    
               
//       </ScrollView>
//         </View>
//       </SafeAreaView>
//         )
//     }else{
//         return(
//            <View 
//              style={{  flex:1,
//               alignItems:"center",
//               justifyContent:"center",
//               backgroundColor:"#F0FFFF"}}
//             >
//               <ActivityIndicator animating size="large" />
//            </View>
//         )
//     }
//     }
// }

// const styles=StyleSheet.create({
//     safeAreaView:{
//         flex:1,
//         backgroundColor:'#E8E8E8'
//       },
//       container: {
//         flex: 1,
//         backgroundColor:'#E8E8E8',
       
//       },
//     Loadcontainer:{
//         flex:1,
//         alignItems:"center",
//         justifyContent:"center",
//         backgroundColor:"#F0FFFF"
//       },
//       cardContainer: {
//         borderStyle:"solid",
//         borderRadius:10,
//         borderTopWidth:1,
//         flexDirection:'row',
       
//         paddingTop:10,
//         borderBottomWidth:1,
//         borderLeftWidth:1,
//         borderRightWidth:1,
//         borderColor:"grey",
//         paddingLeft:50,
//         paddingRight:50,
//         paddingBottom:10,
//         backgroundColor:"#ffffff",
        
      
//       }
    
// })
// export default CommercialSub