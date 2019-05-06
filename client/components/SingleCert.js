import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCertificationThunk,
  updateCertificationThunk,
  deleteCertificationThunk
} from '../store'

class SingleCert extends Component {
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

  async componentDidMount() {
    await this.props.fetchSingleCert(this.props.match.params.id)
    const {certId, provider, date, level, instructorId} = this.props.SingleCert
    await this.setState({
      certId,
      provider,
      date,
      level,
      instructorId
    })
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
      certId: event.target.certId.value,
      provider: event.target.provider.value,
      date: event.target.date.value,
      level: event.target.level.value,
      instructorId: event.target.instructorId.value
    }

    await this.props.updateSingleCert(this.props.SingleCert.id, data)
  }

  handleDelete = async () => {
    await this.props.deleteSingleCert(this.props.SingleCert.id)
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
        {/* <input
          type="text"
          name="provider"
          value={provider}
          onChange={this.handleChange}
        /> */}
        <select name="provider" onChange={this.handleChange}>
          <option value={provider}>MAUI</option>
          <option value={provider}>PADI</option>
          <option value={provider}>SSI</option>
          <option value={provider}>Other</option>
        </select>

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

        <button type="submit">Update Certification</button>
        <button type="button" onClick={this.handleDelete}>
          Delete Certification
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  SingleCert: state.SingleCert
})

const mapDispatchToProps = dispatch => ({
  fetchSingleCert: id => dispatch(getCertificationThunk(id)),
  updateSingleCert: (id, data) => dispatch(updateCertificationThunk(id, data)),
  deleteSingleCert: id => dispatch(deleteCertificationThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCert)
