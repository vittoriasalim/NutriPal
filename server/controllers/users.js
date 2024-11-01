const sequelize = require('../config/database'); // Adjust the path as necessary
const { users, clients, nutritionists, pantries } = require('../models/init-models')(sequelize);  // Import the models (adjust path as needed)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
  
  return jwt.sign({ id: user.dataValues.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
   
    const user = await users.findOne({
      where: {
        email: email // Ensure that `email` is being used in the `where` clause
      }
    });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
 
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }




    const token = generateToken(user);
   
    return res.json({ token,user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



// Controller function to create a new user
exports.createUser = async (req, res) => {
  const transaction = await sequelize.transaction();  // Start a transaction to ensure atomicity

  try {
    const { firstName, lastName, email, sex, userType, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !sex || !email || !userType || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Validate userType is either 'client' or 'nutritionist'
    const allowedUserTypes = ['client', 'nutritionist'];
    if (!allowedUserTypes.includes(userType.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid user type. Must be either "client" or "nutritionist"' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await users.create(
      {
        firstName,
        lastName,
        email,
        sex,
        userType,
        password: hashedPassword, // Store the hashed password
      },
      { transaction }  // Ensure this is part of the transaction
    );

    // Check if the user is a 'client' or 'nutritionist' and create the appropriate record
    if (userType.toLowerCase() === 'client') {


      // Create the client record
      await clients.create(
        {
          userId: newUser.id,  // Link the client to the newly created user
          weight:0,
          height:0,
          recommendationCal:1500
   
        },
        { transaction }
      );
     
    } else if (userType.toLowerCase() === 'nutritionist') {
 

      // Create the nutritionist record
      await nutritionists.create(
        {
          userId: newUser.id,  // Link the nutritionist to the newly created user
          specialisation: [],
          qualifications:[],
          availability:0,
        },
        { transaction }
      );
    }

    // Commit the transaction
    await transaction.commit();

    // Return the new user (without password)
    return res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      sex: newUser.sex,
      userType: newUser.userType,
    });
  } catch (error) {
    // Rollback the transaction in case of error
    if (transaction) await transaction.rollback();

  
    return res.status(500).json({ message: 'Server error' });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await users.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    const [updated] = await users.update(
      { email, mobile, password },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedUser = await users.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await users.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};