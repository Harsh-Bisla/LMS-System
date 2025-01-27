const express = require('express');
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connnectDB = require('./dbConnection');
const userRouter = require('./routes/userRoute');
const courseRouter = require('./routes/courseRoute');
const PORT = process.env.PORT;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// database connection
connnectDB(`${process.env.MONGO_URL}/LMS`)
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log("Mongo connection error", err.message));


// user route
app.use("/api/user", userRouter);
// course route
app.use("/api/course", courseRouter);

app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`)
})