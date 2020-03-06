import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartLine from './CartLine'
import {getCart} from '../store/product'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Cart</h2>
        {cart.length ? (
          <div>
            <ul>
              {cart.map(item => <CartLine key={item.id} cartLine={item} />)}
            </ul>
            <button className="butt1" type="button">
              <a href="/products">Continue Shopping</a>
            </button>
            <button className="butt1" type="button">
              <a href="/checkout">Checkout</a>
            </button>
          </div>
        ) : (
          <div>
            <h3>You should probably buy something!</h3>
            <button>Dude don't be so cheap.</button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
