import { createContext, ReactNode, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import storeItems from '../data/items.json'


type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    clearCart:() => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        'shopping-cart',
        []
    )

    const [activeCategory, setActiveCategory] = useState(false)
    const [activeSearchTerm, setActiveSearchTerm] = useState(false)
    const [activePriceSort, setActivePriceSort] = useState(false)
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => {
        clearCart()
        setShow(false)
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    function clearCart() {
        setCartItems(currItems => {
            return []
        })
    }

    function getCategoryList(items: Array) {
        let categories = items.filter((item, index) => {
            return items.findIndex(obj => obj.category === item.category) === index
        });
        return categories
    }

    function setCategory(category: string) {
        setActiveCategory(category)
    }

    function getStoreItems() {
        let items = storeItems
        
        if (Object.keys(activeCategory).length && activeCategory != 'all') {
            items = items.filter(item => item.category === activeCategory)
        }

        if (activeSearchTerm != '') {
            items = items.filter((item) => {
                const productName = (item.productName).toLowerCase()
                const searchTerm  = activeSearchTerm.toLowerCase()

                return productName.includes(searchTerm)
            })
        }

        if (activePriceSort != '') {
            switch (activePriceSort) {
                case 'asc' :
                    items.sort((a, b) => {
                        return parseFloat(a.unitPrice) - parseFloat(b.unitPrice)
                    })
                    break;
                case 'desc':
                    items.sort((a, b) => {
                        return parseFloat(b.unitPrice) - parseFloat(a.unitPrice)
                    })
                    break;
            }
        }
        return items
    }

    function setSearchTerm(term: string) {
        setActiveSearchTerm(term)
    }

    function setPriceSort(sort: string) {
        setActivePriceSort(sort)
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                clearCart,
                getCategoryList,
                setCategory,
                getStoreItems,
                setSearchTerm,
                setPriceSort,
                handleShow,
                handleClose,
                show,
                cartItems,
                cartQuantity,
                activeCategory,
                activeSearchTerm,
                activePriceSort
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}