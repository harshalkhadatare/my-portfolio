 const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save((err) => {
    if (err) {
      return res.status(500).send('Error saving contact');
    }
    res.status(200).send('Contact saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
