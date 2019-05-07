import React, {useEffect} from 'react'
import {QRgenerator} from './index'
import {connect} from 'react-redux'
import {getSingleShopThunk} from '../store/index'

const ShopQR = ({diveshopId, diveshop, getShop}) => {
  useEffect(
    () => {
      getShop(diveshopId)
    },
    [diveshopId]
  )

  if (!diveshop.id) {
    return <h1> loading...</h1>
  }
  return (
    <div>
      <h1>{diveshop.name}</h1>
      <h3>Scan to get your stamp!</h3>
      <QRgenerator diveshopId={diveshopId} />
    </div>
  )
}

const mapStateToProps = state => ({
  diveshopId: state.diver.diveshopId,
  diveshop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
  getShop: id => dispatch(getSingleShopThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopQR)
