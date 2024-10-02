const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
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
    },
    health_goals: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    favourite_foods: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    disliked_foods: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    allergies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    nutritional_needs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    pantry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pantries',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'clients',
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
