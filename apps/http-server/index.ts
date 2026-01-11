import express, { type Request, type Response } from "express";
import { userRoutes, websiteRoutes } from "./routes/v1";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("<h1>server is running fine!!");
});

app.use("/api/v1/website", websiteRoutes);
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
