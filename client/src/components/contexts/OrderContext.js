import React, { createContext, useState } from 'react'
import { apiUrl } from '../utils/constants'
import axios from 'axios'

export const OrderContext = createContext()

const OrderContextProvider = ({children}) => {
    const [orderState, setOrderState] = useState({
        order: null,
        orderList: [],
    })

    const [showOrderModal, setShowOrderModal] = useState(false)

    const getOrder = async () => {
        try {
            const response = await axios.get(`${apiUrl}/orderHandler/orders`)
            if (response.data.success) {
                setOrderState({
                    ...orderState,
                    orderList: response.data.orders
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    
    const findOrder = orderId => {
        const order = orderState.orderList.find(order => order._id === orderId)
        setOrderState({
            ...orderState,
            order: order
        })
    }

    const sendPaymentRequest = async (orderId) => {
        try {
            const response = await axios.post(`${apiUrl}/orderHandler/makePayment`, orderId)
            return response.data
        }
        catch (error) {
            if (error.response.data) return error.response.data
            return {success: false, message: error.message}
        }
    }

    const sendCancelOrderRequest = async (orderId) => {
        try {
            await axios.post(`${apiUrl}/orderHandler/cancelOrder`, orderId)
        }
        catch (error) {
            console.log(error)
        }
    }

    const OrderContextData = {getOrder, findOrder, setShowOrderModal, sendPaymentRequest, sendCancelOrderRequest, orderState, showOrderModal}

    return (
        <OrderContext.Provider value = {OrderContextData}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider