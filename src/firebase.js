import firebase from 'firebase';

const config = {
    apiKey: " AIzaSyD171JlVqOtoIazJqtdnl86IMCnHlz6vUw ",
    authDomain: "chatter-75bc1.firebaseapp.com",
    databaseURL: "https://chatter-75bc1.firebaseio.com",
    projectId: "chatter-75bc1",
    storageBucket: "chatter-75bc1.appspot.com",
    messagingSenderId: "23062341607"
}

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();

export default firebase;