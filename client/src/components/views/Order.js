import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Header from './Header'
import RaiseAlert from './Alert'
import { OrderContext } from '../contexts/OrderContext'
import { UserContext } from '../contexts/UserContext'
import SingleOrder from './SingleOrder'

const Order = () => {
    const {orderState: {order, orderList}, getOrder, showOrderModal, setShowOrderModal, sendPaymentRequest} = useContext(OrderContext)
    const {loadUser} = useContext(UserContext)
    const [alert, setAlert] = useState(null)

    const closeDialog = () => {
        setShowOrderModal(false)
    }

    const makePayment = async (orderId) => {
        const paymentData = await sendPaymentRequest({orderId})
        closeDialog()
        try {
            if (paymentData.success) {
                setAlert({type: 'success', message: 'Payment has been made successfully!'})
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            else {
                setAlert({type: 'danger', message: paymentData.message})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => loadUser(), [])
    useEffect(() => getOrder(), [])

    return ( 
        <div className='col-md-10 col-lg-8 mx-auto d-block'>
            <Header />
            <RaiseAlert info={alert} />
            <div className='d-flex flex-column align-items-end'>
                { orderList.slice(0).reverse().map((one) => (
                    <SingleOrder order={one} />
                ))}
            </div>
            { order !== null &&
                <Modal show={showOrderModal} animation={false} onHide={closeDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>{order.createAt}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {order.listFood.map(one => (
                            <div className='row justify-content-end border my-3'>
                                <p className='col-6'>{one.foodName}</p>
                                <p className='col-2'>{one.quantity}</p>
                                <p className='col-4'>{one.price} đ</p>
                                <p className='col-4'>{one.amount} đ</p>
                            </div>
                        ))}
                        <p className='text-right'>Total: {order.total} đ</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeDialog}>Close</Button>
                        { order.status === 'waiting' && <Button variant='primary' onClick={makePayment.bind(this, order._id)}>Pay</Button> }
                    </Modal.Footer>
                </Modal>
            }
        </div>
    )
}

export default Order