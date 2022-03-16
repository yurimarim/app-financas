import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
// import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import firebase from './src/services/firebaseConnection'
import { Routes } from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#131313" style="light" />
      <Routes />
    </NavigationContainer>
  )
}
