import React, { createContext, useContext, useReducer } from 'react';

// Cart actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
                JSON.stringify(item.selectedAddons) === JSON.stringify(action.payload.selectedAddons)
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: state.totalPrice + (action.payload.totalPrice * action.payload.quantity)
        };
      } else {
        // New item, add to cart
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: state.totalPrice + (action.payload.totalPrice * action.payload.quantity)
        };
      }

    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find(item => item.cartId === action.payload);
      const filteredItems = state.items.filter(item => item.cartId !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.totalPrice * itemToRemove.quantity)
      };

    case UPDATE_QUANTITY:
      const updatedItems = state.items.map(item => {
        if (item.cartId === action.payload.cartId) {
          const priceDiff = (action.payload.quantity - item.quantity) * item.totalPrice;
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      const item = state.items.find(item => item.cartId === action.payload.cartId);
      const quantityDiff = action.payload.quantity - item.quantity;
      const priceDiff = quantityDiff * item.totalPrice;

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + priceDiff
      };

    case CLEAR_CART:
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: cartId });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const getCartTotal = () => {
    return state.totalPrice.toFixed(2);
  };

  const getCartItemCount = () => {
    return state.totalItems;
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
