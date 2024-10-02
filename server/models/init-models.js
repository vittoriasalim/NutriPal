var DataTypes = require("sequelize").DataTypes;
var _client_nutritionist = require("./client_nutritionist");
var _clients = require("./clients");
var _nutritionists = require("./nutritionists");
var _pantries = require("./pantries");
var _users = require("./users");

function initModels(sequelize) {
  var client_nutritionist = _client_nutritionist(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var nutritionists = _nutritionists(sequelize, DataTypes);
  var pantries = _pantries(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  clients.belongsTo(pantries, { as: "pantry", foreignKey: "pantry_id"});
  pantries.hasMany(clients, { as: "clients", foreignKey: "pantry_id"});
  client_nutritionist.belongsTo(users, { as: "client", foreignKey: "client_id"});
  users.hasMany(client_nutritionist, { as: "client_nutritionists", foreignKey: "client_id"});
  client_nutritionist.belongsTo(users, { as: "nutritionist", foreignKey: "nutritionist_id"});
  users.hasMany(client_nutritionist, { as: "nutritionist_client_nutritionists", foreignKey: "nutritionist_id"});
  clients.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(clients, { as: "clients", foreignKey: "user_id"});
  nutritionists.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(nutritionists, { as: "nutritionists", foreignKey: "user_id"});

  return {
    client_nutritionist,
    clients,
    nutritionists,
    pantries,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
