import React, { useState, useEffect, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '../services/firebaseConnection'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@auth_user')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }

    loadStorage()
  }, [])

  // Sign In user
  async function signIn(email, password) {
    setLoadingAuth(true)
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid
        await firebase
          .database()
          .ref('users')
          .child(uid)
          .once('value')
          .then(snapshot => {
            let data = {
              uid: uid,
              name: snapshot.val().name,
              email: value.user.email
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
          })
      })
      .catch(err => {
        alert(`Error: ${err.code}`)
        setLoadingAuth(false)
      })
  }

  // Sign Up user
  async function signUp(email, password, name) {
    setLoadingAuth(true)
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid
        await firebase
          .database()
          .ref('users')
          .child(uid)
          .set({
            balance: 0,
            name: name
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
          })
          .catch(err => {
            alert(err)
            setLoadingAuth(false)
          })
      })
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('@auth_user', JSON.stringify(data))
  }

  async function signOut() {
    await firebase.auth().signOut()
    await AsyncStorage.clear().then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        loadingAuth,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
