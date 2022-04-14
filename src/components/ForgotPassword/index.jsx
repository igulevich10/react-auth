import React, {useRef, useState} from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPass } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
 
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await resetPass(emailRef.current.value)
      setMessage('Check your mailbox for instructions')
    }
    catch {
      setError('Failed to reset password')
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required placeholder='Enter your email'/>
            </Form.Group>
            <Button variant='danger' disabled={loading} className='w-100 mt-4' type='submit'>Reset Password</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2 text-white'>
        Need an account? <Link className='text-white' to='/signup'>Sign Up</Link>
      </div>
   </>
  )
}