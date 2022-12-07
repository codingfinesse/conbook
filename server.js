// express server
const express = require('express');
const path = require('path');
require('dotenv').config();

// mongodb connection
const connectDB = require('./config/db');
connectDB();

const app = express();

// middleware
app.use(express.json({ extended: false }));

// contact route
app.use('/api/contacts', require('./routes/contact'));


// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started port ${PORT}`));
