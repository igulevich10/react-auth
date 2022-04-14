import React, {useRef, useState} from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
 
  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    } 

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/dashboard')
    }
    catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Getting Started</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required placeholder='Enter your email'/>
            </Form.Group>
              
            <Form.Group id='password' className='mb-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required placeholder='Enter your password'/>
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required placeholder='Confirm password'/>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2 text-white'>
        Already have an account? <Link className='text-white'to='/login'>Log In</Link>
      </div>
   </>
  )
}
