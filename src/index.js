import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import { app } from "./app.js";
import cron from "node-cron";
import fetchData from "./job/fetchData.js";
import { Crypto } from "./models/crypto.models.js";

//connet to mongoDB Atlas.
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Connected to MongoDB");
     
    await fetchData();

    cron.schedule("0 */2 * * *", async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error during scheduled API call:", error.message);
      }
    });

    app.on("error", (error) => {
      console.log("error", error);
      process.exit(1);
    });
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server started at ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
})();
