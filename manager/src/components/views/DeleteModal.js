import React, { useContext, useState } from 'react'
import { FoodContext } from '../contexts/FoodContext'
import { Modal, Button } from 'react-bootstrap'
import { useEffect } from 'react'

const DeleteModal = () => {
    const {
        foodState: {foodList, food}, deleteFoodModal, setDeleteFoodModal, getFood, removeFood
    } = useContext(FoodContext)

    const closeDialog = () => {
        setDeleteFoodModal(false)
    }

    // ham de lay food
    useEffect (       
        () => {           
            getFood();           
        }, []
    )
        
    const deleteHandle = () => {
        removeFood(food)
        closeDialog()
    }


    // ------------- CSS -------------

    const styleBtn = {
        paddingLeft: '12px', 
        paddingRight: '12px'
    }

    return (
        <Modal show={deleteFoodModal} animation={false} onHide={closeDialog}>
             <Modal.Header closeButton>
                <Modal.Title><h4>Bạn có chắc chắn muốn xóa?</h4></Modal.Title>
            </Modal.Header>
             <Modal.Footer>
                <Button style={styleBtn} variant='primary' onClick={closeDialog}>Cancel</Button>
                <Button style={styleBtn} variant='danger' onClick={deleteHandle}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal;

