const Sequelize = require('sequelize')
const dbase = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/247fitness');
const { STRING, UUIDV4, UUID } = Sequelize; // type defaultValue destructure


// models
const Members = dbase.define('members', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING(30)
    },

});

const FitnessLocations = dbase.define('fitnessLocations', {
    locations: {
        type: STRING(30)
    }
});



//Associations
Members.belongsTo(Members, { as: 'trainer' })
Members.hasMany(Members, { foreignKey: 'trainerId' })


FitnessLocations.belongsTo(Members, { as: 'trainerLocation' })
Members.hasMany(FitnessLocations, { foreignKey: 'trainerLocationId' })


const dbSeed = async() => {
    await dbase.sync({ force: true })
    const [alex, anna, thomas, ava, nora, lucas, leo, mia, lily, ben, cherryHill, paterson, newark] = await Promise.all([
        Members.create({ name: 'alex' }),
        Members.create({ name: 'anna' }),
        Members.create({ name: 'thomas' }),
        Members.create({ name: 'ava' }),
        Members.create({ name: 'nora' }),
        Members.create({ name: 'lucas' }),
        Members.create({ name: 'leo' }),
        Members.create({ name: 'mia' }),
        Members.create({ name: 'lily' }),
        Members.create({ name: 'ben' }),
        FitnessLocations.create({ locations: 'cherryHill' }),
        FitnessLocations.create({ locations: 'paterson' }),
        FitnessLocations.create({ locations: 'newark' }),

    ]);
    alex.trainerId = nora.id
    await alex.save();
    mia.trainerId = ben.id
    await mia.save();
    lucas.trainerId = nora.id
    await lucas.save();
    anna.trainerId = ben.id
    await anna.save();
    ava.trainerId = nora.id
    await ava.save();
    leo.trainerId = nora.id
    await leo.save();


    cherryHill.trainerLocationId = ben.id;
    await cherryHill.save();
    newark.trainerLocationId = nora.id
    await newark.save();
    paterson.trainerLocationId = nora.id;
    await paterson.save();
    paterson.trainerLocationId = ben.id;
    await paterson.save();
};

module.exports = {
    dbase,
    dbSeed,
    models: {
        Members,
        FitnessLocations,
    }
}