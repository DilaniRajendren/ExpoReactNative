import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './Authentication/LoginForm';
import SignUpForm from './Authentication/SignUpForm';
import ForgetPassword from './Authentication/Forgetpassword';
export default class App extends Component{
  render(){
    return(
      <LoginForm/>
    )
  }
}
