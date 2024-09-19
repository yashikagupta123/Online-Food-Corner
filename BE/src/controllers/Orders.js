const fs = require('fs');
const path = require('path');

const getOrders = (req, res) => {
  const filePath = path.join('src/controllers', '..', 'data', 'Orders.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    const orders = JSON.parse(data);
    res.json(orders);
  });
};


const postOrder = (req, res) => {
  const filePath = path.join('src/controllers', '..', 'data', 'Orders.json');
  

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    
    let orders = [];
    
    if (data) {
      orders = JSON.parse(data);
    }
    
    const newOrder = req.body;
    
  
    newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 1;
    
    orders.push(newOrder);
    
    fs.writeFile(filePath, JSON.stringify(orders, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save order' });
      }
      
      res.status(201).json({ message: 'Order has been placed' }); 
    });
  });
};



const deleteOrder = (req, res) => {
  const filePath = path.join('src/controllers', '..', 'data', 'Orders.json');
  const orderId = parseInt(req.query.id, 10);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    let orders = [];
    if (data) {
      orders = JSON.parse(data);
    }

    const updatedOrders = orders.filter(order => order.id !== orderId);

    if (orders.length === updatedOrders.length) {
      return res.status(404).json({ error: 'Order not found' });
    }

    fs.writeFile(filePath, JSON.stringify(updatedOrders, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save updated orders' });
      }

      res.status(200).json({ message: 'Order deleted successfully' });
    });
  });
};



module.exports = { getOrders, postOrder, deleteOrder };