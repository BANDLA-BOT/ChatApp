const express = require("express");
const authRoutes = require("./routes/auth");
const DB = require("./db/connectDb.js");
const cookieParser = require('cookie-parser')
const messageRoutes = require('./routes/message.js')
const userRoutes = require('./routes/userRoute.js')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  DB();
  console.log(`Server is running on ${PORT}`);
});
