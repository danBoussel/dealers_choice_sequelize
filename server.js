const { dbase, dbSeed, models: { Members, FitnessLocations } } = require('./db')

const express = require('express');
const route = express()


route.get('/allmembers', async(req, res, next) => {
    try {
        res.send(await Members.findAll({
            include: [{
                    model: Members,
                    as: 'trainer'
                },
                {
                    model: Members,
                },
                {
                    model: FitnessLocations,
                },
            ]
        }))
    } catch (ex) {
        next(ex)
    }
});

route.get('/alllocations', async(req, res, next) => {
    try {
        res.send(await FitnessLocations.findAll({
            include: [{
                model: Members,
                as: 'trainerLocation'
            }]
        }))
    } catch (ex) {
        next(ex)
    }
});

const init = async() => {
    try {
        await dbase.authenticate();
        await dbSeed();
        const port = process.env.PORT || 3030;
        route.listen(port, () => console.log('port connected'))
    } catch (ex) {
        console.log(ex);
    }
}
init()