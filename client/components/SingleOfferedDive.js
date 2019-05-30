import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleOfferedDiveThunk, getSingleShopThunk} from '../store'

class SingleOfferedDive extends Component {
  componentDidMount() {
    this.props.fetchSingleOfferedDive(this.props.match.params.diveId)
    this.props.fetchSingleShop(this.props.match.params.shopId)
  }

  render() {
    console.log(this.props)
    const {id, imageURL, location, description} = this.props.singleOfferedDive
    // const {singleShop} = this.props.singShop
    if (!this.props.singleOfferedDive) return <h1>Loading...</h1>
    return (
      <div>
        <h3>{this.props.singleOfferedDive.name}</h3>
        <h4>{/* Dive Offered By:<a>{this.props.singleShop.name}</a> */}</h4>
        <h4>
          <img className="singleDiveImg" src={`${imageURL}`} />
          <p />
          {location}
          <p />
          {description}
          <p />
        </h4>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleOfferedDive: state.singleOfferedDive,
  singleShop: state.singShop
})

const mapDispatchToProps = dispatch => ({
  fetchSingleOfferedDive: id => dispatch(getSingleOfferedDiveThunk(id)),
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOfferedDive)
