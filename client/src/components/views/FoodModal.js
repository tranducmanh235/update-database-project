import React, { useContext, useState } from 'react'
import { FoodContext } from '../contexts/FoodContext'
import { Modal, Button } from 'react-bootstrap'

const FoodModal = () => {
    const {foodState: {food}, showFoodModal, setShowFoodModal} = useContext(FoodContext)
    const closeDialog = () => {
        setShowFoodModal(false)
    }
    return (
        <Modal show={showFoodModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>{food.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{food.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={closeDialog}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FoodModal