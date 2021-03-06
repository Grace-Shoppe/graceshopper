import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  gotProductFromServer,
  updateCart,
  updateCartLocally
} from '../store/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      itemQty: 1
    }
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
    this.updateCart = this.updateCart.bind(this)
    this.updateCartLocally = this.updateCartLocally.bind(this)
  }

  componentDidMount() {
    this.props.gotProductFromServer(this.props.match.params.id)
  }

  decrement() {
    if (this.state.itemQty > 0) {
      this.setState({
        itemQty: this.state.itemQty - 1
      })
    }
  }

  increment() {
    if (this.state.itemQty >= this.props.selectedProduct.stock) {
      alert('PRODUCT SOLD OUT')
    } else {
      this.setState({
        itemQty: this.state.itemQty + 1
      })
    }
  }

  updateCart() {
    this.props.updateCart(this.props.selectedProduct, this.state.itemQty)
    let x = document.getElementById('modal-body')
    x.className = 'show'
    setTimeout(function() {
      x.className = x.className.replace('show', '')
    }, 4000)
  }

  updateCartLocally() {
    this.props.updateCartLocally(this.props.selectedProduct, this.state.itemQty)
    let x = document.getElementById('modal-body')
    x.className = 'show'
    setTimeout(function() {
      x.className = x.className.replace('show', '')
    }, 4000)
  }

  render() {
    const product = this.props.selectedProduct
    return (
      <div className="single-product-div">
        <div id="backgrounding">
          <h3>{product.name}</h3>
          <img src={product.imageUrl} />
          <p>Price: {product.price}$</p>
          <div id="productQty">
            <button id="ButtonQTY" type="button" onClick={this.decrement}>
              -
            </button>
            <div id="productQtyValue">{this.state.itemQty}</div>
            <button id="ButtonQTY" type="button" onClick={this.increment}>
              +
            </button>
          </div>
          <p>
            {this.props.isLoggedIn && (
              <button type="button" onClick={this.updateCart}>
                Add to cart
              </button>
            )}
            {!this.props.isLoggedIn && (
              <button type="button" onClick={this.updateCartLocally}>
                Add to cart
              </button>
            )}
          </p>
          <div className="modal-body" id="modal-body">
            You've added {this.state.itemQty} {product.name} added to cart!
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct,
    isLoggedIn: !!state.user.selectedUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotProductFromServer: productId =>
      dispatch(gotProductFromServer(productId)),
    updateCart: (product, itemQty) => dispatch(updateCart(product, itemQty)),
    updateCartLocally: (product, itemQty) =>
      dispatch(updateCartLocally(product, itemQty))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
