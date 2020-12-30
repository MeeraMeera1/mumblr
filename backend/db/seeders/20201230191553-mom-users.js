'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {
      username: "mommameera",
      email: "mommameera@gmail.com",
      age: 22,
      hashedPassword: bcrypt.hashSync('password'),
    },
    {
      username: "FakeUser1",
      email: faker.internet.email(),
      age: 22,
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
    },
    {
      username: "FakeUser2",
      email: faker.internet.email(),
      age: 22,
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {
      username: { [Op.in]: ['mommameera', 'FakeUser1', 'FakeUser2'] }
    });
  }
};
