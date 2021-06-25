import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Header from './Header'
import { useState, useContext } from 'react'
import { ManagerContext } from '../contexts/ManagerContext'
import RaiseAlert from './Alert'

const Signin = () => {
    const {managerState: {isAuthen}, sendSigninForm} = useContext(ManagerContext)
    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState(null)
    
    if (isAuthen) {
        return (
            <Redirect to='/' />
        )
    }

    const {email, password} = signinForm

    const onChangeSigninForm = (event) => setSigninForm({
        ...signinForm,
        [event.target.name]: event.target.value
    })
    
    const signin = async (event) => {
        event.preventDefault()
        const signinData = await sendSigninForm(signinForm)
        try {    
            if (signinData.success) {
                setAlert({type: 'success', message: signinData.message})
            }
            else {
                setAlert({type: 'danger', message: signinData.message})
            }
        }
        catch (error) {
            console.log('error')
        }
    }

    return (
        <div className='col-md-10 col-lg-8 mx-auto d-block'>
            <Header />
            <div>
                <Form onSubmit={signin}>
                    <p className='h3 text-center text-secondary'>Sign In</p>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' name='email' placeholder='Email' required value={email} onChange={onChangeSigninForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type='password' name='password' placeholder='Password' required value={password} onChange={onChangeSigninForm} />
                    </Form.Group>
                    <Form.Text className="text-muted mb-3">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Button className='col-4 mx-auto d-block mb-3' type='submit' variant='primary'>Sign In</Button>
                </Form>              
            </div>
            <RaiseAlert info={alert} />
        </div>
    )
}

export default Signin