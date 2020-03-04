import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CartLine from './cartLine'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  async handleClick(e) {
    // try {
    //   e.preventDefault()
    //   // const status =
    //   // const totalPrice =
    //   // const id =
    //   await this.props.checkoutOrder()
    // } catch (e) {
    //   console.error(e)
    // }
  }

  render() {
    const cart = this.props.cart
    console.log('PROPSSSSSS', this.props)
    return (
      <div id="cart">
        <h2>Cart</h2>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
        <button onClick={this.handleClick}>Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
