import { createReducer, on, State } from '@ngrx/store';
import { createStore } from 'redux';
import { Product } from './../app/product/product';
import { ActionTypes } from './action';
import { loadState } from './localstorage';


export interface InitialState {
    items: Array<Product>;
    cart: Array<Product>;
}

export const initialState = {
    items: [],
    cart: []
};


export function ShopReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LoadSuccess:
            return {
                ...state,
                items: updateObjectInArray(state.items.length > 0 ? state.items : action.payload,action.payload)
            };
        case ActionTypes.Add:
            return {
                ...state,
                // cart: [...state.cart, action.payload],
                cart: addItemToCart(state.cart, action.payload),

            }
        case ActionTypes.QtyUp:
            return {
                ...state,
                cart: addItemToCart(state.cart, action.payload),
                items: addItemToCart(state.items, action.payload),
            }

        case ActionTypes.QtyDown:
            return {
                ...state,
                cart: removeItemFromCart(state.cart, action.payload),
                items: addItemToCart(state.items, action.payload),
            }


        case ActionTypes.Remove:
            return {
                ...state,
                cart: [...state.cart.filter(item => item.name != action.payload.name)],
                items: addItemToCart(state.items, action.payload)
            };
        default:
            return state;
    }
}

export const addItemToCart = (cartItems, cartItemToAdd) => {
    //find(condition) finds the first item in the array based on the condition.
    const existingCartItem = cartItems.find(item => item.name === cartItemToAdd.name);
    if (existingCartItem) {
        //in order for change detection to trigger we have to rerender
        //otherwise our quantity property will not be updated
        //map will return a new array 
        //we need to return new versions of our state so that our component know to re render
        //here we update the quantity property
        return cartItems.map(item =>
            item.name === cartItemToAdd.name
                ? { ...cartItemToAdd, quantity: cartItemToAdd.quantity, inCart: cartItemToAdd.inCart }
                : item
        );
    }
    //when you first time add a new item, sine exixtingCartItem will be falsy, it will pass the first if block and will come here
    //quantity property gets attached the first time around since this if block wont run when it is a new item.
    //in the beginning cartItems array is empty. every time you add a new item to this array, it will add "quantity:1" to this item object.  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    //check if item is already in the cartItems
    const existingCartItem = cartItems.find(
        item => item.name === cartItemToRemove.name
    );
    //if there is only 1, upon clicking, we should remove the item from the array
    if (existingCartItem.quantity === 1) {
         return cartItems.filter(item => item.name !== cartItemToRemove.name);
    }

    return cartItems.map(item =>
        item.name === cartItemToRemove.name
            ? { ...item, quantity: cartItemToRemove.quantity, inCart: cartItemToRemove.inCart }
            : item
    );

};
export const updateObjectInArray = (array, action) => {
    return array.map((item, index) => {
      if (item.name !== action.name) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...action.item
      }
    })
  }
  

