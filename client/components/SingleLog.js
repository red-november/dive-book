/* eslint-disable complexity */
import React, {Component} from 'react'
import {
  getSingleLogThunk,
  updateLogThunk,
  getShopsThunk,
  getSingleShopThunk
} from '../store/index'
import {connect} from 'react-redux'
import UpdateForm from './UpdateLogForm'
import Scanner from './QRscanner'

class SingleLog extends Component {
  constructor(props) {
    super(props)
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
      offeredDiveId: null,
      displayQrScanner: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.onLoadLog(this.props.match.params.id)
    await this.props.fetchShops()
    const {
      date,
      diveshopId,
      diveName,
      timeIn,
      timeOut,
      location,
      maxDepth,
      tankPressureStart,
      tankPressureEnd,
      tankType,
      beltWeight,
      wetSuitType,
      wetSuitThickness,
      airMixture,
      description,
      visibility,
      hasStrongCurrent,
      displayText,
      offeredDiveId
    } = this.props.singleLog

    this.setState({
      date,
      diveshopId,
      diveName,
      timeIn,
      timeOut,
      location,
      maxDepth,
      tankPressureStart,
      tankPressureEnd,
      tankType,
      beltWeight,
      wetSuitType,
      wetSuitThickness,
      airMixture,
      description,
      visibility,
      hasStrongCurrent,
      offeredDiveId
    })
  }

  handleChange = event => {
    if (event.target.name === 'provider' && event.target.value === 'Other') {
      this.setState({displayText: true})
    }
    if (event.target.name === 'diveshopId') {
      //fetch single shop if id is not null
      event.target.value && this.props.fetchSingleShop(event.target.value)
      this.setState({displayText: false})
    }

    if (
      (event.target.name === 'diveName' && event.target.value === 'Other') ||
      (event.target.name === 'diveshopId' && event.target.value === '')
    ) {
      this.setState({displayText: true})
    }
    if (event.target.name === 'diveName' && !this.state.displayText) {
      let [diveName, offeredDiveId] = event.target.value.split('^')
      this.setState({
        diveName,
        offeredDiveId
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    const data = {
      date: event.target.date.value,
      diveshopId: event.target.diveshopId.value,
      diveName: event.target.diveName.value,
      timeIn: event.target.timeIn.value,
      timeOut: event.target.timeOut.value,
      location: event.target.location.value,
      maxDepth: event.target.maxDepth.value,
      tankPressureStart: event.target.tankPressureStart.value,
      tankPressureEnd: event.target.tankPressureEnd.value,
      tankType: event.target.tankType.value,
      beltWeight: event.target.beltWeight.value,
      wetSuitType: event.target.wetSuitType.value,
      wetSuitThickness: event.target.wetSuitThickness.value,
      airMixture: event.target.airMixture.value,
      description: event.target.description.value,
      visibility: event.target.visibility.value,
      hasStrongCurrent: event.target.hasStrongCurrent.value
      // displayText: event.target.displayText.value
      // offeredDiveId: event.target.offeredDiveId.value
    }
    await this.props.updateLog(this.props.singleLog.id, data)
  }

  displayScanner = () => {
    console.log(this.state.displayQrScanner)
    this.setState({displayQrScanner: !this.state.displayQrScanner})
  }

  render() {
    if (!this.props.singleLog.id) {
      return <h1>LOADING</h1>
    }

    return (
      <div>
        <UpdateForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          log={this.state}
          allShops={this.props.allShops}
          singleShop={this.props.singleShop}
        />
        <button onClick={this.displayScanner}>Toggle QR Scanner</button>
        {this.state.displayQrScanner ? (
          <Scanner />
        ) : (
          console.log('Scanner is off')
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleLog: state.singleLog,
  allShops: state.shops,
  singleShop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
  onLoadLog: id => {
    dispatch(getSingleLogThunk(id))
  },
  updateLog: (id, data) => dispatch(updateLogThunk(id, data)),
  fetchShops: () => dispatch(getShopsThunk()),
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleLog)
