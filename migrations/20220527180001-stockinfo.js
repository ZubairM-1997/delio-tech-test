const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('StockInfo', {

      name: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      current_price: {
        type: DataTypes.DECIMAL
        },
        change: {
            type: DataTypes.DECIMAL
        },
        percent_change: {
            type: DataTypes.DECIMAL
        },
        high_price: {
            type: DataTypes.DECIMAL
        },
        low_price: {
            type: DataTypes.DECIMAL
        },
        open_price: {
            type: DataTypes.DECIMAL
        },
        previous_close_price: {
            type: DataTypes.DECIMAL
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
         },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
         }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('StockInfo')
  }
};
