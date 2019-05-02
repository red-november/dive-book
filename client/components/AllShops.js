import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getShopsThunk} from '../store/index'

class AllShops extends Component {
  componentDidMount() {
    this.props.fetchShops()
  }

  render() {
    return (
      <div>
        <h1>All Shops:</h1>
        <ul>
          {this.props.allShops.map(shop => (
            <li key={shop.id}> {shop.name} </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allShops: state.shops
})

const mapDispatchToProps = dispatch => ({
  fetchShops: () => dispatch(getShopsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllShops)
