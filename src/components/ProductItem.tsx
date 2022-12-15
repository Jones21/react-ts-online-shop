import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/CartContext'

type ItemProps = {
    id: string,
    productName: string,
    description: string,
    unitPrice: number,
    category: string,
    imageUrl: string
}

export function ProductItem({ id, productName, description, imageUrl, unitPrice, category}: ItemProps ) {
    const { increaseCartQuantity } = useShoppingCart()
    return (
        <React.Fragment>
            <Row>
                <Col xs="2">
                    <div className="text-center bg-white p-3">
                        <Card.Img src={imageUrl} style={{ objectFit: 'cover', width: '100%' }} />
                    </div>
                </Col>
                <Col xs="8">
                    <h5>{productName}</h5>
                    <h6 className="text-success mb-3 text-uppercase">{category}</h6>
                    <p>{description}</p>
                </Col>
                <Col xs="2" className="text-end">
                    <h3 className="mb-3 text-danger">{formatCurrency(unitPrice)}</h3>
                    <Button onClick={ () => increaseCartQuantity(id) } variant="success">Add to Cart</Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}