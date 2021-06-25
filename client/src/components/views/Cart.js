import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FoodContext } from '../contexts/FoodContext'
import Header from './Header'
import RaiseAlert from './Alert'
import { UserContext } from '../contexts/UserContext'

const Cart = () => {
    const {cartState, decreaseQuantity, increaseQuantity, removeFood, sendOrderRequest} = useContext(FoodContext)
    const {userState} = useContext(UserContext)
    const [alert, setAlert] = useState(null)
    
    const makeOrder = async (event) => {
        event.preventDefault()
        if (!userState.isAuthen) {
            setAlert({type: 'primary', message: 'Please signin first!'})
        }
        else if (cartState.total === 0) {
            setAlert({type: 'danger', message: 'Cart is empty!'})
        }
        else {
            const orderData = await sendOrderRequest(cartState)
            try {    
                if (orderData.success) {
                    setAlert({type: 'success', message: orderData.message})
                }
                else {
                    setAlert({type: 'danger', message: orderData.message})
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
            <div className='d-flex flex-column align-items-end'>
                { cartState.cart.map((one) => (
                    <div className='row col-12 my-3 border'>
                        <div className='col-6 text-left'>{one.foodName}</div>
                        <div className='col-6 align-self-start d-flex justify-content-end'>
                            <Button variant='outline-dark' size='sm' onClick={decreaseQuantity.bind(this, one.foodName)}>-</Button>
                            <div className='mx-1'>{one.quantity}</div>
                            <Button variant='outline-dark' size='sm' onClick={increaseQuantity.bind(this, one.foodName)}>+</Button>
                        </div>
                        <div className='col-12 d-flex justify-content-end'>
                            Price: {one.price} đ
                        </div>
                        <div className='col-12 d-flex justify-content-end'>
                            Amount: {one.amount} đ
                        </div>
                        <div className='col-12 d-flex justify-content-end'>
                            <Button variant='danger' size='sm' onClick={removeFood.bind(this, one.foodName)}>Remove</Button>
                        </div>
                    </div>
                ))}
                <div className='row col-12 justify-content-end'>Total: {cartState.total} đ</div>
                <Button onClick={makeOrder}>Order</Button>
            </div>
            <RaiseAlert info={alert} />
        </div>
    )
}

export default Cart