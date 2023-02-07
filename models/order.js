const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    orderId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    orderName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    orderRecipientName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    orderAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    orderPhoneNumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    orderRequests: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orderCreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    orderUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
      {
        name: "userId_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
