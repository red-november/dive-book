import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOfferedDivesThunk} from '../store/index'

class AllOfferedDives extends Component {
  componentDidMount() {
    this.props.fetchAllOfferedDives()
  }

  render() {
    const {allOfferedDives} = this.props
    if (!allOfferedDives) return <h1>Loading...</h1>
    return (
      <div>
        <h1>All the Offered Dives:</h1>
        <ul>
          {allOfferedDives.map(offeredDive => (
            <li key={offeredDive.id}>
              {offeredDive.name}: <p />
              {offeredDive.description}
              <p />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allOfferedDives: state.allOfferedDives
})

const mapDispatchToProps = dispatch => ({
  fetchAllOfferedDives: () => dispatch(getAllOfferedDivesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOfferedDives)
