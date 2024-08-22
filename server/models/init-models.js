var DataTypes = require("sequelize").DataTypes;
var _health = require("./health");
var _users = require("./users");

function initModels(sequelize) {
  var health = _health(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  health.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(health, { as: "healths", foreignKey: "user_id"});

  return {
    health,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
