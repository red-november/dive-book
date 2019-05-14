import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

function Chips({arr, classes, handleDelete}) {
  return (
    <div className={classes.root}>
      {arr.map(elem => (
        <Chip
          key={elem.id}
          avatar={<Avatar alt={elem.name} src={elem.imageUrl} />}
          label={elem.name}
          onDelete={() => handleDelete(elem.id)}
          className={classes.chip}
        />
      ))}
    </div>
  )
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Chips)
