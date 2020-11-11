/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';
import fire from '../Config/firebase';
import * as Google from 'expo-google-app-auth';
//import { GoogleSignin } from '@react-native-community/google-signin';
//import auth from '@react-native-firebase/auth';
//import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as Facebook from 'expo-facebook';
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: true,
      visible: true,
    };
  }
  fblogin = async () => {
    try{
      await Facebook.initializeAsync({
        appId:'1663864883782116',
      });
      const{
        type,token,expirationDate,permissions,declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions:['public_profile'],
      });
      if (type === 'success'){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!',`Hi ${(await response.json()).name}`)
      }else{

      }
    } catch({message}){
      alert(`facebook login error: ${message}`)
    }
  }
 login(){
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
      console.log('User account logged in!');
    })
    .catch(error => {
      console.error(error);
    });
  }
  handleEmailChange(inputName,inputValue) {
    const validate = !(inputValue.lenth === 0) && (inputValue.includes('@'));
    visible= false;
    this.setState(state => ({
      ...state,
      email: inputValue,
      validate,
      visible // <-- Put square brackets
    }
    ));
    console.log(this.state.validate);

  }
  handlePasswordChange(inputName,inputValue) {
    this.setState(state => ({
      ...state,
      password: inputValue,
      // <-- Put square brackets
    }
    ));
    console.log(this.state.password);

  }

  google = async () => {
    try{
    const result = await Google.logInAsync({
      behavior:'web',
      androidClientId: '747955086217-84v64fgvj0h3gsisv91eml2l31am493n.apps.googleusercontent.com',
      scopes: ['profile','email'],
    })

    if (result.type === 'successs') {
      return result.accessToken;

    }else{
      return{ cancelled : true};
    }
  }catch(e){
    return {error: true}
  }
   

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            editable
            PlaceholderTextColor="#ABB4BD"
            value={this.state.email}
            onChangeText={value => this.handleEmailChange('email', value)}
          />
        </View>
        {!this.state.validate && <Text>klg</Text>}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry
            PlaceholderTextColor="#fff"
            value={this.state.password}
            onChangeText={value => this.handlePasswordChange('password', value)}
          />

        </View>
        <TouchableOpacity >
          <Text style={styles.forgot}>Forgot your Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.login.bind(this)} >
          <Text style={styles.loginText} >Login</Text>
        </TouchableOpacity>
<Text style={{fontSize:15,color:'white',marginTop:40,}}>Or Login with social Account</Text>
        <View style={{ flexDirection: 'row',justifyContent: "flex-end",marginTop:5, }}>
              
        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={this.fblogin.bind(this)}>
    <Image
     source={require('../images/facebook.jpg')}
     style={styles.ImageIconStyle}
    />

    </TouchableOpacity>

    <TouchableOpacity style={styles.GoogleStyle} activeOpacity={0.5} onPress={this.google.bind(this)}>
    <Image
     source={require('../images/Google.jpg')}
     style={styles.ImageIconStyle}
    />

    </TouchableOpacity>
    </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F28',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  text:{
    marginBottom: 5,
    color:'white',
    fontSize:12,
  },
  ImageIconStyle:{
    margin: 5,
    height: 25,
    width: 35,
    alignItems: 'center',
  },
  FacebookStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 55,
    borderRadius: 7,
    alignItems: 'center',
    margin: 5,
    paddingLeft: 8,
    paddingRight:8,
    
  },
  GoogleStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 55,
    borderRadius: 7,
    justifyContent: 'flex-end',
    margin: 5,
    paddingLeft: 8,
    paddingRight:8,
    paddingTop: 7,
    paddingBottom:7,
    marginLeft:55,
  },

  inputView: {
    width: 372,
    backgroundColor: '#2A2C36',
    height: 64,
    marginBottom: 7,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    fontSize: 16,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 15,
    paddingLeft:'50%',
  },
  loginBtn: {
    width: 343,
    backgroundColor: '#FFAC30',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

});
