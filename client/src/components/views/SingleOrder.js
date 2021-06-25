import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { OrderContext } from '../contexts/OrderContext'

const SingleOrder = ({order}) => {
    const {findOrder, setShowOrderModal, sendCancelOrderRequest } = useContext(OrderContext)
    const chooseOrder = (orderId) => {
        findOrder(orderId)
        setShowOrderModal(true)
    }
    const cancelOrder = async (orderId) => {
        await sendCancelOrderRequest({orderId})
        window.location.reload()
    }
    
    return (
        <div className='row col-12 my-3 border'>
            <div className='col-8' type='button'>{order.createAt}</div>
                <div className='col-4 d-flex justify-content-end'>
                    <Button variant='primary' onClick={chooseOrder.bind(this, order._id)}>View</Button>
                    { order.status === 'waiting' && <Button variant='danger' onClick={cancelOrder.bind(this, order._id)}>Cancel</Button> }
                </div>
        </div>
    )
}

export default SingleOrder