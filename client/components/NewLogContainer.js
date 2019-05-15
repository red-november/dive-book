/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getShopsThunk,
  addLogThunk,
  getSingleShopThunk,
  getObservationsThunk,
  getSingleLogThunk
} from '../store/index'
import {SingleLogTable, ObservationSearch} from './index'
import LogForm from './LogForm'

class AddLog extends Component {
  constructor() {
    super()
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
    await this.props.fetchShops()
    await this.props.fetchObservations()
    // const {observations} = this.props.singleLog
    // await this.setState({
    //   diverObservations: observations
    // })
  }

  handleChange(evt) {
    if (evt.target.name === 'diveshopId') {
      //fetch single shop if id is not null
      evt.target.value && this.props.fetchSingleShop(evt.target.value)
      this.setState({displayText: false})
    } else if (
      (evt.target.name === 'diveName' && evt.target.value === 'Other') ||
      (evt.target.name === 'diveshopId' && evt.target.value === '')
    ) {
      this.setState({displayText: true})
    } else if (evt.target.name === 'diveName' && !this.state.displayText) {
      let [diveName, offeredDiveId] = evt.target.value.split('^')
      offeredDiveId = Number(offeredDiveId)
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
        [evt.target.name]: evt.target.value
      })
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    let observations = this.state.diverObservations.map(obs => ({
      observationId: obs.id
    }))
    await this.setState({
      diverObservations: observations,
      currentList: []
    })

    this.props.addLog(this.state)

    this.setState({
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
      currentList: [],
      diverObservations: []
    })
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
        currentObsArr.push({
          id: topSelection.id,
          name: topSelection.name,
          imageUrl: topSelection.imageUrl
        })
        this.setState({diverObservations: currentObsArr})
      }
    }
  }

  render() {
    return (
      <div className="form-container ChartContainer">
        <h3 className="page-container">New Log: </h3>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allShops: state.shops,
  singleShop: state.singleShop,
  singleLog: state.singleLog,
  observations: state.observations
})

const mapDispatchToProps = dispatch => ({
  fetchShops: () => dispatch(getShopsThunk()),
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId)),
  addLog: log => dispatch(addLogThunk(log)),
  onLoadLog: async id => {
    await dispatch(getSingleLogThunk(id))
  },
  fetchObservations: () => {
    dispatch(getObservationsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)
