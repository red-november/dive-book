import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleShopThunk } from '../store/index'


class SingleShop extends Component {
    componentDidMount() {
        this.props.fetchSingleShop(this.props.match.params.shopId)
    }

    render() {
        return (
            <div>
                <h1>{this.props.singleShop.name}</h1>
            </div>
        )

    }
}



const mapStateToProps = state => ({
    singleShop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
    fetchSingleShop: (shopId) => dispatch(getSingleShopThunk(shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleShop)