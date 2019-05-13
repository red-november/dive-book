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
import {Link} from 'react-router-dom'
import history from '../history'
import Loading from './styling/Loading'
import {SingleLogTable} from './index'

class SingleLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      diveshopId: 1,
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
      offeredDiveId: 1,
      displayQrScanner: false,
      activate: false
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
      offeredDiveId
    } = this.props.singleLog

    await this.setState({
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

    await this.props.fetchSingleShop(this.props.singleLog.diveshopId)
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

    await this.props.updateLog(this.props.singleLog.id, this.state)
  }

  displayScanner = () => {
    this.setState({displayQrScanner: !this.state.displayQrScanner})
  }

  activated = () => {
    this.setState({
      activated: true
    })
  }

  deActivated = async () => {
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
      displayText,
      offeredDiveId,
      activated: false
    })
    await this.props.fetchSingleShop(this.props.singleLog.diveshopId)
  }

  async reload() {
    await this.props.onLoadLog(this.props.match.params.id)
    await this.props.fetchSingleShop(this.props.singleLog.diveshopId)
  }

  render() {
    const {activated, date} = this.state
    const {singleLog, singleShop, diver} = this.props
    const {
      id,
      diveName,
      location,
      timeIn,
      timeOut,
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
      isVerified
    } = singleLog

    if (!singleShop.id) {
      this.reload()
    }

    if (!singleLog.id || !date) {
      return <Loading />
    }

    return (
      <div>
        {diver.id === singleLog.diverId &&
          (!activated ? (
            <button type="button" onClick={this.activated}>
              {' '}
              Edit Log
            </button>
          ) : (
            <div>
              <button type="button" onClick={this.deActivated}>
                {' '}
                Exit Edit Mode
              </button>
            </div>
          ))}

        {!activated ? (
          <SingleLogTable
            {...this.props.singleLog}
            singleShop={singleShop}
            diveName={diveName}
            singleLog={singleLog}
          />
        ) : (
          <div>
            <UpdateForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              log={this.state}
              allShops={this.props.allShops}
              singleShop={this.props.singleShop}
            />
            <Link to="/qr">
              <button onClick={this.displayScanner}>Toggle QR Scanner</button>{' '}
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  diver: state.diver,
  singleLog: state.singleLog,
  allShops: state.shops,
  singleShop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
  onLoadLog: async id => {
    await dispatch(getSingleLogThunk(id))
  },
  updateLog: async (id, data) => {
    await dispatch(updateLogThunk(id, data))
  },
  fetchShops: async () => {
    await dispatch(getShopsThunk())
  },
  fetchSingleShop: async shopId => {
    await dispatch(getSingleShopThunk(shopId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleLog)
