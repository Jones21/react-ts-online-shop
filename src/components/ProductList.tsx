import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ProductItem } from './ProductItem'
import { useShoppingCart  } from '../context/CartContext'

export function ProductList() {
    const { activeSearchTerm, getStoreItems } = useShoppingCart()
    const storeItems = getStoreItems()

    return (
        <React.Fragment>
            
            <Row xs={1} className="g-3">
                { (storeItems.length) ? storeItems.map(item => (
                    <Col key={item.id} className="bg-light p-5"><ProductItem {...item} /></Col>   
                )) : <h4 className='text-center p-5 text-muted'>No search results found for "{activeSearchTerm}"</h4>}
            </Row>
        </React.Fragment>
    )
}