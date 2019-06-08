const router = require('express').Router()
const {Badge, Diver} = require('../db/models')
module.exports = router

router.get('/diver/:diverId', async (req, res, next) => {
  const diverId = Number(req.params.diverId)
  const badges = await Badge.findAll({
    include: [
      {
        model: Diver,
        where: {
          id: diverId
        }
      }
    ]
  })
  res.status(200).send(badges)
})
