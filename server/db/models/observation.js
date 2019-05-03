const Sequelize = require('sequelize')
const db = require('../db')

const Observation = db.define('observation', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM(
      'flora',
      'mammals',
      'fish',
      'mollusks',
      'coral',
      'sponges',
      'other living things',
      'inanimate objects'
    ),
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

module.exports = Observation
