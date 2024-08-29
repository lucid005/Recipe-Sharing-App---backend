require("dotenv").config();
const connectDB = require("./config/database");
const express = require("express");
const app = express();
const mainRoutes = require("./routes/index.routes");
const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:4173"],
  methods: "GET, POST, PUT, DELETE",
};

app.use(express.json());
app.use(cors(corsOption));
app.use("/", mainRoutes);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
