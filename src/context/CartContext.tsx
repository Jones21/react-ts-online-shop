import { createContext, ReactNode, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import storeItems from '../data/items.json'


type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    getCategoryList: () => any
    setCategory: (category: any) => void
    clearCart:() => void
    handleShow: () => void
    handleClose: () => void
    getStoreItems: () => any
    setPriceSort: (sort: any) => void
    setSearchTerm: (term: any) => void
    cartQuantity: number
    show: boolean
    cartItems: CartItem[]
    activeCategory: any
    activePriceSort: any
    activeSearchTerm: any
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

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: string) {
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

    function decreaseCartQuantity(id: string) {
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

    function removeFromCart(id: string) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    function clearCart() {
        setCartItems(currItems => {
            return []
        })
    }

    function getCategoryList() {
        let categories = storeItems.filter((item, index) => {
            return storeItems.findIndex(obj => obj.category === item.category) === index
        });
        return categories
    }

    function setCategory(category: any) {
        setActiveCategory(category)
    }

    function getStoreItems() {
        let items      = storeItems
        let searchTerm = (activeSearchTerm) ? (activeSearchTerm).toString() : ''
        const sort     = (activePriceSort) ? (activePriceSort).toString() : ''
        const category = (activeCategory) ? (activeCategory).toString() : ''

        
        if (category != '' && category != 'all') {
            items = items.filter(item => item.category === category)
        }

        if (searchTerm != '') {
            items = items.filter((item) => {
                const productName = (item.productName).toLowerCase()
                return productName.includes(searchTerm.toLowerCase())
            })
        }

        if (sort != '') {
            switch (sort) {
                case 'asc' :
                    items.sort((a, b) => {
                        return parseFloat((a.unitPrice).toString()) - parseFloat((b.unitPrice).toString())
                    })
                    break;
                case 'desc':
                    items.sort((a, b) => {
                        return parseFloat((b.unitPrice).toString()) - parseFloat((a.unitPrice).toString())
                    })
                    break;
            }
        }

        return items
    }

    function setSearchTerm(term: any) {
        setActiveSearchTerm(term)
    }

    function setPriceSort(sort: any) {
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