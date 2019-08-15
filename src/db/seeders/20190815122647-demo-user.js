"use strict";
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "John Doe",
          email: "john.doe@email.com",
          bio: "just a local man",
          password: hash
        },
        {
          fullName: "John Doe2",
          email: "john.doe2@email.com",
          bio: "just another local man",
          password: hash
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
  }
};
