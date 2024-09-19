const fs = require('fs');
const path = require('path');

// Route to fetch data from the file
exports.getFoodItems = (req, res) => {
    const filePath = path.join('src/controllers', '..', 'data', 'FoodItems.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to read data file' });
        }
        const posts = JSON.parse(data);
        res.json(posts);
      });
    };

