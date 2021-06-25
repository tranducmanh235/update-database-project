import React from 'react'
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import CartIcon from '../../assets/shopping-cart-solid.svg'
import OrderIcon from '../../assets/list-alt-regular.svg'
import SignOutIcon from '../../assets/sign-out-alt-solid.svg'

const Header = () => {
    const {userSignout} = useContext(UserContext)
    const signout = () => userSignout()
    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/'>Nhom 13</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-header' />
                <Navbar.Collapse id='navbar-header'>
                    <Nav className='ml-auto'>
                        <Nav.Link href='/' className=''>Menu</Nav.Link>
                        <Nav.Link href='/signin' className=''>Sign In</Nav.Link>
                        <Nav.Link href='/cart' className=''><Image src={CartIcon} alt='Cart' width='20'></Image></Nav.Link>
                        <Nav.Link href='/order' className=''><Image src={OrderIcon} alt='Order' width='20'></Image></Nav.Link>
                        <Button className='ml-auto' variant='danger' onClick={signout}><Image src={SignOutIcon} alt='Sign Out' width='20'></Image></Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header