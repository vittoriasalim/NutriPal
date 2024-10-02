const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_nutritionist', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    nutritionist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'client_nutritionist',
    schema: 'nutripal',
    timestamps: false,
    indexes: [
      {
        name: "client_nutritionist_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
