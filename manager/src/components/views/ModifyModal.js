import React, { useContext, useState } from 'react'
import { FoodContext } from '../contexts/FoodContext'
import { Modal, Button, Form } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

const ModifyFoodModal = () => {
    const {foodState: {food}, modifyFoodModal, setModifyFoodModal, modifyFood
    } = useContext(FoodContext)

    const closeDialog = () => {
        setModifyFoodModal(false)
    }
    
    const [newFood, setNewFood] = useState(food)
    
    const tempFood = food;
    
    const _modifyFood = (e) => {
             
        let name = e.target.name;
        let value = e.target.value;
        
        const tempFood1 = {[name]:value}
        const temp = String(Object.keys(tempFood1))
        tempFood[temp] = String(Object.values(tempFood1))
        //console.log(tempFood)
        setNewFood(tempFood)
    }
    
    const handleSave = () => {
        modifyFood(tempFood)
        closeDialog()
    }


    return (
        <Modal show={modifyFoodModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>{food.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Tên món ăn</Form.Label>
                <Form.Control size="lg" type="text" defaultValue={food.name} onChange={_modifyFood} name="name"/> 
                <Form>                  
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={food.description} onChange={_modifyFood} name="description"/>
                    </Form.Group>
                </Form>
                <Form.Label>Giá tiền: </Form.Label>
                <NumberFormat thousandSeparator={true} name="price" onValueChange={(values=>{
                    const {formattedValue, value} = values;
                    tempFood['price'] = formattedValue
                    setNewFood(tempFood)
                })}/><span>VND</span>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant='danger' onClick={closeDialog}>Close</Button>
                <Button variant='success' onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModifyFoodModal