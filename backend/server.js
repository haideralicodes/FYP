const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./controller/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected...');
}).catch((err) => {
  console.error('DB connection error: ', err);
});

app.use('/api', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});