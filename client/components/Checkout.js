import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <h1>HELLOWORLD</h1>
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
