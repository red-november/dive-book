import React, {Component} from 'react'
import QrReader from 'react-qr-reader'
import {connect} from 'react-redux'
import {verifyLogThunk} from '../store/index'

class Scanner extends Component {
  state = {
    result: 'No result'
  }

  handleScan = async data => {
    if (data) {
      this.setState({
        result: data
      })
      this.props.verifyLog(this.props.singleLog.id, this.state.result)
    }
  }

  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{width: '100%'}}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleLog: state.singleLog
})

const mapDispatchToProps = dispatch => ({
  verifyLog: (logId, scannedId) => {
    dispatch(verifyLogThunk(logId, scannedId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scanner)
