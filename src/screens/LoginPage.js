import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4EiIkKK3aIFbAAWSI0V39ZhN2r-4T9eY",
  authDomain: "campuslyft.firebaseapp.com",
  projectId: "campuslyft",
  storageBucket: "campuslyft.appspot.com",
  messagingSenderId: "564925939440",
  appId: "1:564925939440:web:0e6dff74b11d83ad1d0c35",
  measurementId: "G-65F4DVS21Z"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = async () => {
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
      setMessage('Verification code sent to your phone.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      setMessage('Error sending verification code. Please try again.');
    }
  };

  const handleSignIn = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await firebase.auth().signInWithCredential(credential);
      setMessage('Phone number authenticated successfully.');
    } catch (error) {
      console.error('Error verifying code:', error);
      setMessage('Error verifying code. Please try again.');
    }
  };

  return (
    <div>
      <h2>Phone Authentication</h2>
      <div>
        <label>Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button onClick={handleSendCode}>Send Verification Code</button>
      </div>
      <div>
        <label>Verification Code:</label>
        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        <button onClick={handleSignIn}>Verify Code</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PhoneAuth;
