import React, { useContext, useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../firebase'
import { RecaptchaVerifier } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
   
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)    
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)    
  }

  function logout() {
    return auth.signOut()
  }

  function resetPass(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updatePhoneNumber(number) {
    return currentUser.updatePhoneNumber(number)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function googleSignIn() {
    return auth.signInWithPopup(googleAuthProvider);
  }

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return auth.signInWithPhoneNumber(number, recaptchaVerifier);
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsub
  }, [])
  
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPass,
    updateEmail,
    updatePassword,
    updatePhoneNumber,
    googleSignIn,
    setUpRecaptcha
  }

  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}