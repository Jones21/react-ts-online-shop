import { ListGroup } from 'react-bootstrap'
import storeItems from '../data/items.json'
import { useShoppingCart } from '../context/CartContext'

export function Sidebar() {
    const { activeCategory, getCategoryList, setCategory } = useShoppingCart()

    return (
        <ListGroup as='ul'>
            <ListGroup.Item variant="success" as="button" active={ (activeCategory == 'all' || Object.keys(activeCategory).length == 0)} action onClick={() => setCategory('all') } className="text-capitalize">
                All Items
            </ListGroup.Item>
            {getCategoryList(storeItems).map(item => (
                <ListGroup.Item variant="success" as="button" active={ (activeCategory == item.category)} key={item.category} action onClick={() => setCategory(item.category) } className="text-capitalize">
                    {item.category}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}