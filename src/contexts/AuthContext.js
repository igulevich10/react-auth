import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

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

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePass(password) {
    return currentUser.updatePass(password)
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
    updatePass
  }

  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}