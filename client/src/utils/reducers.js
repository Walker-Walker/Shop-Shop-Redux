import { useReducer } from "react";

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";
// redux: define initial state

let initialState = {
products:{},
categories:{},
currentCategory:{},
cart:{}

}
//redux: export default function reducer(currentState, action) { ...... return newState}
// export const reducer = (state, action) => {
  export default function reducer(currentState = initialState, action) {
switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...currentState,
        products: [...action.products],
      };
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new currentState object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...currentState,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...currentState,
        currentCategory: action.currentCategory,
      };

      case ADD_TO_CART:
        return {
          ...currentState,
          cartOpen: true,
          cart: [...currentState.cart, action.product]
        };

        case ADD_MULTIPLE_TO_CART:
          return {
            ...currentState,
            cart: [...currentState.cart,...action.products],
          };

          case REMOVE_FROM_CART:
            let newState = currentState.cart.filter(product => {
              return product._id !== action._id;
            });

            return {
              ...currentState,
              cartOpen: newState.length > 0,
              cart: newState
            };

            case UPDATE_CART_QUANTITY:
              return {
                ...currentState,
                cartOpen: true,
                cart: state.cart.map(product => {
                  if(action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                  }
                  return product;
                })
              }

              case CLEAR_CART:
                return {
                  ...currentState,
                  cartOpen: false,
                  cart: []
                };

                case TOGGLE_CART: 
                return {
                  ...currentState,
                  cartOpen: !state.cartOpen
                };
    //if it's none of these actions, do not update state at all and keep things the same!
    default:
      return currentState;
  }
// define initialstate? 
// let initialState = {  }

  // return newState
};
// //not sure if this is workable ?
// export function useProductReducer(initialState) {
//   return useReducer(reducer, initialState);
// }
