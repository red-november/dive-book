import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import NavMenu from './styling/NavMenu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import LinkButton from './styling/LinkButton'

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
      {name: 'Analysis', link: '/home/analysis'},
      {name: 'Log Out', link: '/home', func: handleClick}
    ]
  }

  const ownerMenu = {
    menuName: 'Shop Admin',
    itemArr: [
      {name: 'Shop QR', link: '/shopqr'},
      {name: 'Shop Stats', link: '/home'},
      {name: 'Edit Dives', link: '/home'}
    ]
  }
  const globalMenu = {
    menuName: 'Global',
    itemArr: [
      {name: 'Encyclopedia', link: '/observations'},
      {name: 'Offered Dives', link: '/alloffereddives'},
      {name: 'Logs', link: '/logs'}
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
        <nav className="navBar">
          {isLoggedIn ? (
            <div className="main-nav">
              {/* The navbar will show these links after you log in */}
              <NavMenu className="main-nav-menu" {...diverMenu} />
              <NavMenu className="main-nav-menu" {...globalMenu} />

              {isOwner && <NavMenu className="main-nav-menu" {...ownerMenu} />}
              <LinkButton name="New Log" link="/create" />
            </div>
          ) : (
            <div className="main-nav">
              {/* The navbar will show these links before you log in */}
              <LinkButton name="Log In" link="/login" />
              <LinkButton name="Sign Up" link="/signup" />
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
