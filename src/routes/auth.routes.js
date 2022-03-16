// Auth Routes
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn } from '../pages/SignIn'

const AuthStack = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false
        }}
      />
    </AuthStack.Navigator>
  )
}
