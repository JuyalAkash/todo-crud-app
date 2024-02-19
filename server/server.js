import app from "./app.js";
import mongoose from "mongoose";

// APPLICATION INITIALIZE PORT
const { PORT } = process.env;

// APPLICATION DATABASE CONNECTION CHECKING
const dbConnection = mongoose.connection;

dbConnection.once("open", () => {
  console.log(`Database connected successfully!`);
});
dbConnection.on("error", (err) => {
  console.log(`Connection error: ${err}`);
});

// APPLICATION BOOT UP
app.listen(PORT || 8000, () => {
  console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`Logged Error: ${err} ${promise} `);
  process.exit(1);
});
