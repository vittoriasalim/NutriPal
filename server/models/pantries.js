const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pantries', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pantries',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "pantries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
