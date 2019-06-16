import React from 'react';
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux"

import {  StyleSheet, View,SafeAreaView ,ScrollView,Image} from 'react-native';;
import AppNavigator from './navigation/AppNavigator';
import RootReducer from './components/store/Reducers/rootReducer';
import thunk from 'redux-thunk';

const store =createStore(RootReducer,applyMiddleware(thunk))
export default class App extends React.Component {
  

  render() {
   
      return (
        <Provider store={store}>
          <View style={styles.container}>
       
               <AppNavigator />
         
          

          </View>

        </Provider>
      ); 
    }
  }
  

  
  


 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
