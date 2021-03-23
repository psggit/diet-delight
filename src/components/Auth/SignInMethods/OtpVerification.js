import firebase from './firebaseConfig'



export const renderCaptcha = () => {
  firebase.auth().languageCode = 'en';
  let recaptcha = new firebase.auth.RecaptchaVerifier('sign-up', {
      'size': 'invisible',
      'callback': (response) => {
          // this.phoneAuth();
          this.resendOtp();
          console.log(response)
      }
    });
  // reCaptcha.current = recaptcha;
    
  console.log("Phone auth")
}


export const phoneAuth = async (values, handleRegistration, code, reCaptcha, setOpen, setOtpDialog, setSuccessErrorMessage) => {

  let number = code.current+phoneNumber.current;
  console.log(number)

await firebase.auth().signInWithPhoneNumber(number, reCaptcha.current)
.then((confirmationResult) => {
console.log(window.confirmationResult)
window.confirmationResult = confirmationResult;
console.log(confirmationResult)
handleCodeByUser(confirmationResult, values, handleRegistration, setOpen, setOtpDialog, setSuccessErrorMessage)
}).catch((error) => {
  console.log(error)
});
}


export const handleCodeByUser = (confirmationResult, userValues, handleRegistration, setOpen, setOtpDialog, setSuccessErrorMessage) => {
  setOtpDialog(true)
  var captureButtonClick = document.getElementById('verifyOtp');
  captureButtonClick.onclick =  (e) => {
      console.log(e)
      var otpEntered = document.getElementById('num1').value;
      console.log(otpEntered)
      confirmationResult.confirm(otpEntered).then(async (result) => {
              // User signed in successfully.
              const user = result.user;
              var errorMessage = document.getElementById('successErrorMessageForWrongOtp');
              errorMessage.innerHTML = '';
              console.log(user)
              console.log(user.phoneNumber)
              handleRegistration(userValues, user.phoneNumber)
              setSuccessErrorMessage("Otp Verification Completed")
              setOpen(true);
              setTimeout(() => {
                  setOtpDialog(false)
              },1000)
            }).catch((error) => {
                console.log(error)
                var errorMessage = document.getElementById('successErrorMessageForWrongOtp');
                errorMessage.innerHTML = 'Invalid Otp Please try Again'
            });
  }

  // return otpEntered;
}
