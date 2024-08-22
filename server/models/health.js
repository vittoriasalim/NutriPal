const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('health', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    current_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    current_height: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    target_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    target_calories: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'health',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "health_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
