import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import NavMenu from './NavMenu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1
  }
}

const Navbar = ({handleClick, isLoggedIn, isOwner, classes}) => {
  const diverMenu = {
    menuName: 'Diver Menu',
    itemArr: [
      {name: 'Profile', link: '/home'},
      {name: 'New Log', link: '/create'},
      {name: 'Analysis', link: '/home/analysis'},
      {name: 'Log Out', link: '/home', func: handleClick}
    ]
  }

  const ownerMenu = {
    menuName: 'Shop Admin Menu',
    itemArr: [
      {name: 'Shop QR', link: '/shopqr'},
      {name: 'Shop Stats', link: '/home'},
      {name: 'Edit Dives', link: '/home'}
    ]
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            DiveBook
          </Typography>
        </Toolbar>
        <nav>
          {isLoggedIn ? (
            <div className="main-nav">
              {/* The navbar will show these links after you log in */}
              <NavMenu className="main-nav-menu" {...diverMenu} />
              {isOwner && <NavMenu className="main-nav-menu" {...ownerMenu} />}
            </div>
          ) : (
            <div className="main-nav-menu">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </AppBar>
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

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
