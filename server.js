const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();


const authRoutes= require('./routes/auth');
const perfumeRoutes = require('./routes/perfume');

const app = express();
const PORT= process.env.PORT || 5000;


app.use(cors());
app.use(bodyparser.json());


//CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("could not connect to mongodb", err))


//routes
app.use('/api/auth', authRoutes);
app.use('/api/perfume',perfumeRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//start server
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})