import React, {Component} from 'react'
import {getSingleObservationThunk} from '../store/'
import {connect} from 'react-redux'

class SingleObservation extends Component {
  async componentDidMount() {
    await this.props.fetchSingleObservation(this.props.match.params.obsId)
  }

  render() {
    const {name, category, description, imageUrl, logs} = this.props.singleObservation
    if (!name) return <h1>Loading...</h1>
    return (
      <div className="ChartContainer">
        <h2>{name}</h2>
        <img src={imageUrl} />
        <p>Category: {category}</p>
        <p>{description}</p>
        <table>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.date.slice(0,10)}</td>
              <td>{log.diveName}</td>
              <td>{log.location}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleObservation: state.SingleObservation
})

const mapDispatchToProps = dispatch => ({
  fetchSingleObservation: id => {
    dispatch(getSingleObservationThunk(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleObservation)
