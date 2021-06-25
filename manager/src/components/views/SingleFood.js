import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FoodContext } from '../contexts/FoodContext'

const SingleFood = ({food}) => {

    // them ham o day
    const {
        findFood, setShowFoodModal, addToCart, setModifyFoodModal, 
        setDeleteFoodModal
    } = useContext(FoodContext)

    const chooseFood = foodId => {
        findFood(foodId)
        setShowFoodModal(true)
    }

    // modify Modal
    const modifyFood = foodId => {
        console.log(foodId)
        findFood(foodId)
        setModifyFoodModal(true)
    }

    // delete Modal
    const deleteFood = foodId => {
        findFood(foodId)
        setDeleteFoodModal(true)   
    }


    // ----------- CSS Btn ----------- //

    const styleBtnModify = {
        width: '80px',
        display: 'inline-block',
        float: 'left',
    }

    const styleBtnDelete = {
        width: '80px',
        display: 'inline-block',
        float: 'right',
    }

    return (
        <Card className='col-md-5 col-lg-3 m-3'>
            <Card.Img src={process.env.PUBLIC_URL + food.imageURL} alt='img' />
            <Card.Body>
                <Card.Title className='text-center font-weight-bold text-primary' type='button' onClick={chooseFood.bind(this, food._id)}>{food.name}</Card.Title>
                <Card.Text className='text-center font-weight-bold'>{food.price} đ</Card.Text>
            </Card.Body>

            <div>
                <p style={styleBtnModify}>
                    <Button variant='success' onClick={modifyFood.bind(this, food._id)}>Modify</Button>
                </p>
                <p style={styleBtnDelete}>
                    <Button variant='danger' onClick={deleteFood.bind(this, food._id)} >Delete</Button>
                </p>
            </div>
        </Card>
    )
}

export default SingleFood