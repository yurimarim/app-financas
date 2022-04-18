import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyB_xEnEomzDO6GgpN3_4_J2PkdV5PzCdDo',
  authDomain: 'financas-app-e9c2d.firebaseapp.com',
  projectId: 'financas-app-e9c2d',
  storageBucket: 'financas-app-e9c2d.appspot.com',
  messagingSenderId: '582690718525',
  appId: '1:582690718525:web:0213c4865c396770e6bb54'
}

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

export default firebase
