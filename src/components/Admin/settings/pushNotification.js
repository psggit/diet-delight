import React,{useEffect} from 'react'
import firebase from '../../Auth/SignInMethods/firebaseConfig'



export default function PushNotification(){


    useEffect(() => {
        const messaging = firebase.messaging();
        console.log(messaging)
        messaging.getToken({vapidKey: "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu"}).then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });


    },[])


    return(
        <></>
    );
}
