import firebase from './firebaseConfig';

var provider = new firebase.auth.GoogleAuthProvider();


export default function signInWithGoogle(handleSignIn){ 						
firebase.auth()
.signInWithPopup(provider)
.then((result) => {
/** @type {firebase.auth.OAuthCredential} */
var credential = result.credential;
console.log(credential)
// This gives you a Google Access Token. You can use it to access the Google API.
var token = credential.accessToken;
// The signed-in user info.
var user = result.user;
console.log(token,user)

   
handleSignIn(token, user);


console.log(user)
console.log(token)
// ...
}).catch((error) => {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// The email of the user's account used.
var email = error.email;
// The firebase.auth.AuthCredential type that was used.
var credential = error.credential;
console.log(errorCode)
console.log(errorMessage)
console.log(credential)
console.log(email)
// ...
});
}
