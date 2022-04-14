import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Start from "./components/Start";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute"; 

function App() {
  return (
    <>
    <Container 
      className="d-flex align-items-center justify-content-center" 
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{maxWidth: "400px"}}>
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
              
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>   
    </>
  )
}

export default App;
