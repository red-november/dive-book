import React, {Component} from 'react'
import {getSingleLogThunk, updateLogThunk} from '../store'
import {connect} from 'react-redux'

class SingleLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      diveShop: {},
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
  componentDidMount() {
    this.props.onLoadLog(this.props.match.params.id)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateLog(this.props.singleLog.id, this.state.diveName)
  }

  render() {
    const {singleLog} = this.props
    console.log(this.props)

    if (!singleLog.id) {
      return <h1>LOADING</h1>
    }

    return (
      // <div>
      //   <div>{singleLog.diveShop}</div>
      //   <div>{singleLog.diveName}</div>
      //   <div>{singleLog.timeIn}</div>
      //   <div>{singleLog.timeOut}</div>
      //   <div>{singleLog.location}</div>
      //   <div>{singleLog.maxDepth}</div>
      //   <div>{singleLog.tankPressureStart}</div>
      //   <div>{singleLog.tankPressureEnd}</div>
      //   <div>{singleLog.tankType}</div>
      //   <div>{singleLog.beltWeight}</div>
      //   <div>{singleLog.wetSuitType}</div>
      //   <div>{singleLog.wetSuitThickness}</div>
      //   <div>{singleLog.airMixture}</div>
      //   <div>{singleLog.description}</div>
      //   <div>{singleLog.visibility}</div>
      //   <div>{singleLog.hasStrongCurrent}</div>
      // </div>
      <div>
        <h2>Log: </h2>
        <form>
          <label id="form" htmlFor="diveShop">
            Dive Name:
          </label>
          <input
            type="text"
            name="diveName"
            value={this.state.diveName}
            onChange={this.handleChange}
            placeholder={singleLog.diveName}
          />
          <label id="form" htmlFor="timeIn">
            Time In:
          </label>
          <input
            type="text"
            name="timeIn"
            value={singleLog.timeIn}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="timeOut">
            Time Out:
          </label>
          <input
            type="text"
            name="timeOut"
            value={singleLog.timeOut}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="location">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={singleLog.location}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="maxDepth">
            Max Depth:
          </label>
          <input
            type="number"
            name="maxDepth"
            value={singleLog.maxDepth}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="tankPressureStart">
            Tank Pressure Start:
          </label>
          <input
            type="number"
            name="tankPressureStart"
            value={singleLog.tankPressureStart}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="tankPressureEnd">
            Tank Pressure End:
          </label>
          <input
            type="number"
            name="tankPressureEnd"
            value={singleLog.tankPressureEnd}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="tankType">
            Tank Type:
          </label>
          <input
            type="text"
            name="tankType"
            value={singleLog.tankType}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="beltWeight">
            Belt Weight:
          </label>
          <input
            type="number"
            name="beltWeight"
            value={singleLog.beltWeight}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="wetSuitType">
            Wet Suit Type:
          </label>
          <input
            type="text"
            name="wetSuitType"
            value={singleLog.wetSuitType}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="wetSuitThickness">
            Wet Suit Thickness:
          </label>
          <input
            type="number"
            name="wetSuitThickness"
            value={singleLog.wetSuitThickness}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="airMixture">
            Air Mixture:
          </label>
          <input
            type="text"
            name="airMixture"
            value={singleLog.airMixture}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="description">
            Description:
          </label>
          <textarea
            type="text"
            name="description"
            value={singleLog.description}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="visibility">
            Visibility:
          </label>
          <input
            type="number"
            name="visibility"
            value={singleLog.visibility}
            onChange={this.handleChange}
          />
          <label id="form" htmlFor="hasStrongCurrent">
            Strong Current?
          </label>
          <select>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button id="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleLog: state.singleLog
})

const mapDispatchToProps = dispatch => ({
  onLoadLog: id => {
    dispatch(getSingleLogThunk(id))
  },
  updateLog: (id, diveName) => {
    dispatch(updateLogThunk(id, diveName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleLog)
