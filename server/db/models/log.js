const Sequelize = require('sequelize')
const db = require('../db')

const Log = db.define('log',{
  DiveName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DiveId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  IsVerified: {
    type: Sequelize.BOOLEAN
  },

  // Experience Props

  TimeIn: {
    type: Sequelize.DATE
  },
  TimeOut: {
    type: Sequelize.DATE
  },
  Location: {
    type: Sequelize.STRING
  },
  MaxDepth: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  TankPressureStart: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  TankPressureEnd: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  TankType: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  BeltWeight: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  WetSuitType: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  WetSuitThickness: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  AirMixture: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  Description: {
    type: Sequelize.TEXT
  },
  HasStrongCurrent: {
    type: Sequelize.BOOLEAN
  },
  Visibility: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})

module.exports = Log
