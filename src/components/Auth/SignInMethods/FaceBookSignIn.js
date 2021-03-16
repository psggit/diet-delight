import firebase from './firebaseConfig';

var provider = new firebase.auth.FacebookAuthProvider();
    

export default function signInWithFaceBook(handleSignIn){
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
      
    
        // The signed-in user info.
        var user = result.user;
    
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = credential.accessToken;
    
        // this.signInUser(this.user.email, this.user.uid)
    
        handleSignIn(token, user); 
        console.log(credential)
        console.log(user)
        console.log(token)
    
        // ...
      })
      .catch((error) => {
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













