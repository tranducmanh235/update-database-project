import React, { useContext, useState } from 'react'
import { FoodContext } from '../contexts/FoodContext'

import {
    Modal, Button, Form, Container, Col, Row, Image
} from 'react-bootstrap'

import { v4 as uuidv4 } from 'uuid';

const AddModal = () => {

    // show Modal
    const {
        setAddFoodModal, addFoodModal, foodState, addFood
    } = useContext(FoodContext)

    const changeModalAdd = () => {
        setAddFoodModal(true)
    }

    const setModalAdd = () => {
        setAddFoodModal(false)
    }


    // --------------- CSS --------------- // 
    
    const [profileImg, setprofileImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7R9bDzfcBfN5XzpLBFiM9Ywj5Ssem-A7Ew&usqp=CAU');
    
    const imageHandler = (event) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2) {
                console.log(reader.result)
                setprofileImg(reader.result);
            }
        }

        console.log(event.target.files[0])
        reader.readAsDataURL(event.target.files[0])
    }

    /*const styleContainer = {
        width: '80%', 
        border: '3px solid #458bdb', 
        padding: '15px'
    }*/

    const styleBtnAdd = {
        marginTop: '20px',
        paddingLeft: '30px',
        paddingRight: '30px'
    }

    const styleBtnConfirm = {
        paddingLeft: '22px',
        paddingRight: '22px'
    }

    // ---------------------------------- //

    const food1 = {...foodState}
    console.log(food1.foodList)

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const addFood = {[name]:value};
        //console.log(Object.keys(addFood))
        food1.foodList[food1.foodList.length - 1][Object.keys(addFood)] = String(Object.values(addFood))
    }

    const handleAddFood = () => {
        food1.foodList.push({
            _id:uuidv4(), 
            foodID:"1234", 
            imageURL:""
        })
        const newFoodState = {...foodState};
        //console.log(food1)
        newFoodState.foodList = food1.foodList
        //console.log(newFoodState.foodList)
        addFood(newFoodState)
    }
    //console.log(foodState.foodList[0])

    return (
        <div>
            <center><Button style={styleBtnAdd} onClick={changeModalAdd}>Add Food</Button></center>

            
            {/* ------------- Modal ------------- */}
            <Modal show={addFoodModal} >
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Col className="border-bottom">
                                <center><Form.Label><h1>Thêm món ăn</h1></Form.Label></center>                       
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col xs={5}>
                                <div className="page">
                                    <Container>
                                        <center>Thêm ảnh</center>
                                        <div className="img-holder">
                                            <Image className="img-upload-pattern" src={profileImg} rounded />
                                        </div>

                                        <Form.Group>
                                            <Form.File name="image-upload" id="input-image" onChange={imageHandler} />
                                        </Form.Group>

                                        <Form.Group controlId="input-image" className="choose-image">
                                            <Form.Label className="image-upload" >Chọn ảnh</Form.Label>
                                        </Form.Group>
                                    </Container>
                                </div>
                            </Col>
                            <Col xs={7}>
                                <Form.Group as={Row} controlId="nameFood">
                                    <Col>
                                        <Form.Control type="text" placeholder="Nhập tên món ăn" name ="name" onChange={onChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="priceFood">
                                    <Col>
                                        <Form.Control type="text" placeholder="Nhập đơn giá" name="price" onChange={onChange}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="descriptionFood">
                                    <Col>
                                        <Form.Control as="textarea" placeholder="Mô tả" rows={6} name="description" onChange={onChange}/>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form> 
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={setModalAdd} >
                        Cancel
                    </Button>
                    <Button style={styleBtnConfirm} variant="primary" onClick={handleAddFood}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddModal;

