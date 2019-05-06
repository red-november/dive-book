import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createCertificationThunk} from '../store'

class CreateCert extends Component {
  constructor() {
    super()
    this.state = {
      certId: '',
      provider: '',
      date: '',
      level: '',
      instructorId: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    // create the object property
    const data = {
      diverId: this.props.diver.id,
      certId: event.target.certId.value,
      provider: event.target.provider.value,
      date: event.target.date.value,
      level: event.target.level.value,
      instructorId: event.target.instructorId.value
    }
    await this.props.createCert(data)
  }

  render() {
    const {certId, provider, date, level, instructorId} = this.state
    return (
      <form className="InputForm" onSubmit={this.handleSubmit}>
        <label htmlFor="certId">Certification ID: </label>
        <input
          type="text"
          name="certId"
          value={certId}
          onChange={this.handleChange}
        />

        <label htmlFor="provider">Provider: </label>
        <input
          type="text"
          name="provider"
          value={provider}
          onChange={this.handleChange}
        />

        <label htmlFor="date">Date Obtained: </label>
        <input
          type="text"
          name="date"
          value={date}
          onChange={this.handleChange}
        />

        <label htmlFor="level">Level: </label>
        <input
          type="text"
          name="level"
          value={level}
          onChange={this.handleChange}
        />

        <label htmlFor="instructorId">Instructor ID: </label>
        <input
          type="text"
          name="instructorId"
          value={instructorId}
          onChange={this.handleChange}
        />

        <button type="submit">Create Certification</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  diver: state.diver,
  SingleCert: state.SingleCert
})

const mapDispatchToProps = dispatch => ({
  createCert: data => dispatch(createCertificationThunk(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCert)
