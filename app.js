import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env["PORT"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Server Express");
    res.end();
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
