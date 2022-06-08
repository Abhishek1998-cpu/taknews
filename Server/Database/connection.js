const mongoose = require("mongoose")

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true, 
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  }).then(()=>{
    console.log("DB Connected Successfully")
  }).catch((error)=>{ 
    console.log("Failed to Connect DB " + error)
  })