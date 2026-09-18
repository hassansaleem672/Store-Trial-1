import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'hr-cart'

function loadInitialCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// A cart line is uniquely identified by product id + size + color,
// since the same shoe in a different size/color is a different line item.
function lineKey(item) {
  return `${item.id}__${item.size ?? ''}__${item.color ?? ''}`
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = lineKey(action.payload)
      const existing = state.find((line) => lineKey(line) === key)
      if (existing) {
        return state.map((line) =>
          lineKey(line) === key
            ? { ...line, quantity: line.quantity + action.payload.quantity }
            : line
        )
      }
      return [...state, action.payload]
    }
    case 'REMOVE_ITEM':
      return state.filter((line) => lineKey(line) !== action.payload.key)
    case 'UPDATE_QUANTITY':
      return state.map((line) =>
        lineKey(line) === action.payload.key
          ? { ...line, quantity: Math.max(1, action.payload.quantity) }
          : line
      )
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadInitialCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, size, color, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size,
        color,
        quantity,
      },
    })
  }

  const removeFromCart = (line) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { key: lineKey(line) } })

  const updateQuantity = (line, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { key: lineKey(line), quantity } })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal, lineKey }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
