const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderDetail', {
<<<<<<< HEAD
=======
    orderDetailId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
<<<<<<< HEAD
    orderNumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
=======
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
    buyer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
<<<<<<< HEAD
    maketer: {
=======
    marketer: {
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
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
<<<<<<< HEAD
=======
    },
    orderDetailCreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
    }
  }, {
    sequelize,
    tableName: 'orderDetail',
<<<<<<< HEAD
    timestamps: false
=======
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderDetailId" },
        ]
      },
      {
        name: "orderDetail_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderDetailId" },
        ]
      },
    ]
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
  });
};
