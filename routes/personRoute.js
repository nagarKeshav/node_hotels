const express = require('express');
const route = express.Router();
const Person = require('./../models/pearson'); // Ensure this path is correct

route.post('/', async (req, res) => {
  try {
    const data = req.body;
    const person = new Person(data);
     const response = await person.save();
    console.log('Person saved successfully:', response);
    res.status(201).send(response);
  } catch (error) {
    console.log('Error saving person:', error);
    
    res.status(400).send(error);
  }
});

route.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    console.log('Fetched persons:', persons);
    res.status(200).send(persons);
  } catch (error) {
    console.log('Error fetching persons:', error);
    res.status(500).send(error);
  }

});


route.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      console.log('fetch person',response);
      res.status(200).json(response);
    } else {
      res.status(400).send({ message: 'Invalid work type' });
    }
  } catch (error) {
    console.log('Error fetching persons by work type:', error);
    res.status(500).send(error);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await Person.findByIdAndUpdate (id, data, { 
      new: true,
      runValidators: true
    });
    console.log('Person updated successfully:', response);
    res.status(200).send(response);
  } catch (error) {
    console.log('Error updating person:', error);
    res.status(400).send(error);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Person.findByIdAndDelete(id);
    console.log('Person deleted successfully:', response);
    res.status(200).send(response);
  } catch (error) {
    console.log('Error deleting person:', error);
    res.status(400).send(error);
  }
});

route.get('/test-data', async (req, res) => {
  const data = await Person.find(); // no filter
  console.log('All persons:', data);
  res.json(data);
});


module.exports = route;
