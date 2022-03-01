'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('users', [{
      email: 'admin@gmail.com',
      password: '123456',
      fullName: 'Van Nghia',
      phoneNumber: '0123456789',
      address: 'Da Nang',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
