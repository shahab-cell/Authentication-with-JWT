import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

export const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <FormContainer>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='Password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='Password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' varient='primary'>
              Sign In
            </Button>

            <Row className='py-3'>
              <Col>
                New customer? <Link to='/register'>Register</Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
