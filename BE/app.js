const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4002;
var cors = require('cors');

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());

const Router = require('./routes');
app.use('/', Router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
