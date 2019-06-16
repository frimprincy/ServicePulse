import * as firebase from "firebase";
import "firebase/storage"



 // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDNUc1tvYgj2Rx8yMOCcdHsWpyfh_dlOqI",
    authDomain: "servicepulse-5a75b.firebaseapp.com",
    databaseURL: "https://servicepulse-5a75b.firebaseio.com",
    projectId: "servicepulse-5a75b",
    storageBucket: "servicepulse-5a75b.appspot.com",
    messagingSenderId: "783676123973"
  };
   export const Fbconfig= firebase.initializeApp(config);

  export  const storage = firebase.storage();

  export { 
    storage as default}