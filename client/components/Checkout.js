import {connect} from 'react-redux'
import CartLine from './cartLine'
import React, {Component} from 'react'

class Checkout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <h1>Purchase Confirmation</h1>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
