import mongoose from "mongoose";

const connect=async()=> {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('Connected',()=>{
            console.log('Database connected Successfully')
        })
        connection.on('error',(err)=>{
            console.log('MongoDB Connection Error. Please Make Sure MongoDB Is Running'+ err)
            process.exit()
        })
    } catch (error) {
        console.log(error)
    }
}

export default connect