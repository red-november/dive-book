const Sequelize = require('sequelize')
const db = require('../db')

const OfferedDive = db.define('offeredDive',{
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Description: {
    type: Sequelize.TEXT
  }
})

module.exports = OfferedDive
