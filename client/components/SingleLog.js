import React, {Component} from 'react'
import {getSingleLogThunk} from '../store/logs'
import {connect} from 'react-redux'

class SingleLog extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.onLoadLog(this.props.match.params.id)
  }
  render() {
    const {singleLog} = this.props

    return <div>{singleLog.diveName}</div>
  }
}

const mapStateToProps = state => ({
  singleLog: state.logs.singleLog
})

const mapDispatchToProps = dispatch => ({
  onLoadLog: id => {
    dispatch(getSingleLogThunk(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleLog)
