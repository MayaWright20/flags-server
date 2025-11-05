import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import fs from "fs";

connectDB();

const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.cert");

// mongoose.connect(process.env.MONGO_URI).then(result => {
//     https.createServer({key: privateKey, cert: certificate}, app).listen(
//         process.env.PORT || 5000
//     )
// }).catch(err => {
//     console.log(err)
// })
app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`)
});