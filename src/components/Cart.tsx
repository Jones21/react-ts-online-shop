import React from 'react'
import { Button, Card, Col, Row, Modal, Alert } from 'react-bootstrap'
import { useShoppingCart } from '../context/CartContext'
import { CartItem } from './CartItem'
import { formatCurrency } from '../utilities/formatCurrency'
import storeItems from '../data/items.json'

export function Cart() {
    const { show, handleShow, handleClose, cartItems, cartQuantity, clearCart } = useShoppingCart()
    const sortedItems = Object.keys(cartItems).reverse()

    return (
        <React.Fragment>
            <Card className="sticky-top mt-3">
                <Card.Header>My Cart
                    {(cartQuantity > 0) &&
                        <Button
                            variant="danger"
                            className="float-end"
                            size="sm"
                            onClick={() => clearCart()}
                        >Clear Cart</Button>
                    }
                </Card.Header>
                <Card.Body className="bg-light">
                    {(sortedItems.length > 0) ?
                        <React.Fragment>
                            <div className="p-4" style={{maxHeight: '300px', overflow: 'auto'}}>
                                {sortedItems.map((index: any) => (
                                    <CartItem key={cartItems[index].id} {...cartItems[index]} />
                                ))}
                            </div>
                        </React.Fragment>
                        : <Alert variant="info" className="text-center fw-bold mb-0">Your cart is empty</Alert>
                    }
                </Card.Body>
                {(cartQuantity > 0) &&
                    <Card.Footer>
                        <Row>
                            <Col xs={6}><h6>Total Items:</h6></Col>
                            <Col xs={6} className="text-end fw-bold text-danger">{cartQuantity}</Col>
                        </Row>
                        <Row>
                            <Col xs={6}><h6>Total Amount:</h6></Col>
                            <Col xs={6} className="text-end fw-bold text-danger">
                                <h4>{
                                    formatCurrency(cartItems.reduce((total, cartItem) => {
                                        const item = storeItems.find(i => i.id === cartItem.id)
                                        return total + (item?.unitPrice || 0) * cartItem.quantity
                                    }, 0))
                                }</h4>
                            </Col>
                        </Row>
                        <div className="d-grid my-3">
                            <Button variant="success" size="lg" onClick={handleShow}>Checkout</Button>
                        </div>
                    </Card.Footer>
                }
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thank you for purchasing!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}