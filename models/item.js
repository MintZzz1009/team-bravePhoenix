const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    itemId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    itemName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    itemCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    itemImg: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    itemDesc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    itemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marketer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    itemCreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    itemUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "itemId" },
        ]
      },
      {
        name: "marketer_idx",
        using: "BTREE",
        fields: [
          { name: "marketer" },
        ]
      },
    ]
  });
};
