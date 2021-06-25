import React, { createContext, useEffect, useState } from 'react'
import { apiUrl } from '../utils/constants'
import axios from 'axios'

export const FoodContext = createContext()

const FoodContextProvider = ({children}) => {
    const [foodState, setFoodState] = useState({
        food: null,
        foodList: [],
    })
    const [cartState, setCartState] = useState({
        cart: []
    })

    // Cac Modal
    const [showFoodModal, setShowFoodModal] = useState(false)
    const [modifyFoodModal, setModifyFoodModal] = useState(false)
    const [deleteFoodModal, setDeleteFoodModal] = useState(false)
    const [addFoodModal, setAddFoodModal] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCartState(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartState))
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
        const newfood = foodState.foodList.find(food => food._id === foodId)
        console.log(newfood)
        setFoodState({
            ...foodState,
            food: newfood
        })
    }

    // const addToCart = (foodId) => {    
    //     const food = foodState.foodList.find(food => food._id === foodId)   
    //     const check = cartState.cart.find(item => item.name === food.name)
    //     if (!check) {   
    //         const one = {
    //             name: food.name,
    //             quantity: 1,
    //             price: food.price,
    //             amount: food.price
    //         }
    //         // food.count = 1
    //         setCartState({
    //             ...cartState,
    //             cart: [...cartState.cart, one]
    //         })
    //     }    
    // }

    const decreaseQuantity = (foodName) => {

    }

    const increaseQuantity = (foodName) => {
        cartState.cart.forEach(item => {
            if (item.name === foodName) {
                item.quantity += 1
                item.amount = item.price*item.quantity
            }
            setCartState({
                ...cartState,
                cart: cartState.cart
            })
        })
    }


    // Ham them mon an
    const addFood = (newListFood) => {
        setFoodState({...foodState, foodList:newListFood})
    }

    // Ham sua doi mon an
    const modifyFood = (newFood) => {
        const newFoodState = {...foodState};
        for(let i = 0; i < newFoodState.foodList.length; i++){
            if(newFoodState.foodList[i]._id == newFood._id) {
                newFoodState.foodList[i] = newFood
                setFoodState(newFoodState);
                return;
            }
        }  
    }

    // Ham xoa mon an
    const removeFood = (newFood) => {
        const newFoodState = {...foodState};
        for(let i = 0; i < newFoodState.foodList.length; i++){
            if(newFoodState.foodList[i]._id == newFood._id) {
                const temp = newFoodState.foodList.filter(item => item._id != newFood._id)
                // newFoodState.foodList[i] = newFood
                // setFoodState(newFoodState);
                // return
                //console.log(temp)
                newFoodState.foodList = temp;
                setFoodState(newFoodState);
            }
        }  
    }

    // xuat ham ra
    const FoodContextData = {
        getFood, findFood, 

        /* ----------- */ 
        setShowFoodModal, setModifyFoodModal, setDeleteFoodModal, setAddFoodModal,
        addFood, modifyFood, removeFood, 

        /*  addToCart, */ 
        decreaseQuantity, increaseQuantity, foodState, cartState, 

        /* ----------- */ 
        showFoodModal, modifyFoodModal, deleteFoodModal, addFoodModal
    }

    return (
        <FoodContext.Provider value = {FoodContextData}>
            {children}
        </FoodContext.Provider>
    )
}

export default FoodContextProvider