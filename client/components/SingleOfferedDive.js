import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleOfferedDiveThunk} from '../store'

class SingleOfferedDive extends Component {
  componentDidMount() {
    this.props.fetchSingleOfferedDive(this.props.match.params.diveId)
  }

  render() {
    console.log(this.props)
    const {id, imageURL, location, description} = this.props.singleOfferedDive
    if (!this.props.singleOfferedDive) return <h1>Loading...</h1>
    return (
      <div>
        <h3>{this.props.singleOfferedDive.name}</h3>
        <h4>
          <img
            className="singleDiveImg"
            src={`/pictures/offereddives/${imageURL}`}
          />
          <p />
          {location}
          <p />
          {description}
          <p />
        </h4>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleOfferedDive: state.singleOfferedDive
})

const mapDispatchToProps = dispatch => ({
  fetchSingleOfferedDive: id => dispatch(getSingleOfferedDiveThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOfferedDive)
