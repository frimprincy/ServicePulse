import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import RootReducer from './components/store/Reducer/rootReducer';

import AppNavigator from './navigation/AppNavigator';



import * as firebase from "firebase";
import "firebase/storage"


import { firebaseConfig } from './components/config';
firebase.initializeApp(firebaseConfig);
export  const storage = firebase.storage();
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
