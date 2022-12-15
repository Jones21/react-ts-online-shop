import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/CartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import storeItems from '../data/items.json'
import { X } from 'react-bootstrap-icons';

type CartItemProps = {
    id: string,
    quantity: number,
}

export function CartItem({ id, quantity}: CartItemProps ) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const item = storeItems.find(item => item.id === id)

    return (
        <React.Fragment>
            <Row className="mb-3">
                <Col xs="3" className="position-relative">
                    <Button 
                        variant="danger" 
                        size="sm"
                        className="rounded-circle d-flex justify-content-center align-items-center"
                        style={{ 
                            color: 'white', 
                            width: '1rem', 
                            height: '1rem',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            padding: 0,
                            transform: "translate(0, -25%)"
                        }}
                        onClick={() => removeFromCart(id) }>
                        <X size={50}/>
                    </Button>
                    <div className="text-center bg-white" style={ { width: '80px', overflow: 'hidden' } }>
                        <img src={item.imageUrl} height="50px" style={{ objectFit: 'cover', width: 'auto' }} />
                    </div>
                </Col>
                <Col xs="6">
                    <h6 className="text-truncate">{item.productName}</h6>
                    <h6 className="text-danger fw-bold">{formatCurrency(item.unitPrice * quantity)}</h6>
                </Col>
                <Col xs="3">
                    <div className="d-flex justify-content-center align-items-center">
                        <Button 
                            size="sm"
                            onClick={ () => increaseCartQuantity(id) }
                        >+</Button>
                        <div className="p-3 py-2">{quantity}</div>
                        <Button 
                            variant="danger"
                            size="sm"
                            onClick={ () => decreaseCartQuantity(id) }
                        >-</Button>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}