const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const contactsRoutes = require("./Routes/contactRoutes");
const memberRoutes = require("./Routes/memberRoutes");
const ErrorMiddleware = require("./Utils/ErrorMiddleware");
dotenv.config();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/contacts", contactsRoutes);
app.use("/api/members", memberRoutes);
const port = process.env.PORT || 3000;

// DATABASE CONNECTION
mongoose
  .connect(`mongodb+srv://${process.env.CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port, () => console.log(`server running on ${port}`)))
  .catch((err) => console.log(err.message));

app.use(ErrorMiddleware);
