const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderDetail', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderNumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    buyer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maketer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'orderDetail',
    timestamps: false
  });
};
