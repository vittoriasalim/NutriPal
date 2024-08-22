const sequelize = require('../config/database'); // Adjust the path as necessary
const { users } = require('../models/init-models')(sequelize);
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
    console.log(user.email);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
 
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }




    const token = generateToken(user);
   
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    // Basic validation
    if (!email || !mobile || !password) {
      return res.status(400).json({ message: 'Email, mobile, and password are required' });
    }

    // Check if user already exists
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }


    // Hash the password
    const saltRounds = 10; // Number of salt rounds to generate the salt (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user with the hashed password
    const newUser = await users.create({ email, mobile, password: hashedPassword });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
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