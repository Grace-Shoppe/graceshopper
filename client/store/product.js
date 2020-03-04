import axios from 'axios'
import history from '../history'

const initialState = {
  products: [],
  cart: [],
  selectedProduct: {}
}
/**
 * ACTION TYPES
 */
const GOT_PRODUCT = 'GOT_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'
const BOUGHT_PRODUCT = 'BOUGHT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
export const gotProduct = product => ({type: GOT_PRODUCT, product})
export const UpdateCart = product => ({type: UPDATE_CART, product})
export const boughtProducts = (status, totalPrice, id) => ({
  type: BOUGHT_PRODUCT,
  status,
  totalPrice,
  id
})
/**
 * THUNK CREATORS
 */
export const gotProductFromServer = productId => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(product))
  } catch (err) {
    console.error(err)
  }
}

export const updateCart = (product, itemQty) => async dispatch => {
  try {
    await axios.post(`/api/itemizeds`, {product, itemQty})
    dispatch(UpdateCart(product))
  } catch (err) {
    console.error(err)
  }
}

export const checkoutOrder = (status, totalPrice, id) => async dispatch => {
  try {
    await axios.put(`/api/orders/${id}`, {status, totalPrice, id}) //***** */
    dispatch(boughtProducts(status, totalPrice))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return {...state, selectedProduct: action.product}
    case UPDATE_CART:
      return {...state, cart: [...state.cart, action.product]}
    case BOUGHT_PRODUCT:
      return {
        ...state,
        cart: []
      } /*********make sure you update the order table 
      status: action.status
      totalPrice: action.totalPrice
      */
    default:
      return state
  }
}
