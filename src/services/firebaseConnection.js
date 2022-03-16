import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
  apiKey: 'AIzaSyAK0EAjvICnZJ4b8CI0Ne3qMQIh4fL836A',
  authDomain: 'app-financas-a5e96.firebaseapp.com',
  projectId: 'app-financas-a5e96',
  storageBucket: 'app-financas-a5e96.appspot.com',
  messagingSenderId: '258875141050',
  appId: '1:258875141050:web:63a1c5af72d8f488594b83'
}

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

export default firebase
