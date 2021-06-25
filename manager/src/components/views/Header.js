import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { ManagerContext } from '../contexts/ManagerContext'

import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom'

const Header = () => {
    const {cookSignout} = useContext(ManagerContext)
    const signout = () => cookSignout()

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/'>Nhom 13</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-header' />
                <Navbar.Collapse id='navbar-header'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/' className=''>Menu</Nav.Link>
                        <Nav.Link href='/signin' className=''>Sign In</Nav.Link>

                        {/* <Nav.Link href='/addfood' className=''>Add Food</Nav.Link> */}
                        {/* <Nav.Link href='/modifyfood' className=''>Modify Food</Nav.Link> */}
                        {/* <Nav.Link href='/deletefood' className=''>Delete Food</Nav.Link> */}

                        {/* <Nav.Link><NavLink to='/deletefood' >Delete Food</NavLink></Nav.Link> */}

                        <Button variant='danger' onClick={signout}>Sign Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header