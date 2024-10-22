const sequelize = require('../config/database'); // Adjust the path as necessary
const { messages, nutritionists, clients } = require('../models/init-models')(sequelize);  // Import the models

// Send a new message between a nutritionist and a client
exports.sendMessage = async (req, res) => {
  const { nutritionistId, clientId, message, isNutriSender } = req.body;

  try {
    // Validate that both a nutritionist and a client are involved
    if (!nutritionistId || !clientId) {
      return res.status(400).json({ error: 'Nutritionist and Client IDs are required' });
    }

    // Validate the `isNutriSender` field is provided
    if (typeof isNutriSender !== 'boolean') {
      return res.status(400).json({ error: 'isNutriSender must be a boolean value' });
    }

    // Create the message in the database
    const newMessage = await messages.create({
      nutritionistId,
      clientId,
      message,
      isNutriSender // Now tracking if the sender is a nutritionist
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error sending message' });
  }
};

// Get all messages between a nutritionist and a client
exports.getConversation = async (req, res) => {
  const { nutritionistId, clientId } = req.params;

  try {
    // Fetch the conversation between the nutritionist and the client
    const conversation = await messages.findAll({
      where: {
        nutritionistId,
        clientId
      },
      order: [['createdAt', 'ASC']] // Order by message creation date
    });

    if (conversation.length === 0) {
      return res.status(404).json({ message: 'No conversation found' });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving conversation' });
  }
};

// Delete a specific message by ID
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await messages.findByPk(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await message.destroy();
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting message' });
  }
};

// Get all messages for a specific client
exports.getClientMessages = async (req, res) => {
  const { clientId } = req.params;

  try {
    const clientMessages = await messages.findAll({
      where: { clientId },
      include: [
        { model: nutritionists, as: 'nutritionist', attributes: ['id', 'userId'] } // Include nutritionist data
      ],
      order: [['createdAt', 'ASC']]
    });

    if (clientMessages.length === 0) {
      return res.status(404).json({ message: 'No messages found for the client' });
    }

    return res.status(200).json(clientMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving client messages' });
  }
};

// Get all messages for a specific nutritionist
exports.getNutritionistMessages = async (req, res) => {
  const { nutritionistId } = req.params;

  try {
    const nutritionistMessages = await messages.findAll({
      where: { nutritionistId },
      include: [
        { model: clients, as: 'client', attributes: ['id', 'userId'] } // Include client data
      ],
      order: [['createdAt', 'ASC']]
    });

    if (nutritionistMessages.length === 0) {
      return res.status(404).json({ message: 'No messages found for the nutritionist' });
    }

    return res.status(200).json(nutritionistMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving nutritionist messages' });
  }
};