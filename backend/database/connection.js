import mongoose from "mongoose";

const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "workLyft"
    }).then(() => {
        console.log("connected to database");
    }).catch(err => {
        console.log(`Failed to connect database : ${err}`);
    })
}

export default connection;