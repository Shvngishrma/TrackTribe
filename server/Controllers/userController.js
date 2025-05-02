// User controller functions
const getAllUsers = (req, res) => {
  // In a real app, this would fetch from a database
  res.json({ 
    message: 'Get all users',
    users: [
      { id: 1, username: 'user1', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' }
    ]
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  // In a real app, this would fetch from a database
  res.json({ 
    message: `Get user with ID: ${userId}`,
    user: { id: userId, username: `user${userId}`, email: `user${userId}@example.com` }
  });
};

const createUser = (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate inputs
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email and password' });
    }
    
    // In a real app, this would create a user in the database
    res.status(201).json({ 
      message: 'User created successfully',
      user: { username, email }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    
    // In a real app, this would update a user in the database
    res.json({ 
      message: `User with ID: ${userId} updated successfully`,
      user: { id: userId, username, email }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    
    // In a real app, this would delete a user from the database
    res.json({ message: `User with ID: ${userId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};