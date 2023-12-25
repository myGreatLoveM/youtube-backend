import { app } from "./app.js";
import { connectDB } from "./dbConfig/connectDB.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`App couldn't connect to database: ${e.message}`);
      throw e;
    });
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log("-------------------------------------------");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
