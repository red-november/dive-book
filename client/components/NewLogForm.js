import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getShopsThunk, addLogThunk, getSingleShopThunk} from '../store/index'
import Form from './FormContainer'

class AddLog extends Component {
  constructor() {
    super()
    this.state = {
      date: '',
      diveShopId: null,
      diveName: '',
      timeIn: '',
      timeOut: '',
      location: '',
      maxDepth: 0,
      tankPressureStart: 0,
      tankPressureEnd: 0,
      tankType: 'aluminum',
      beltWeight: 0,
      wetSuitType: 'none',
      wetSuitThickness: 0,
      airMixture: 'air',
      description: '',
      visibility: 0,
      hasStrongCurrent: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchShops()
  }

  handleChange(evt) {
    console.log('in change event:')
    console.log('value:', evt.target.value)

    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addLog(this.state)
    this.setState({
      diveshopId: 0,
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
      visibility: 0,
      hasStrongCurrent: false,
      date: ''
    })
  }
  render() {
    return (
      <Form
        log={this.state}
        shops={this.props.allShops}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = state => ({
  allShops: state.shops,
  singleShop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
  fetchShops: () => dispatch(getShopsThunk()),
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId)),
  addLog: log => dispatch(addLogThunk(log))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)
