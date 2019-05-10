const router = require('express').Router()
const {DiveShop, OfferedDive} = require('../db/models')
const db = require('../db')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const shops = await DiveShop.findAll()
    res.json(shops)
  } catch (err) {
    next(err)
  }
})

router.get('/:shopId', async (req, res, next) => {
  try {
    const singleShop = await DiveShop.findByPk(req.params.shopId, {
      include: [{model: OfferedDive}]
    })
    res.json(singleShop)
  } catch (err) {
    next(err)
  }
})

router.get('/nearest/:coords', async (req, res, next) => {
  try {
    const [long, lat] = req.params.coords.split(',')
    const nearest = await db.query(
      `SELECT (ST_DISTANCE(ST_GeogFromText('SRID=4326;POINT(${Number(
        long
      )} ${Number(lat)})'), geog)) AS dist, geog FROM diveshops
      ORDER BY dist LIMIT 1;`,
      {type: Sequelize.QueryTypes.SELECT}
    )
    res.json(nearest)
  } catch (error) {
    next(error)
  }
})
