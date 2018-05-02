import * as firebase from 'firebase';

const prodConfig = {
  apiKey: 'AIzaSyBPVL-vhOE3_Dy1xkmVzJ7H9TnL0myFJc8',
  authDomain: 'pineridgeprovides.firebaseapp.com',
  databaseURL: 'https://pineridgeprovides.firebaseio.com',
  projectId: 'pineridgeprovides',
  storageBucket: '',
  messagingSenderId: '20117640254',
};

const devConfig = {
  apiKey: "AIzaSyBPVL-vhOE3_Dy1xkmVzJ7H9TnL0myFJc8",
  authDomain: "pineridgeprovides.firebaseapp.com",
  databaseURL: "https://pineridgeprovides.firebaseio.com",
  projectId: "pineridgeprovides",
  storageBucket: "pineridgeprovides.appspot.com",
  messagingSenderId: "20117640254"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

export {
  db,
  auth,
  provider
};
