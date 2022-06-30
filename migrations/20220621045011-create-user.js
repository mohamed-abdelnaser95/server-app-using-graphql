'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      strEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      strPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dtmDOB: {
        type: Sequelize.DATE,
        allowNull: false
      },
      blnIsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        default: new Date()

      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        default: new Date()
      }
    }); 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
}; 