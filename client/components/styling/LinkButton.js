import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const styles = theme => ({
  // button: {
  //   margin: theme.spacing.unit
  // },
  input: {
    display: 'none'
  }
})

function TextButtons(props) {
  const {classes, link, name} = props
  return (
    <div>
      <Button href={link} className={classes.button}>
        {name}
      </Button>
    </div>
  )
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextButtons)
