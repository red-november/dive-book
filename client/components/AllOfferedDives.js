import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOfferedDivesThunk} from '../store/index'
import {Link} from 'react-router-dom'

class AllOfferedDives extends Component {
  componentDidMount() {
    this.props.fetchAllOfferedDives()
  }

  render() {
    const {allOfferedDives} = this.props
    const headers = ['Name', 'Location', 'Description']
    if (allOfferedDives.length === 0) return <h1>Loading...</h1>
    return (
      <div>
        <h1>All the Offered Dives:</h1>
        {/* <ul>
          {allOfferedDives.map(offeredDive => (
            <li key={offeredDive.id}>
              {offeredDive.name}: <p />
              {offeredDive.description}
              <p />
            </li>
          ))}
        </ul> */}

        <table>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
          {allOfferedDives.map(dives => (
            <tr key={dives.name}>
              <td>
                <a href={`alloffereddives/${dives.id}`}>{dives.name}</a>
              </td>
              <td>{dives.location}</td>
              <td>{dives.description}</td>
            </tr>
          ))}
        </table>
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
