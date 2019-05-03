const Sequelize = require('sequelize')
const db = require('../db')

const Badge = db.define('badge', {
  name: {
    type: Sequelize.ENUM('Juvenile', 'Aquaman', 'Discoverer', 'Voyager'),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Badge
