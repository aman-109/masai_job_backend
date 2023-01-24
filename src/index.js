require("dotenv").config()
const express = require("express");
const cors =require("cors")

const connect = require("./config/db");
const PORT=process.env.PORT || 8080

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({orgin:true,credentials:true}))
app.use(require("./routes/routes"))

app.listen(PORT, async () => {
  await connect();
  console.log(`Listening to http://localhost:${PORT}`);
});

