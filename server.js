const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/courses', (req, res) => {
  res.json([
    { id: 1, title: 'Khóa học 1' },
    { id: 2, title: 'Khóa học 2' }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

