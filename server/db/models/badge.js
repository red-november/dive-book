const Sequelize = require('sequelize')
const db = require('../db')

const Badge = db.define('badge', {
  name: {
    type: Sequelize.ENUM('Juvenile', 'Aquaman', 'Discoverer', 'Voyager'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Badge
