import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import imageGeneratorRoutes from "./routes/imageGeneratorRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/imageGenerator", imageGeneratorRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From Image_Generator!");
});

const PORT = process.env.port || 8080

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server has started on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
