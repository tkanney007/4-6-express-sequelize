const express = require('express');
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const port = 3000;
app.use(express.json());

app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});