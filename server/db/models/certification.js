const Sequelize = require('sequelize')
const db = require('../db')

const Certification = db.define('certification',{
  CertId: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  Provider: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  Level: {
    type: Sequelize.STRING
    // enum
  },
  InstructorId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Certification
