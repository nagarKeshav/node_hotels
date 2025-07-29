const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu'); // Ensure this path is correct


router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const menu = new Menu(data);
    const response = await menu.save();
    console.log('Menu item saved successfully:', response);
    res.status(201).send(response);
  } catch (error) {
    console.log('Error saving menu item:', error);
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    console.log('Fetched menu items:', menuItems);
    res.status(200).send(menuItems);
  } catch (error) {
    console.log('Error fetching menu items:', error);
    res.status(500).send(error);
  }
});

router.get('/:category', async (req, res) => {
  try {
    const  category  = req.params.category;
    if(category === 'starter' || category === 'main course' || category === 'dessert') {
      const response = await Menu.find({ category: category });
      console.log('Fetched menu items by category:', response);
      res.status(200).send(response);
    } else {
      res.status(404).send({ message: 'Category not found' });
    } 
  } catch (error) {
    console.log('Error fetching menu items by category:', error);
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await Menu.findByIdAndUpdate(id, data, { 
      new: true,
      runValidators: true
    }); 
    console.log('Menu item updated successfully:', response);
    res.status(200).send(response);
  } catch (error) {
    console.log('Error updating menu item:', error);
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => { 
  try {
    const id = req.params.id;
    const response = await Menu.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    console.log('Menu item deleted successfully:', response);
    res.status(200).send(response);
  } catch (error) {
    console.log('Error deleting menu item:', error);
    res.status(500).send(error);
  }
});

router.post('/', (req, res) => {
  res.send('data is save')
  console.log('data is save');
  
})

module.exports = router;