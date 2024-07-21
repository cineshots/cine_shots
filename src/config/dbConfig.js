import mongoose from 'mongoose';
const connection  = {}
async function dbConnect(){
    if(connection.isConnected){
        console.log("Already connected to database")
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;

        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Failed", error);
        process.exit(1);
    }
}


export default dbConnect;