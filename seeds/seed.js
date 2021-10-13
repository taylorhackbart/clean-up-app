const sequelize = require('../config/connection');
const  User  = require('../models/users.js');

const userSeedData = require('./User.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData);

  // Create users at random
  for (let i = 0; i < 10; i++) {
    // Get a random users's `id`
    const { id: randomUserId } = users[
      Math.floor(Math.random() * users.length)
    ];

  }

  process.exit(0);
};

seedDatabase();
