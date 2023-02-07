var DataTypes = require("sequelize").DataTypes;
<<<<<<< HEAD
=======
var _cart = require("./cart");
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
var _item = require("./item");
var _order = require("./order");
var _orderDetail = require("./orderDetail");
var _user = require("./user");

function initModels(sequelize) {
<<<<<<< HEAD
=======
  var cart = _cart(sequelize, DataTypes);
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
  var item = _item(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var orderDetail = _orderDetail(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  item.belongsTo(user, { as: "marketer_user", foreignKey: "marketer"});
  user.hasMany(item, { as: "items", foreignKey: "marketer"});
  order.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(order, { as: "orders", foreignKey: "userId"});

  return {
<<<<<<< HEAD
=======
    cart,
>>>>>>> 1cebcc3b09466c70bc7111549204fff2fce97196
    item,
    order,
    orderDetail,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
