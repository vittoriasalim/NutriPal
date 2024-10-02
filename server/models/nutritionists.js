const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nutritionists', {
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
    specialisations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    qualifications: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nutritionists',
    schema: 'nutripal',
    timestamps: false,
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
