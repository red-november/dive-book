/* eslint-disable complexity */
import React, {Component} from 'react'
import {
  getSingleLogThunk,
  updateLogThunk,
  getShopsThunk,
  getSingleShopThunk,
  getObservationsThunk
} from '../store/index'
import {connect} from 'react-redux'
import LogForm from './LogForm'
import {Link} from 'react-router-dom'
import history from '../history'
import Loading from './styling/Loading'
import {SingleLogTable, ObservationSearch} from './index'
import {CircleChartObservationToolTip} from './D3Components'

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
      activate: false,
      currentList: [],
      diverObservations: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.keyup = this.keyup.bind(this)
    this.enterObservation = this.enterObservation.bind(this)
    this.removeFromList = this.removeFromList.bind(this)
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
      offeredDiveId,
      observations
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
      offeredDiveId,
      diverObservations: observations
    })

    await this.props.fetchSingleShop(this.props.singleLog.diveshopId)
  }

  handleChange = event => {
    console.log('target:', event.target.name)
    if (event.target.name === 'provider' && event.target.value === 'Other') {
      this.setState({displayText: true})
    } else if (event.target.name === 'diveshopId') {
      //fetch single shop if id is not null
      event.target.value && this.props.fetchSingleShop(event.target.value)
      this.setState({displayText: false})
    } else if (
      (event.target.name === 'diveName' && event.target.value === 'Other') ||
      (event.target.name === 'diveshopId' && event.target.value === '')
    ) {
      this.setState({displayText: true})
    } else if (event.target.name === 'diveName' && !this.state.displayText) {
      let [diveName, offeredDiveId] = event.target.value.split('^')

      this.setState({
        diveName,
        offeredDiveId
      })
    } else if (event.target.name === 'search-selector') {
      let currentObs = event.target.value
      let currentObsArr = [...this.state.diverObservations]
      if (!currentObsArr.find(obs => obs.id === JSON.parse(currentObs).id)) {
        currentObsArr.push(JSON.parse(currentObs))
        this.setState({
          diverObservations: currentObsArr
        })
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    //adjust observations to only include ids
    let observations = this.state.diverObservations.map(obs => ({
      observationId: obs.id,
      logId: Number(this.props.match.params.id)
    }))
    await this.setState({
      diverObservations: observations,
      currentList: []
    })
    await this.props.updateLog(this.props.singleLog.id, this.state)
  }

  //keyup, removeFromList and enterObservation all used for observation search bar
  keyup(evt) {
    let word = evt.target.value
    let newList = this.props.observations.filter(obs => {
      if (obs.name.toLowerCase().includes(word.toLowerCase())) {
        return obs.name
      }
    })
    this.setState({currentList: newList})
  }

  removeFromList(id) {
    let currentObsArr = [...this.state.diverObservations]
    currentObsArr = currentObsArr.filter(obs => obs.id !== id)
    this.setState({diverObservations: currentObsArr})
  }

  enterObservation(evt) {
    if (evt.keyCode === 13) {
      // if (evt.target.name === 'search') {
      //   evt.preventDefault()
      // }
      let topSelection = JSON.parse(
        document.getElementById('observation-selector').value
      )
      let currentObsArr = [...this.state.diverObservations]
      if (!currentObsArr.find(obs => obs.id === topSelection.id)) {
        currentObsArr.push({id: topSelection.id, name: topSelection.name})
        this.setState({diverObservations: currentObsArr})
      }
    }
  }

  displayScanner = () => {
    this.setState({displayQrScanner: !this.state.displayQrScanner})
  }

  activated = () => {
    this.props.fetchObservations()
    this.setState({
      activated: true
    })
  }

  async reload() {
    await this.props.onLoadLog(this.props.match.params.id)
    await this.props.fetchSingleShop(this.props.singleLog.diveshopId)
  }

  render() {
    const {activated, date, diverObservations} = this.state
    const {singleLog, singleShop, diver} = this.props

    if (!singleShop.id) {
      this.reload()
    }

    if (!singleLog.id || !date) {
      return <Loading />
    }

    return (
      <div className="page-container form-container ChartContainer">
        <div className="flex-start-container">
          {diver.id === singleLog.diverId &&
            !activated && (
              <button
                type="button"
                className="btn-main btn-edit"
                onClick={this.activated}
              >
                {' '}
                <i className="far fa-edit" />
              </button>
            )}

          {!activated ? (
            <div className="top-buffer">
              <SingleLogTable
                {...this.props.singleLog}
                singleShop={singleShop}
                diveName={singleLog.diveName}
                singleLog={singleLog}
              />
            </div>
          ) : (
            <div className="top-buffer">
              <LogForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                log={this.state}
                allShops={this.props.allShops}
                singleShop={this.props.singleShop}
                enterObservation={this.enterObservation}
                keyup={this.keyup}
                removeFromList={this.removeFromList}
              />
              <div className="btn-ctr">
                <Link to="/qr">
                  <button
                    className="btn-main  btn-qr"
                    onClick={this.displayScanner}
                  >
                    Toggle QR Scanner
                  </button>{' '}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  diver: state.diver,
  singleLog: state.singleLog,
  allShops: state.shops,
  singleShop: state.singleShop,
  observations: state.observations
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
  },
  fetchObservations: () => {
    dispatch(getObservationsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleLog)
