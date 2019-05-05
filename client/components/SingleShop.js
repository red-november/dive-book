import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleShopThunk, getOfferedDivesBySingleShopThunk} from '../store'

class SingleShop extends Component {
  componentDidMount() {
    this.props.fetchSingleShop(this.props.match.params.shopId)
    this.props.fetchOfferedDives(this.props.match.params.shopId)
  }

  render() {
    if (!this.props.singleShop.name) return <h1>Loading...</h1>
    return (
      <div>
        <h1>{this.props.singleShop.name}</h1>
        <h2>Offered Dives:</h2>
        {this.props.offeredDive.map(offeredDives => (
          <ul key={offeredDives.id}>
            <li>
              {offeredDives.name}:<p />
              {offeredDives.description}
              <p />
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleShop: state.singleShop,
  offeredDive: state.offeredDivesBySingleShop
})

const mapDispatchToProps = dispatch => ({
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId)),
  fetchOfferedDives: shopId =>
    dispatch(getOfferedDivesBySingleShopThunk(shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleShop)
