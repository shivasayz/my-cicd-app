import express from "express";

const app = express();
const PORT = 3000;
app.disable("etag");
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});


app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Node!",
    });
});

app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "App is running successfully",
    });
});

app.get("/api/health-check", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Backend is running successfully",
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
