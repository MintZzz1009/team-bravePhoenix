const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userNickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "nickName_UNIQUE"
    },
    userPassword: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userPhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    adminValid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userCreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    userUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "nickName_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userNickname" },
        ]
      },
    ]
  });
};
