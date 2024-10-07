const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nutritionists', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    specialisation: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    qualifications: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nutritionists',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "nutritionists_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
