import React from 'react'
import { Link, Redirect } from "react-router-dom"
import { Button, Form } from 'react-bootstrap'
import Header from './Header'
import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import RaiseAlert from './Alert'

const Signup = () => {
    const {userState: {isAuthen}, sendSignupForm} = useContext(UserContext)
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(null)
    
    if (isAuthen) {
        return (
            <Redirect to='/' />
        )
    }

    const {email, password, confirmPassword} = signupForm

    const onChangeSignupForm = (event) => setSignupForm({
        ...signupForm,
        [event.target.name]: event.target.value
    })

    const signup = async (event) => {
        event.preventDefault()

        // validate email
        if(!/\S+@\S+\.\S+/.test(email)) {
            setAlert({type: 'danger', message: 'Email is invalid.'});
        }
        else if (confirmPassword !== password) {
            setAlert({type: 'danger', message: 'Confirm password does not match'})
        }
        else {
            const signupData = await sendSignupForm(signupForm)
            try {    
                if (signupData.success) {
                    setAlert({type: 'success', message: signupData.message})
                }
                else {
                    setAlert({type: 'danger', message: signupData.message})
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        
    }

    return (
        <div className='col-md-10 col-lg-8 mx-auto d-block'>
            <Header />
            <div>
                <Form onSubmit={signup}>
                    <p className='h3 text-center text-secondary'>Sign Up</p>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' name='email' placeholder='Email' required value={email} onChange={onChangeSignupForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type='password' name='password' placeholder='Password'  minLength='5' maxLength='20' required value={password} onChange={onChangeSignupForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type='password' name='confirmPassword' placeholder='Confirm Password' required value={confirmPassword} onChange={onChangeSignupForm} />
                    </Form.Group>
                    <Form.Text className="text-muted mb-3">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Button className='col-4 mx-auto d-block mb-3' type='submit' variant='primary'>Sign Up</Button>
                </Form>
                <p className='text-center text-secondary'>Have got an account</p>
                <Link className='text-decoration-none' to='/signin'><Button className='col-4 mx-auto d-block mb-3' type='submit' variant='success'>Sign In</Button></Link>
                <RaiseAlert info={alert} />
            </div>
        </div>
    )
}

export default Signup;