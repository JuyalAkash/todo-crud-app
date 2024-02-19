import "dotenv/config";
// dotenv.config();
import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors/cors.js";
import connectDB from "./dbConn/db.js";
import errorHandler from "./middlewares/Error.js";
import indexRouter from "./routes/index.route.js";
import registerRouter from "./routes/auth/auth.route.js";
import loginRouter from "./routes/auth/auth.route.js";
import todoRouter from "./routes/todos/todos.route.js";

// INITIALIZE EXPRESS APPLICATION
const app = express();

const __dirname = path.resolve();

// APPLICATION DATABASE CONNECTION
connectDB();

// APPLICATION MIDDLEWARES AND CUSTOMIZATIONS
app.use(cors(corsOptions)); // Enable Cross Origin Resource Sharing

// APPLICATION BUILT-IN MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// APPLICATION STATIC FILE
app.use(express.static(path.join(__dirname, "/public")));

// APPLICATION VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// APPLICATION LOGGER MIDDLEWARE
app.use(logger("common"));
app.use(cookieParser());

// APPLICATION ROUTES
app.use("/", indexRouter);
app.use("/api", registerRouter);
app.use("/api", loginRouter);

app.use("/todo", todoRouter);

// APPLICATION ERROR HANDLING MIDDLEWARE

/** Handle unregistered route for all HTTP Methods **/
app.all("*", (req, res) => {
  res.status(400);
  if (req.accepts("html") || req.accepts("ejs")) {
    res.render("error", { status: 404, message: "404 Not Found" });
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

export default app;
