import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
let db;
// MongoDB Connection
async function startServer(){
    try{

        db=await connectDB();
        app.listen(PORT, ()=>{
            console.log(`server running on http://localhost:${PORT}`);
        });
    } catch (error){
        console.error("failed to start server:", error);
        process.exit(1);
    }
}
startServer();

// Routes
app.get("/books", async (req, res, next)=>{
    try{

        const booksCollection= db.collection("books");
        const filter={};
        const books= await booksCollection.find(filter).toArray();
        res.json(books);
    }catch(err){
        next(err);
    }
});




// app.use('/api/books', require('./routes/books'));

// // Basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'BibliotecAPP Backend Server is running!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
