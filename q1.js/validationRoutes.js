const express = require("express");
const authRoute = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

let users = [
    { id: 1, username: 'user1', passwordHash: '$2b$10$C4yJt7/tlWZ6GYP0E9F5..c7lMZ9YF4lnE4t/ZU6FhNtde3/l9uuG' } // hashed password: "password123"
  ];
  
  // Middleware to verify JWT and extract user ID
  function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming JWT is in "Bearer <token>" format
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token expired or invalid' });
      }
      req.userId = decoded.userId; // Extract user ID from JWT payload
      next();
    });
  }
  
  // Route to update password
  app.put('/update-password', authenticateJWT, async (req, res) => {
    const { userId } = req;
    const { newPassword } = req.body;
  
    try {
      // Find user in your data store (replace with actual database access)
      const user = users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user's password in data store (in this case, updating the dummy data)
      user.passwordHash = hashedPassword;
  
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  