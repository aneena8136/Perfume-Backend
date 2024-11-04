const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("could not connect to mongodb", err))
