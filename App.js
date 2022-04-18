import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Routes } from './src/routes'
import { AuthProvider } from './src/contexts/auth'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" style="light" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
