import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

function Chips({classes, label, handleDelete, imageUrl}) {
  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar alt={label} src={imageUrl} />}
        label={label}
        onDelete={handleDelete}
        // className={classes.chip}
      />
    </div>
  )
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chips)
