const mongoose = require(`mongoose`)


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URI)
    .then(()=>
    console.log("Conexion to DB"))
    .catch((err)=>
    console.error(err));

    app.get('/',(req,res) => {
    res.send('Connected')
})