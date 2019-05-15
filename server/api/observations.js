const router = require('express').Router()
const {Log, Badge, Diver, Observation} = require('../db/models')
const db = require('../db/')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  const allObservations = await Observation.findAll({
    include: [{model: Log}]
  })
  res.status(200).json(allObservations)
})

router.get('/:obsId', async (req, res, next) => {
  const obsId = Number(req.params.obsId)
  const observation = await Observation.findOne({
    where:{
      id: obsId
    },
    include: [{model: Log}]
  })
  res.status(200).send(observation)

})


router.get('/sightings/:observationId', async (req, res, next) => {
  try {
    const observationId = Number(req.params.observationId)

    const logs = await db.query(
      `SELECT *
      FROM observations as o
      INNER JOIN sightings as s
          ON o.id = s."observationId"
      INNER JOIN logs as l
          ON s."logId" = l.id
      WHERE o.id = ${Number(observationId)}`, {type: Sequelize.QueryTypes.SELECT}

    )
    res.status(200).send(logs)
  } catch (error) {
    next(error)
  }
 })


router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cert = await Certification.create(req.body)
      res.status(201).send(cert)
    }
  } catch (err) {
    next(err)
  }
 })
