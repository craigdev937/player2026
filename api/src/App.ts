import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import favicon from "serve-favicon";
import helmet from "helmet";
import logger from "morgan";
import { v2 as cloudinary } from "cloudinary";
import { ERR } from "./middleware/midError.js";
import { playRT } from "./routes/PlayRT.js";

export const APP: express.Application = express();
APP.use(favicon(path.join(__dirname, "../public/favicon.ico")));
APP.use(helmet());

// Cloudinary Connection //
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// CORS Setup //
APP.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods",
            "POST, GET, PUT, PATCH, DELETE");
        return res
            .status(res.statusCode)
            .json({ "status message": "OK" });
    };
    next();
});

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(logger("dev"));
APP.use("/api", playRT);
APP.use(ERR.notFound);
APP.use(ERR.errHandler);



