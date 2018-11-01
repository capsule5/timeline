const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Timeline server running on port ${PORT}.`);
});
