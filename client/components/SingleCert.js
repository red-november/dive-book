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
      displayTextOrg: false,
      displayTextLevel: false
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
      this.setState({displayTextOrg: true})
    }
    if (event.target.name === 'level' && event.target.value === 'Other') {
      this.setState({displayTextLevel: true})
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    await this.props.updateSingleCert(this.props.SingleCert.id, this.state)
  }

  handleDelete = async () => {
    await this.props.deleteSingleCert(this.props.SingleCert.id)
  }

  render() {
    return (
      <div className="cert-container">
        <CertForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          {...this.state}
          singleCert={this.props.SingleCert}
        />
        <button
          type="button"
          className="btn-main btn-form btn-cert btn-danger"
          onClick={this.handleDelete}
        >
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
