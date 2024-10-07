const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nutritionist_clients', {
    nutritionistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nutritionists',
        key: 'id'
      }
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'nutritionist_clients',
    schema: 'nutripal',
    timestamps: true
  });
};
