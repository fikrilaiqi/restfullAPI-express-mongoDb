import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Server Express");
    res.end();
});

app.listen(PORT, () => `Server Running on PORT ${PORT}`);
