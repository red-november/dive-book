import React from 'react'
let QRCode = require('qrcode.react')

//must take in a string!
const Generator = ({diveshopId}) => {
  return <QRCode value={diveshopId} />
}

export default Generator
