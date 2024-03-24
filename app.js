import express from "express";
import db from "./src/configs/db.js";
import routers from "./src/routers.js";
import utils from "./src/utils/index.js";
import fileUpload from "express-fileupload";

db.connectDb();

const app = express();
const PORT = utils.getEnv("PORT");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }));
app.use(routers);
//static folder
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Server Express");
    res.end();
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
