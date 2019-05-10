import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isOwner}) => (
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
          <Link id="observations" to="/observations">
            Encyclopedia
          </Link>
          <Link id="allLogs" to="/logs">
            All Dive Logs
          </Link>
          <Link id="allOfferedDives" to="/alloffereddives">
            All Offered Dives
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
    </nav>
    <hr />
  </div>
)

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
