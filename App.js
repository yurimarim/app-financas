import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import firebase from './src/services/firebaseConnection'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Hello World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
