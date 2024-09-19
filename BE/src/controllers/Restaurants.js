const fs = require('fs');
const path = require('path');


exports.getRestaurants = (req, res) => {
        const filePath = path.join('src/controllers', '..', 'data', 'Restaurants.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to read data file' });
            }
            const posts = JSON.parse(data);
            res.json(posts);
          });
        };
      

exports.getMenuByRestaurantId = (req, res) => {
    const restaurantId = parseInt(req.query.id); 

    if (isNaN(restaurantId)) {
        return res.status(400).json({ error: 'Invalid restaurant ID' });
    }

    const menuFilePath = path.join('src/controllers', '..', 'data', 'Menu.json');

    fs.readFile(menuFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read menu file:', err.message);  
            return res.status(500).json({ error: 'Failed to read menu file' });
        }

        let Menu;
        try {
            Menu = JSON.parse(data);
        } catch (parseErr) {
            console.error('Failed to parse menu data:', parseErr.message);  
            return res.status(500).json({ error: 'Failed to parse menu data' });
        }

        const restaurantMenu = Menu.find(r => r.restaurant_id === restaurantId);
        if (!restaurantMenu) {
            return res.status(404).json({ error: 'Restaurant menu not found' });
        }

        res.json(restaurantMenu.menu); 
    });
};
