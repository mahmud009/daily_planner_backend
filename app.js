const express = require("express");
const app = express();
const PORT = process.env.PORT || 3120;

app.get("/ping", (req, res) => {
  res.status(200).send("Ping success");
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
