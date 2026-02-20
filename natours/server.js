const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");


const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);


mongoose.connect(DB)
  .then(() => console.log("DB connected ✅"))
  .catch(err => console.error("ERROR:", err));

// console.log(process.env);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});