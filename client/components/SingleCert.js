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
      instructorId: '',
      displayText: false
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
    if (event.target.name === 'provider' && event.target.value === 'Other') {
      this.setState({displayText: true})
    }
    console.log('selected')
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
    console.log(data)

    await this.props.updateSingleCert(this.props.SingleCert.id, data)
  }

  handleDelete = async () => {
    await this.props.deleteSingleCert(this.props.SingleCert.id)
  }

  render() {
    const providerOptions = ['MAUI', 'PADI', 'SSI', 'Other']
    const levelOptions = [
      'Open Water',
      'Advancded Open Water',
      'Rescue Diver',
      'Deep Diver'
    ]
    const {
      certId,
      provider,
      date,
      level,
      instructorId,
      displayText
    } = this.state
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

        {!displayText ? (
          <select name="provider" onChange={this.handleChange}>
            {providerOptions.map(
              opt =>
                opt === this.props.SingleCert.provider ? (
                  <option value={opt} selected>
                    {opt}
                  </option>
                ) : (
                  <option value={opt}>{opt}</option>
                )
            )}
          </select>
        ) : (
          <input
            type="text"
            name="provider"
            value={provider}
            onChange={this.handleChange}
          />
        )}

        <label htmlFor="date">Date Obtained: </label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={this.handleChange}
        />

        <label htmlFor="level">Level: </label>
        <select name="level" onChange={this.handleChange}>
          {levelOptions.map(
            opt =>
              opt === this.props.SingleCert.level ? (
                <option value={opt} selected>
                  {opt}
                </option>
              ) : (
                <option value={opt}>{opt}</option>
              )
          )}
        </select>
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
