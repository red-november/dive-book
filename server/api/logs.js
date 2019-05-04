const router = require('express').Router()
const {Log, Badge, Diver, Observation} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const allLogs = await Log.findAll()
  res.status(200).send(allLogs)
})

router.get('/test', async (req, res, next) => {
  try {
    const diverLogs = await Log.findAll({
      where: {
        diverId: 1
      },
      include: [{model: Observation}]
    })
    const diverBadges = await Badge.findAll({
      include: [
        {
          model: Diver,
          where: {
            id: 1
          }
        }
      ]
    })

    res.json({diverLogs, diverBadges})
  } catch (error) {
    next(error)
  }
})

router.get('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  const log = await Log.findByPk(id)
  res.status(200).send(log)
})

router.get('/user/:userId', async (req, res, next) => {
  const userId = Number(req.params.userId)
  const logs = await Log.findAll({where: userId})
  res.status(200).send(logs)
})
