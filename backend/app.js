import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import connection from "./database/connection.js";
import userRoute from "./Routes/user.route.js";
import companyRoute from "./Routes/company.route.js";
import jobRoute from "./Routes/job.route.js";
import applicationRoute from "./Routes/application.route.js";
import reviewRoute from "./Routes/review.route.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
import path from "path";

const app = express();
const _dirname = path.resolve();
config();

const corsOptions = {
    origin:process.env.FRONTEND_URL,
    credentials:true
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/review", reviewRoute);

newsLetterCron();
connection();

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_ , res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})
export default app;
