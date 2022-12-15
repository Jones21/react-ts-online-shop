import React from 'react'
import { Form } from 'react-bootstrap'
import { useShoppingCart } from '../context/CartContext'

export function SearchBar() {
    const { setSearchTerm } = useShoppingCart()
    return (
        <React.Fragment>
            <Form.Group className="mb-3" controlId="formSearchItem">
                <Form.Control type="email" placeholder="Search Item" onChange={ (e) => {
                    setSearchTerm(e.target.value)
                } } />
            </Form.Group>
        </React.Fragment>
    )
}