import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Start from "./components/Start";
import PhoneSign from "./components/PhoneSign";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute"; 
import SuccessPhoneAuth from "./components/SuccessPhoneAuth";

function App() {
  return (
    <>
    <Container className="container">
      <div className="wrapper" >
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Start/>} />
              <Route path='/dashboard' element={<PrivateRoute>
                <Dashboard/>
              </PrivateRoute>} />
              <Route path='/update' element={<PrivateRoute>
                <UpdateProfile/>
              </PrivateRoute>} />
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/forgot-password' element={<ForgotPassword/>} />
              <Route path='/phone-sign' element={<PhoneSign/>}/>
              <Route path='/success-phone-auth' element={<SuccessPhoneAuth/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>   
    </>
  )
}

export default App;
