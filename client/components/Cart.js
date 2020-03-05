import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CartLine from './CartLine'
import {getCart} from '../store/product'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart
    console.log('PROPSSSSSS', this.props)
    return (
      <div id="cart">
        <h2>Cart</h2>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
        <p>
          <button>
            <Link to="/checkout">Checkout</Link>
          </button>
        </p>
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
