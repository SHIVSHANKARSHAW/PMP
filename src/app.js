import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();


// Basic Config middlleware
app.use(express.json({ limit : "16kb" }))
app.use(express.urlencoded({ 
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// Cors
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}))

// Route Setup
import healthCheckRoute from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.route.js"
import projectRouter from "./routes/project.routes.js"

app.use("/api/v1/healthcheck",healthCheckRoute);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/projects", projectRouter);


app.get("/",(req, res) => {
    res.send('Hey !!');
})

export default app;