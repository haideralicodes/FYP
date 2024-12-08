const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./controller/userRoutes');
const productRoutes = require('./controller/productRoutes');
const categoryRoutes = require('./controller/categoryRoutes');
const cartRoutes = require('./controller/cartRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
}).then(() => {
  console.log('DB connected...');
}).catch((err) => {
  console.error('DB connection error: ', err);
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/carts', cartRoutes);


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});