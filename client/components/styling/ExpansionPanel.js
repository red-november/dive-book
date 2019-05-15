/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

function SimpleExpansionPanel(props) {
  const {classes, itemArr} = props
  return (
    <div className={classes.root}>
      {itemArr.map((item, idx) => (
        <div key={`item${idx}`}>
          {' '}
          <ExpansionPanel disabled={item.contentCount === 0}>
            <ExpansionPanelSummary expandIcon={'🐠'}>
              <Typography className={classes.heading}>{item.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{item.content}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ))}

      {/* <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel> */}
    </div>
  )
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleExpansionPanel)
