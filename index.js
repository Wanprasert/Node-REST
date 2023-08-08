require("dotenv").config();

const express = require("express");
const app = express()
const port = process.env.PORT;

app.get("/", (req) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});