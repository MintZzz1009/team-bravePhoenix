const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    orderId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    itemIds: {
      type: DataTypes.STRING(255),
      allowNull: false
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
