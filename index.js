const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB Connection Successful!"))
        .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);

app.listen(process.env.PORT || 5000,() => {
    console.log("Backend Server is Running");
})