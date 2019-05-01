import React from 'react'
let QRCode = require('qrcode.react')

//must take in a string!
const Generator = ({userId}) => {
  return <QRCode value={userId} />
}

export default Generator
