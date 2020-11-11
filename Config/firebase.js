import * as firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz25MC-nLNDVWOBR9NNXKPd0ggQbD5bAk",
    authDomain: "reactfirebase-319bc.firebaseapp.com",
    databaseURL: "https://reactfirebase-319bc.firebaseio.com",
    projectId: "reactfirebase-319bc",
    storageBucket: "reactfirebase-319bc.appspot.com",
    messagingSenderId: "747955086217",
    appId: "1:747955086217:web:5d96f297fc4906feedb758",
    measurementId: "G-DWMSFXKCDL"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;