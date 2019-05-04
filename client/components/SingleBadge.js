import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDiverLogsWithObservationsThunk, getDiverCertsThunk, getBadgesThunk} from '../store'
import {getDiverBadgesThunk} from '../store/diverBadgesReducer'
import * as d3 from 'd3'
import {GraphifyDiscoverer, FillDiscoverer} from '../../utilities/d3Utils'

class SingleBadge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: false
    }
  }

  componentDidMount() {
    this.props.loadDiverLogs(this.props.match.params.userId)
    this.props.loadDiverCerts(this.props.match.params.userId)
    this.props.loadDiverBadges(this.props.match.params.userId)
  }

  activateGraph = async () => {
    const {diverProfile} = this.props
    let discovered = []

    let data = [
      {height: 0, fill: 'green', text: 'flora'},
      {height: 0, fill: 'aquamarine', text: 'mollusks'},
      {height: 0, fill: 'blue', text: 'fish'},
      {height: 0, fill: 'violet', text: 'coral'},
      {height: 0, fill: 'red', text: 'mammals'},
      {height: 0, fill: 'orange', text: 'other living things'},
      {height: 0, fill: 'yellow', text: 'sponges'},
      {height: 0, fill: 'white', text: 'inanimate objects'}
    ]

    await diverProfile.forEach(log => {
      log.observations.forEach(obs => {
        let {name, category} = obs
        if(discovered.indexOf(name)) {
          discovered.push(name);
          data = FillDiscoverer(data, category)
        }
      })
    })

    console.log(discovered)
    console.log(data)

    await this.setState({
      activated: true
    })

    const canvas = d3.select('.canva')

    // GraphifyDiscoverer(canvas, data, dimensions, margin, axisIntervals)

    await GraphifyDiscoverer(canvas, data, 600  , 100, 5)
  }

  deactivateGraph = () => {
    this.setState({
      activated: false
    })
  }

  render() {
    let {activated} = this.state
    return (
      <div>
        <div className="OptionComponent">
          {activated ? (
            <div className="SubmitOrder" onClick={this.deactivateGraph}>
              Deactivate D3
            </div>
          ) : (
            <div className="SubmitOrder Ready" onClick={this.activateGraph}>
              Activate D3
            </div>
          )}
        </div>
        <div className="canva" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    diverProfile: state.diverProfile,
    diverCerts: state.diverCerts,
    diverBadges: state.diverBadges
  }
}

const mapDispatchToProps = dispatch => ({
  loadDiverLogs: diverId => {
    dispatch(getDiverLogsWithObservationsThunk(diverId))
  },
  loadDiverCerts: diverId => {
    dispatch(getDiverCertsThunk(diverId))
  },
  loadDiverBadges: diverId => {
    dispatch(getDiverBadgesThunk(diverId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBadge)
