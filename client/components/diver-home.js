import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const DiverHome = props => {
  const {firstName, email} = props.diver
  console.log(props)

  return (
    <div>
      <h3>Welcome {firstName}!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    diver: state.diver
  }
}

export default connect(mapState)(DiverHome)

/**
 * PROP TYPES
 */
DiverHome.propTypes = {
  email: PropTypes.string
}
