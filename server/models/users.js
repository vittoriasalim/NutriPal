const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "users_email_key"
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_type: {
      type: DataTypes.ENUM("CLIENT","NUTRITIONIST"),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
