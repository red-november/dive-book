import React, {Component} from 'react'
import axios from 'axios'
import Form from './FormContainer'

class AddLog extends Component {
  constructor() {
    super()
    this.state = {
      diveName: '',
      timeIn: 0,
      timeOut: 0,
      location: '',
      maxDepth: 0,
      tankPressureStart: 0,
      tankPressureEnd: 0,
      tankType: '',
      beltWeight: 0,
      wetSuitType: '',
      wetSuitThickness: 0,
      airMixture: '',
      description: '',
      visibility: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await axios.post('/api/logs', this.state)
    this.setState({
      diveName: '',
      timeIn: 0,
      timeOut: 0,
      location: '',
      maxDepth: 0,
      pressureStart: 0,
      pressureEnd: 0,
      tankType: '',
      beltWeight: 0,
      suitType: '',
      suitThickness: 0,
      airMixture: '',
      description: '',
      visibility: 0
    })
  }
  render() {
    return (
      <Form
        log={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default AddLog
