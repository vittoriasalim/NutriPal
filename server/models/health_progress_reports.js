const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('health_progress_reports', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dailyNutritionAnalysisList: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'health_progress_reports',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "health_progress_reports_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
