var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var Character = sequelize.import('../models/character'); //1
var validateSession = require('../middleware/validate-session');

router.post('/create', function (req, res) {

    let name = req.body.character.name;
    let race = req.body.character.race;
    let homeplanet = req.body.character.homeplanet;
    let gender = req.body.character.gender;
    let weapons = req.body.character.weapons;
    let biography = req.body.character.biography;
    let user = req.user;


    Character.create({

        name: name,
        race: race,
        homeplanet: homeplanet,
        gender: gender,
        weapons: weapons,
        biography: biography,
        owner: user.id,

    }).then(
        function createCharacterSuccess() {
            res.status(200).json({
                message: "Character created!"
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
});

router.get('/get', function (req, res) {
    let userid = req.user.id;

    Character
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
    let name = req.body.character.name;
    let race = req.body.character.race;
    let homeplanet = req.body.character.homeplanet;
    let gender = req.body.character.gender;
    let weapons = req.body.character.weapons;
    let biography = req.body.character.biography;


    Character
        .update({
            name: name,
            race: race,
            homeplanet: homeplanet,
            gender: gender,
            weapons: weapons,
            biography: biography,

        }, { where: { id: dataID } })
        .then(
            function updateSuccess() {
                res.json({
                    name: name,
                    race: race,
                    homeplanet: homeplanet,
                    gender: gender,
                    weapons: weapons,
                    biography: biography
                })
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )

})

router.delete("/delete/:id", validateSession,
    function (req, res) {
        let id = req.body.character.id;

        Character.destroy({ where: { id: id } })
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