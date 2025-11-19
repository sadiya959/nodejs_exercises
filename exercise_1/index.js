const express = require('express');

const app = express();


app.use(express.json())

let books = [
{    id: 1, title: "Atomic Habit", author: "James Clear"},
{    id: 2, title: "Miracle Morning", email: "Hal Elrod"},
{    id: 3, name: "Ebyan", email: "Fadumo Yusuf"}
]


//get all books
app.get('/books', (req,res) => {
    res.json(books);
})


// get book by id
app.get("/books/:id", (req,res) => {
const bookId = req.params.id;

const book = books.find(book => book.id == bookId);

if(!book) {
    return res.status(404).json({message: "book not found"});
}
res.json(book);

})


// add new book
app.post('/books', (req,res) => {
    const bookData = req.body;
    

    const newbook = {
        id: books.length + 1,
        title: bookData.title,
        author: bookData.author
    }


if(!newbook.title || !newbook.author) {
    return res.status(400).json({message: "title and author are required"});
}

    books.push(newbook);

    res.status(201).json(newbook);
})

// update book
app.put('/books/:id', (req,res) => {
    bookdId = req.params.id;

    const book = books.find(book => book.id == bookdId);

    if(!book) return res.status(404).json({message: "book not found"});



    book.title = req.body.title;
    book.author = req.body.author;

    res.send(book);
})



// delete book
app.delete("/books/:id", (req,res) => {
    bookdId = req.params.id;

     books = books.filter(book => book.id != bookdId);

    res.json(`book with id ${bookdId} has been deleted`);

})


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});