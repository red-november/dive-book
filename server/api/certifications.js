const router = require('express').Router()
const { Certification } = require('../db/models')
module.exports = router


router.get('/diver/:diverId', async (req, res, next) => {
    const diverId = Number(req.params.diverId)
    const certs = await Certification.findAll({
        where: {
            diverId: diverId
        }
    })
    res.status(200).send(certs)
})

