import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'CLEAR_CART') {
    return defaultCartState;
  }

  return defaultCartState;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
  };

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};