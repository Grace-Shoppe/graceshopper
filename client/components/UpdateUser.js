import React from 'react'
import {connect} from 'react-redux'
import {me, updateUser} from '../store/user'
import UpdateUserForm from './UpdateUserForm'

class UpdateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      address: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.gotUser(this.props.match.params.id)
  }

  componentDidUpdate(oldProps) {
    if (oldProps.selectedUser !== this.props.selectedUser) {
      this.setState({
        name: this.props.selectedUser.name,
        email: this.props.selectedUser.price,
        address: this.props.selectedUser.imageUrl
      })
    }
  }

  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.updateUser(this.props.match.params.id, this.state)
      const {name, email, address} = this.state
      this.setState({
        name: name,
        email: email,
        address: address
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange(event) {
    try {
      this.setState({
        [event.target.name]: event.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="single-product-div">
        <div id="backgrounding">
          <h1>EDIT USER PAGE</h1>
          <UpdateUserForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
            email={this.state.email}
            address={this.state.address}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedUser: state.user.selectedUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotUser: userId => dispatch(me(userId)),
    updateUser: (userId, user) => dispatch(updateUser(userId, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)