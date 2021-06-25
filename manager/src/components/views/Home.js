/*import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'


const Home = () => {
    
    return (
        <div className='col-md-10 col-lg-8 mx-auto d-block'>
            <Header />
            
        </div>
    )
}

export default Home;*/

import React, { useContext, useEffect } from 'react'
import Header from './Header'
import { FoodContext } from '../contexts/FoodContext'
import SingleFood from './SingleFood'
import FoodModal from './FoodModal'
import DeleteModal from './DeleteModal'
import ModifyModal from './ModifyModal'

import AddModal from './AddModal'

import {
    Button
} from 'react-bootstrap'

const Home = () => {
    const {foodState: {food, foodList}, getFood} = useContext(FoodContext)
    useEffect(() => getFood(), [])

    

    console.log(foodList)
    
    return (
        <div className='col-md-10 col-lg-8 mx-auto d-block'>
            <Header />
            
            <AddModal />
            
            <div className='row justify-content-center'>
                { foodList.map((one) => (
                    <SingleFood food={one} key={one._id}/>
                ))}
            </div>
            {food !== null && <FoodModal />}
            {food !== null && <ModifyModal />}
            {food !== null && <DeleteModal />}
        </div>
    )
}

export default Home;