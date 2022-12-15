import { ReactElement, JSXElementConstructor, ReactFragment, Key } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useShoppingCart } from '../context/CartContext'

export function Sidebar() {
    const { activeCategory, getCategoryList, setCategory } = useShoppingCart()

    return (
        <ListGroup as='ul'>
            <ListGroup.Item variant="success" as="button" active={ (activeCategory == 'all' || Object.keys(activeCategory).length == 0)} action onClick={() => setCategory('all') } className="text-capitalize">
                All Items
            </ListGroup.Item>
            {getCategoryList().map((item: { category: boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | Key | null | undefined }, index: any) => (
                <ListGroup.Item key={index} variant="success" as="button" active={ (activeCategory == item.category)} action onClick={() => setCategory(item.category) } className="text-capitalize">
                    {item.category}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}