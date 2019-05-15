const router = require('express').Router()
const {Log, Sighting, EarnedBadge, Diver, Observation} = require('../db/models')
const db = require('../db')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // const allLogs = await Log.findAll()
    const allLogs = await db.query('SELECT * FROM logs', {
      type: Sequelize.QueryTypes.SELECT
    })
    res.status(200).json(allLogs)
  } catch (error) {
    next(error)
  }
})

router.get('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  try {
    const log = await Log.findByPk(id, {include: [{model: Observation}]})
    res.status(200).send(log)
  } catch (error) {
    next(error)
  }
})

router.delete('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  try {
    const log = await Log.findByPk(id)
    if (req.user.id === log.diverId && !log.isVerified) {
      log.destroy()
      res.sendStatus(202)
    }
    next(new Error('unable to delete log'))
  } catch (error) {
    next(error)
  }
})

router.get('/diver/:diverId', async (req, res, next) => {
  try {
    const diverId = Number(req.params.diverId)
    // const logs = await Log.findAll({
    //   where: {diverId: diverId},
    //   order: [['date', 'ASC']]
    // })
    const logs = await db.query(
      `SELECT * FROM logs WHERE "diverId" = ${diverId} ORDER BY date ASC`,
      {type: Sequelize.QueryTypes.SELECT}
    )
    res.status(200).send(logs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {
      date,
      diveshopId,
      diveName,
      timeIn,
      timeOut,
      location,
      maxDepth,
      tankPressureStart,
      tankPressureEnd,
      tankType,
      beltWeight,
      wetSuitType,
      wetSuitThickness,
      airMixture,
      description,
      visibility,
      hasStrongCurrent,
      offeredDiveId
    } = req.body

    if (diveshopId === '') diveshopId = null
    if (typeof offeredDiveId === 'string') offeredDiveId = null

    if (req.user) {
      const log = await Log.create({
        diveshopId,
        diveName,
        timeIn,
        timeOut,
        location,
        maxDepth,
        tankPressureStart,
        tankPressureEnd,
        tankType,
        beltWeight,
        wetSuitThickness,
        wetSuitType,
        airMixture,
        description,
        visibility,
        date,
        hasStrongCurrent,
        offeredDiveId,
        diverId: req.user.id
      })
      // await log.setDiver(req.user.id)
      res.status(201).send(log)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/diver/:logId', async (req, res, next) => {
  const {
    date,
    diveName,
    timeIn,
    timeOut,
    location,
    maxDepth,
    tankPressureStart,
    tankPressureEnd,
    tankType,
    beltWeight,
    wetSuitType,
    wetSuitThickness,
    airMixture,
    description,
    visibility,
    hasStrongCurrent,
    diveshopId,
    offeredDiveId,
    diverObservations
  } = req.body
  try {
    const logId = req.params.logId
    const log = await Log.findByPk(logId)
    if (!log) {
      res.send(404)
    }
    let logUpdate
    if (!log.isVerified) {
      logUpdate = await log.update({
        date,
        diveName,
        timeIn,
        timeOut,
        location,
        maxDepth,
        tankPressureStart,
        tankPressureEnd,
        tankType,
        beltWeight,
        wetSuitThickness,
        wetSuitType,
        airMixture,
        description,
        visibility,
        hasStrongCurrent,
        diveshopId,
        offeredDiveId
      })
    } else {
      logUpdate = await log.update({
        description
      })
    }
    //get existing sightings
    const sightings = await Sighting.findAll({where: {logId: req.params.logId}})

    //split between new ones and ones to remove
    const [add, remove] = splitSightings(diverObservations, sightings)

    //add new sightings to log
    if (add.length > 0) {
      await Sighting.addBulk(add)
    }

    //remove old sightings from log
    if (remove.length > 0) {
      await Sighting.destroyBulk(remove)
    }
    res.status(200).send(logUpdate)
  } catch (err) {
    next(err)
  }
})

router.put('/diver/verify/:logId', async (req, res, next) => {
  const {scannedId} = req.body
  console.log('body', req.body)
  try {
    const logId = Number(req.params.logId)
    const log = await Log.findByPk(logId)

    if (Number(scannedId) === log.diveshopId) {
      const logUpdate = await log.update({isVerified: true})
      console.log('stamped')
      res.status(201).send(logUpdate)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/diver/:diverId/observations', async (req, res, next) => {
  try {
    const diverId = Number(req.params.diverId)
    const logs = await Log.findAll({
      where: {
        diverId
      },
      include: [{model: Observation}]
    })
    res.status(200).send(logs)
  } catch (err) {
    next(err)
  }
})

router.get('/distance/:start/:end', async (req, res, next) => {
  const start = Number(req.params.start)
  const end = Number(req.params.end)
  try {
    const distance = await db.query(
      `SELECT ST_Distance((SELECT geog from logs where id = ${start}),(SELECT geog from logs where id = ${end}));
      ;`,
      {type: Sequelize.QueryTypes.SELECT}
    )
    res.json(distance[0])
  } catch (error) {
    next(error)
  }
})

router.get('/nearest/:coords', async (req, res, next) => {
  try {
    const [long, lat] = req.params.coords.split(',')
    const nearest = await db.query(
      `SELECT (ST_DISTANCE(ST_GeogFromText('SRID=4326;POINT(${Number(
        long
      )} ${Number(lat)})'), geog)) AS dist, geog FROM logs WHERE "diverId" != ${
        req.user.id
      } ORDER BY dist LIMIT 1;`,
      {type: Sequelize.QueryTypes.SELECT}
    )
    res.json(nearest)
  } catch (error) {
    next(error)
  }
})

function splitSightings(frontEnd, backEnd) {
  const frontEndMap = arrToMap(frontEnd)
  const add = frontEnd
  const remove = []
  backEnd.forEach(
    obs => !frontEndMap.has(obs.observationId) && remove.push(obs)
  )

  return [add, remove]
}

function arrToMap(arr) {
  const result = new Map()
  arr.forEach(
    elem =>
      !result.has(elem.observationId) && result.set(elem.observationId, true)
  )
  return result
}
