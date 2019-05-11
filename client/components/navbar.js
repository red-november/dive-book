import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import SimpleMenu from './NavMenu'

const Navbar = ({handleClick, isLoggedIn, isOwner, history}) => {
  const diverMenu = {
    menuName: 'Diver Menu',
    itemArr: [
      {name: 'Profile', link: '/home'},
      {name: 'New Log', link: '/create'},
      {name: 'Analysis', link: '/home/analysis'},
      {name: 'Log Out', link: '/home', func: handleClick}
    ]
  }

  return (
    <div>
      <h1>DiveBook</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link id="newLog" to="/create">
              Add a Log
            </Link>
            <Link id="analysis" to="/home/analysis">
              Analysis
            </Link>
            {isOwner && <Link to="/shopqr">Generate Shop QR</Link>}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <SimpleMenu {...diverMenu} />
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.diver.id,
    isOwner: !!state.diver.diveshopId
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
