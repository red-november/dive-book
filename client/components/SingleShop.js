import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleShopThunk} from '../store'

class SingleShop extends Component {
  componentDidMount() {
    this.props.fetchSingleShop(this.props.match.params.shopId)
  }

  render() {
    console.log(this.props)
    if (!this.props.singleShop.name) return <h1>Loading...</h1>
    return (
      <div>
        <h1>{this.props.singleShop.name}</h1>
        <img
          className="singleDiveImg"
          src={`/pictures/diveshop/${this.props.singleShop.storeFrontImgUrl}`}
        />
        <h2>Offered Dives:</h2>
        {this.props.singleShop.offeredDives.map(offeredDive => (
          <ul key={offeredDive.id}>
            <li>
              <a href={`/alloffereddives/${offeredDive.id}`}>
                {offeredDive.name}:
              </a>
              <p />
              {offeredDive.description}
              <p />
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleShop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleShop)
