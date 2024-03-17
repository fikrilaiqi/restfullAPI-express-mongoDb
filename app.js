import express from "express";
import dotenv from "dotenv";
import db from "./src/configs/db.js";
import routers from "./src/routers.js";

dotenv.config();
db.connectDb();

const app = express();
const PORT = process.env["PORT"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);

app.get("/", (req, res) => {
    res.send("Server Express");
    res.end();
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
