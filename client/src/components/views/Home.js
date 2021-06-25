import React, { useContext, useEffect } from 'react'
import Header from './Header'
import { FoodContext } from '../contexts/FoodContext'
import SingleFood from './SingleFood'
import FoodModal from './FoodModal'

const Home = () => {
    const {foodState: {food, foodList}, getFood} = useContext(FoodContext)
    useEffect(() => getFood(), [])

    return (
        <div className='col-md-10 col-lg-8 mx-auto d-block'>
            <Header />
            <div className='row justify-content-center'>
                { foodList.map(one => (
                    <SingleFood food={one} />
                ))}
            </div>
            {food !== null && <FoodModal />}
        </div>
    )
}

export default Home;