import React from 'react'
import { Badge, Container } from 'react-bootstrap'
import { ProductList } from './ProductList'
import { SearchBar } from './SearchBar'
import { ProductSorter } from './ProductSorter'
import { useShoppingCart  } from "../context/CartContext"

export function MainPane() {
    const { activeCategory, activeSearchTerm, getStoreItems } = useShoppingCart()
    return (
        <React.Fragment>
            <Container className='px-0 mt-3'>
                <SearchBar />
                <div className='d-flex d-flex justify-content-between align-items-start'>
                    <div>
                        { ((Object.keys(activeCategory).length > 0 && activeCategory != 'all') || activeSearchTerm != '') && <h6 className="fw-bold">Filtered by:</h6>}
                        { activeSearchTerm != '' && <React.Fragment><small>Search Term</small>:<Badge bg="success" className='text-capitalize m-2'> {activeSearchTerm}</Badge></React.Fragment> }
                        { (Object.keys(activeCategory).length > 0 && activeCategory != 'all') && <React.Fragment><small>Category</small>:<Badge bg="success" className='text-capitalize m-2'>{activeCategory}</Badge></React.Fragment> }
                    </div>
                    <div className='mb-5'>
                    <ProductSorter />
                    </div>
                </div>
            </Container>
            <Container>
                <ProductList />
            </Container>
        </React.Fragment>
    )
}