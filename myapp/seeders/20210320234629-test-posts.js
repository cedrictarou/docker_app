'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'Test Post1',
          content: 'Test Post Content1',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test Post2',
          content: 'Test Post Content2',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test Post3',
          content: 'Test Post Content3',
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
