

import React, {Component} from 'react';
import {View, Button, ToastAndroid} from 'react-native';



 const Toast = (props) => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return null;
    }
    return null;
  };
  

  export default  Toast