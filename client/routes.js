import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Home,
  ProductList,
  Product,
  Cart,
  AdminPage,
  SingleUser
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, admin} = this.props
    console.log('state.user', isLoggedIn)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/" component={ProductList} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        {/* <Route exact path="/products/:id" component={Product}/> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/products" component={UserHome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products/:id" component={Product} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/adminPage" component={AdminPage} />
          </Switch>
        )}
        {isLoggedIn &&
          admin && <Route exact path="/user/:id" component={SingleUser} />}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.selectedUser.id,
    admin: state.user.selectedUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
