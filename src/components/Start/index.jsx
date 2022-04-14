import React from 'react'
import {Button} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

export default function Start() {
  
  const navigate = useNavigate()

  function handleStart() {
    navigate('/signup')
  }

  return (
    <>
      <Button className='w-100 text-center' variant="light" onClick={handleStart}>
        <strong>GET STARTED!</strong>
      </Button>
      <div className='w-100 text-center mt-4 text-white'>
        Have you ever visited our site? <Link className='text-white'to='/login'>
          <strong>WELCOME BACK!</strong></Link>
      </div>
    </>
  )
}
