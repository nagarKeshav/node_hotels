const express = require('express'); // CommonJS Syntax ✅

const app = express()
const db = require('./db');

const body_parser = require('body-parser');
app.use(body_parser.json()); // req.body

// const Person = require('./models/pearson'); // Ensure this path is correct
// const Menu = require('./models/menu'); // Ensure this path is correct 

app.get('/', (req, res) => {
  res.send('Hello World')
})

const personRoute = require('./routes/personRoute');
app.use('/person', personRoute);
const menuItemRoute = require('./routes/menuItemRoute');
app.use('/menu', menuItemRoute);


// server is listening on port 3000

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})





