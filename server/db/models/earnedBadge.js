const Sequelize = require('sequelize')
const db = require('../db')

const EarnedBadge = db.define('earnedBadge', {})

module.exports = EarnedBadge
