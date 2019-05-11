/* eslint-disable react/no-array-index-key */
import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
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

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.menuName}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.itemArr.map((menuItem, idx) => (
            <MenuItem
              key={`menu${idx}`}
              onClick={() => {
                this.handleClose()
                menuItem.func && menuItem.func()
              }}
            >
              <Link to={menuItem.link}>{menuItem.name}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default NavMenu
