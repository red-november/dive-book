import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createCertificationThunk} from '../store'
import {CertForm} from '../components'

class CreateCert extends Component {
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
    return (
      <CertForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        {...this.state}
        singleCert={this.props.SingleCert}
      />
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
