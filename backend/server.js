import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

app.get("/openlibrary/search", async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: "nome troppo corto" });
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&limit=10`
    );
    const data = await response.json();

    const books = data.docs.map((book) => ({
      title: book.title,
      author: book.author_name?.[0] || "Autore sconosciuto",
      year: book.first_publish_year || null,
      isbn: book.isbn?.[0] || null,
      coverId: book.cover_i || null,
      openLibraryKey: book.key,
    }));

    res.json(books);
  } catch (err) {
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
