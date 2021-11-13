process.env.NODE_ENV !== "production" && require("dotenv").config();
import express from "express";
import compression from "compression";
import connectDb from "./services/connectDb";
import { resolve } from "path";
import cors from 'cors'

const app = express();

// VIEW ENGINE
app.set("view engine", "ejs");

// static folder
app.use(express.static(resolve("files")));

// views folder
app.set("views", resolve('views'));

// Middleware
app.use(cors())
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// END MIDDLEWARE

// routes
import indexRoute from "./routes/index";
app.use("/", indexRoute);
import ajaxRoute from "./routes/ajax";
app.use("/ajax", ajaxRoute);
import verificationRoute from "./routes/verify";
app.use("/verify", verificationRoute);
// app.use("/ajax/verify", require("./routes/ajax/verify"));
// app.use("/", require("./routes/pages/index"));
// app.use("/verify", require("./routes/pages/verify"));

// app
const PORT = process.env.PORT || 8080;
connectDb(() => app.listen(PORT, () => console.log(`App started on port ${PORT}`)));
