const express = require('express');
const router = express.Router();

// Placeholder for GET books - will be implemented later
router.get('/', (req, res) => {
  res.json({ message: 'GET books endpoint - placeholder for future implementation' });
});

module.exports = router;
