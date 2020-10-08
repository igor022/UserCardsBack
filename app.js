require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 8080;

const app = express();

const dbUri = `mongodb+srv://dbUser:${process.env.DB_PASSWORD}@cardscluster.rvd7d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
  app.listen(port);
  console.log(`listening on port ${port}`)
})
.catch((err) => console.log(err));


app.use(cors());

// middleware & static files
app.use(express.static('public'));  

app.get('/', (req, res) => {
  res.redirect('/users');
})
// user routes
app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).send();
})