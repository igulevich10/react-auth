import React, {useRef, useState} from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
 
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/dashboard')
    }
    catch {
      setError('Failed to sign in')
    }
    setLoading(false)
  }
  return (
    <> 
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>Welcome back!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required placeholder='Enter your email'/>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required placeholder='Enter your password'/>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>Log In</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2 text-white'>
        Need an account? <Link className='text-white' to='/signup'>Sign Up</Link>
      </div>
   </>
  )
}

