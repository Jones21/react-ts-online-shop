import React from 'react'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { SortDown, SortUp } from 'react-bootstrap-icons'
import { useShoppingCart  } from '../context/CartContext'

export function ProductSorter() {

    const { activePriceSort, setPriceSort } = useShoppingCart()
    return (
        <React.Fragment>
            <Dropdown align="end" as={ButtonGroup}>
                <Button variant="outline-secondary"> 
                { (Object.keys(activePriceSort).length) ?
                    <React.Fragment>
                        {(activePriceSort == 'asc') ? <><SortUp /> Price Low to High</> : <><SortDown /> Price High to Low</>}
                    </React.Fragment>
                    : 
                    <React.Fragment><SortDown /> Sort Price</React.Fragment>
                }
                </Button>
                <Dropdown.Toggle split variant="outline-secondary" />
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setPriceSort('desc')}>Sort price high to low</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriceSort('asc')}>Sort price low to high</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}