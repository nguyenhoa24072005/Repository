const express = require('express');
const dotenv = require('dotenv');

// Load biến môi trường từ .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api/courses', require('./routes/courseRoutes'))

