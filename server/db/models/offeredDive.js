const Sequelize = require('sequelize')
const db = require('../db')

const OfferedDive = db.define('offeredDive', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = OfferedDive
