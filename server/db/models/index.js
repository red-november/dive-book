const Diver = require('./diver')
const DiveShop = require('./diveShop')
const Log = require('./log')
const Certification = require('./certification')
const OfferedDive = require('./offeredDive')
const DivesOfferedByShops = require('./divesOfferedByShops')
const Badge = require('./badge')
const EarnedBadge = require('./earnedBadge')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Diver.belongsToMany(Badge, {through: EarnedBadge})
Badge.belongsToMany(Diver, {through: EarnedBadge})

Log.belongsTo(Diver)
Diver.hasMany(Log)
Certification.belongsTo(Diver)
Diver.hasMany(Certification)

OfferedDive.hasMany(Log)
Log.belongsTo(OfferedDive)

Log.belongsTo(DiveShop)
DiveShop.hasMany(Log)

DiveShop.belongsToMany(OfferedDive, {through: DivesOfferedByShops})
OfferedDive.belongsToMany(DiveShop, {through: DivesOfferedByShops})

// removed shops-to-divers direct relationships

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Diver,
  DiveShop,
  Log,
  Certification,
  OfferedDive,
  DivesOfferedByShops,
  Badge,
  EarnedBadge
}
