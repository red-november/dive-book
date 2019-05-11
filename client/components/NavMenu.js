import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link} from 'react-router-dom'

class NavMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleLogout = () => {
    this.setState({anchorEl: null})
    this.props.handleLogOut()
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state
    console.log('props:', this.props)

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Diver Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to="/home">Profile</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/home/analysis">Analysis</Link>
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.diver.id,
    isOwner: !!state.diver.diveshopId
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavMenu)
