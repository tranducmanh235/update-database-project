import React, { createContext, useEffect, useState } from 'react'
import { apiUrl, CART } from '../utils/constants'
import axios from 'axios'

export const FoodContext = createContext()

const FoodContextProvider = ({children}) => {
    const [foodState, setFoodState] = useState({
        food: null,
        foodList: [],
    })

    const [cartState, setCartState] = useState({
        cart: [],
        total: 0
    })

    const [showFoodModal, setShowFoodModal] = useState(false)

    useEffect(() => {
        if (localStorage.getItem(CART)) {
            setCartState(JSON.parse(localStorage.getItem(CART)))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(CART, JSON.stringify(cartState))
    }, [cartState])

    const getFood = async () => {
        try {
            const response = await axios.get(`${apiUrl}/foodHandler/foods`)
            if (response.data.success) {
                setFoodState({
                    ...foodState,
                    foodList: response.data.food
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    
    const findFood = foodId => {
        const food = foodState.foodList.find(food => food._id === foodId)
        setFoodState({
            ...foodState,
            food: food
        })
    }

    const updateTotal = () => {
        const total = cartState.cart.reduce((prev, item) => {
            return prev + item.amount
        }, 0)
        setCartState({
            ...cartState,
            total: total
        })
    }

    const addToCart = (foodId) => {    
        const food = foodState.foodList.find(food => food._id === foodId)   
        const check = cartState.cart.find(item => item.foodName === food.name)
        if (!check) {   
            const one = {
                foodName: food.name,
                quantity: 1,
                price: food.price,
                amount: food.price
            }
            setCartState({
                ...cartState,
                cart: [...cartState.cart, one],
                total: cartState.total + food.price
            })
        }
    }

    const decreaseQuantity = (foodName) => {
        cartState.cart.forEach(item => {
            if (item.foodName === foodName) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                }
                item.amount = item.price*item.quantity
            }
        })
        setCartState({
            ...cartState,
            cart: cartState.cart
        })
        updateTotal()
    }

    const increaseQuantity = (foodName) => {
        cartState.cart.forEach(item => {
            if (item.foodName === foodName) {
                item.quantity += 1
                item.amount = item.price*item.quantity
            }
        })
        setCartState({
            ...cartState,
            cart: cartState.cart
        })
        updateTotal()
    }

    const removeFood = (foodName) => {
        cartState.cart.forEach((item, index) => {
            if (item.foodName === foodName) {
                cartState.cart.splice(index, 1)
            }
        })
        setCartState({
            ...cartState,
            cart: cartState.cart
        })
        updateTotal()
    }

    const sendOrderRequest = async (orderInfo) => {
        try {
            const response = await axios.post(`${apiUrl}/orderHandler/makeOrder`, orderInfo)
            if (response.data.success) {
                setCartState({
                    cart: [],
                    total: 0
                })
            }
            return response.data
        }
        catch (error) {
            if (error.response.data) return error.response.data
            return {success: false, message: error.message}
        }
    }

    const FoodContextData = {getFood, findFood, setShowFoodModal, addToCart, decreaseQuantity, increaseQuantity, removeFood, updateTotal, sendOrderRequest, foodState, cartState, showFoodModal}

    return (
        <FoodContext.Provider value = {FoodContextData}>
            {children}
        </FoodContext.Provider>
    )
}

export default FoodContextProvider