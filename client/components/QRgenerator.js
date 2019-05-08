import React from 'react'
let QRCode = require('qrcode.react')

//must take in a string!
const Generator = ({diveshopId}) => {
  console.log('iddddd', diveshopId)
  return <QRCode value={diveshopId.toString()} />
}

export default Generator
