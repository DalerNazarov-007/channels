const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth.router');
const channelsRouter = require('./routers/channels.router');

const app = express();

mongoose.connect('mongodb://localhost:27017/channels').then(() => {
    console.log('Connected to MongoDB successfully');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/auth", authRouter)
app.use("/channels", channelsRouter)

app.use((error, req, res, next) => {

    if (error.name === "ValidationError") {
        return res.status(400).send({ message: error.message })
    }
    else{
        return res.status(500).send({ message: "Internal Server Error" })
        
    }
})

app.listen(3333, () => {
    console.log('Server is running on port 3333');
})