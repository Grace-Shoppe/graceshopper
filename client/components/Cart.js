import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CartLine from './cartLine'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    console.log('eeeeeeee')
    this._isMounted = true
    const {data} = await axios.get('/api/itemizeds/order')
    console.log('----->', data)
    // if (this._isMounted) {
    //   this.setState({products})
    // }
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

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
