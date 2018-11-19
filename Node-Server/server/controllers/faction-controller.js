var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var Faction = sequelize.import('../models/faction'); //1
var validateSession = require('../middleware/validate-session');

router.post('/create', function (req, res) {

    let name = req.body.faction.name;
    let baseplanet = req.body.faction.baseplanet;
    let user = req.user;



    Faction.create({

        name: name,
        baseplanet: baseplanet,
        owner: user.id

    }).then(
        function createfactionSuccess() {
            res.status(200).json({
                message: "faction created!"
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
});



router.get('/get', function (req, res) {
    let userid = req.user.id;

    Faction
        .findAll({ where: { owner: userid } })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        )
})


router.put('/update/:id', function (req, res) {
    let dataID = req.params.id;
    let name = req.body.faction.name;
    let baseplanet = req.body.faction.baseplanet;


    Faction
        .update({
            name: name,
            baseplanet: baseplanet,

        }, { where: { id: dataID } })
        .then(
            function updateSuccess() {
                res.json({
                    name: name,
                    baseplanet: baseplanet,
                })
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )

})

router.delete("/delete/:id", function (req, res) {
    let id = req.body.faction.id;

    Faction.destroy({ where: { id: id } })
        .then(
            function createDeleteSuccess() {
                res.status(200).send("Successfully deleted!")
            },
            function createDeleteError(err) {
                res.send(500, err.message)
            }
        )
})

module.exports = router;