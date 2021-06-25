import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FoodContext } from '../contexts/FoodContext'

const SingleFood = ({food}) => {
    const {findFood, setShowFoodModal, addToCart} = useContext(FoodContext)
    const chooseFood = foodId => {
        findFood(foodId)
        setShowFoodModal(true)
    }
    
    return (
        <Card className='col-md-5 col-lg-3 m-3'>
            <Card.Img src={process.env.PUBLIC_URL + food.imageURL} alt='img' />
            <Card.Body>
                <Card.Title className='text-center font-weight-bold text-primary' type='button' onClick={chooseFood.bind(this, food._id)}>{food.name}</Card.Title>
                <Card.Text className='text-center font-weight-bold'>{food.price} đ</Card.Text>
            </Card.Body>
            { food.avail && <Button variant='danger' onClick={addToCart.bind(this, food._id)}>ADD TO CART</Button>}
            { !food.avail && <Button variant='danger' disabled>ADD TO CART</Button>}
        </Card>
    )
}

export default SingleFood