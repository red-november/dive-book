import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCertificationThunk,
  updateCertificationThunk,
  deleteCertificationThunk
} from '../store'
import {CertForm} from './index'

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
    return (
      <div>
        <CertForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          {...this.state}
          singleCert={this.props.SingleCert}
        />
        <button type="button" onClick={this.handleDelete}>
          Delete Certification
        </button>
      </div>
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
