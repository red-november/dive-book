import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createCertificationThunk} from '../store'
import {CertForm} from '../components'

class CreateCert extends Component {
  constructor() {
    super()
    this.state = {
      certId: '',
      provider: 'NAUI',
      date: '',
      level: 'Open Water',
      instructorId: '',
      displayTextOrg: false,
      displayTextLevel: false,
      diverId: ''
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
    await this.setState({
      level: event.target.level.value,
      diverId: this.props.diver.id,
      provider: event.target.provider.value
    })
    await this.props.createCert(this.state)
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
