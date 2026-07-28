// Use public DNS servers to avoid SRV lookup issues with MongoDB Atlas
const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

require("dotenv").config();



const mongoose = require("mongoose");
const express = require("express");

const routes = require("./routes");

const app = express();

const PORT = 3000;


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log("MongoDB error:", error);
});


// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Serve HTML, CSS, JS files
app.use(express.static("."));


// Gemini + signup routes
app.use("/", routes);


app.listen(PORT, () => {
    console.log(`StudySpark running on port ${PORT}`);
});