/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getShopsThunk, addLogThunk, getSingleShopThunk} from '../store/index'
import Form from './FormContainer'

class AddLog extends Component {
  constructor() {
    super()
    this.state = {
      date: '',
      diveshopId: null,
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
      hasStrongCurrent: false,
      displayText: false,
      offeredDiveId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchShops()
  }

  handleChange(evt) {
    if (evt.target.name === 'diveshopId') {
      //fetch single shop if id is not null
      evt.target.value && this.props.fetchSingleShop(evt.target.value)
      this.setState({displayText: false})
    }

    if (
      (evt.target.name === 'diveName' && evt.target.value === 'Other') ||
      (evt.target.name === 'diveshopId' && evt.target.value === '')
    ) {
      this.setState({displayText: true})
    }
    if (evt.target.name === 'diveName' && !this.state.displayText) {
      let [diveName, offeredDiveId] = evt.target.value.split('^')
      offeredDiveId = Number(offeredDiveId)
      this.setState({
        diveName,
        offeredDiveId
      })
    } else {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
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
      date: '',
      displayText: false,
      offeredDiveId: null
    })
  }
  render() {
    return (
      <Form
        log={this.state}
        shops={this.props.allShops}
        singleShop={this.props.singleShop}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        displayText={this.state.displayText}
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
