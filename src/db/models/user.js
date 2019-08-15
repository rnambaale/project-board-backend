module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: {
      type: DataTypes.STRING,
      required: false
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    bio: {
      type: DataTypes.STRING
    }
  });

  User.associate = models => {
    // associations can be defined here
  };

  return User;
};
