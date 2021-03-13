'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'exampleuser1',
          email: 'exampleuser1@email.com',
          password: 'exampleuser1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'exampleuser2',
          email: 'exampleuser2@email.com',
          password: 'exampleuser2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'exampleuser3',
          email: 'exampleuser3@email.com',
          password: 'exampleuser3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'exampleuser4',
          email: 'exampleuser4@email.com',
          password: 'exampleuser4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'exampleuser5',
          email: 'exampleuser5@email.com',
          password: 'exampleuser5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
