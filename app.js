require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const userRoutes = require('./routes/userRoutes');

const dbUri = `mongodb+srv://dbUser:${process.env.DB_PASSWORD}@cardscluster.rvd7d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.listen(port);

app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
})
// user routes
app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).send();
})