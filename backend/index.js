import express from "express"
import authRoutes from "./routes/authRoutes.js";
const app = express()
import contactRoutes from "./routes/routes.js"
import {connectDB}  from "./config/database.js"
import dotenv from "dotenv"
import cors from "cors"
import shippingSettingsRoutes from "./routes/shippingSettingRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import reviewSettingRoutes from "./routes/reviewSettings.routes.js";


dotenv.config()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use("/uploads", express.static("uploads"));
app.use(express.json())

app.use("/api", contactRoutes)

app.get("/" , (req,res) => {
    res.send("api is running")
})
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);



// Shipping Setting
app.use("/api/shipping-settings", shippingSettingsRoutes);

// Review settings
app.use("/api/review-settings", reviewSettingRoutes);

app.listen(PORT, () => {
    console.log(`server started successfully on port ${PORT}`)
})

