// Default Books

let books = JSON.parse(localStorage.getItem("libraryBooks")) || [

    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        year: 1988,
        status: "Available"
    },

    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        year: 2018,
        status: "Available"
    },

    {
        id: 3,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        year: 1997,
        status: "Issued"
    }

];


// Save books to Local Storage

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


// Display Books

function displayBooks(bookList = books) {

    const tableBody =
        document.getElementById("bookTableBody");

    tableBody.innerHTML = "";


    bookList.forEach(function(book) {

        const row = document.createElement("tr");


        let actionButton = "";

        if (book.status === "Available") {

            actionButton = `
                <button
                    class="action-btn issue-btn"
                    onclick="issueBook(${book.id})">
                    Issue
                </button>
            `;

        } else {

            actionButton = `
                <button
                    class="action-btn return-btn"
                    onclick="returnBook(${book.id})">
                    Return
                </button>
            `;

        }


        row.innerHTML = `

            <td>${book.id}</td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>${book.year}</td>

            <td>
                <span class="status ${
                    book.status === "Available"
                    ? "available"
                    : "issued"
                }">
                    ${book.status}
                </span>
            </td>

            <td>

                ${actionButton}

                <button
                    class="action-btn delete-btn"
                    onclick="deleteBook(${book.id})">
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    updateStats();

}


// Update Dashboard Statistics

function updateStats() {

    const total =
        books.length;

    const available =
        books.filter(
            book => book.status === "Available"
        ).length;

    const issued =
        books.filter(
            book => book.status === "Issued"
        ).length;


    document.getElementById("totalBooks")
        .textContent = total;

    document.getElementById("availableBooks")
        .textContent = available;

    document.getElementById("issuedBooks")
        .textContent = issued;

}


// Add New Book

document
    .getElementById("bookForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const title =
            document.getElementById("bookTitle")
                .value.trim();

        const author =
            document.getElementById("bookAuthor")
                .value.trim();

        const category =
            document.getElementById("bookCategory")
                .value.trim();

        const year =
            document.getElementById("bookYear")
                .value;


        const newBook = {

            id: books.length > 0
                ? Math.max(...books.map(book => book.id)) + 1
                : 1,

            title: title,

            author: author,

            category: category,

            year: year,

            status: "Available"

        };


        books.push(newBook);

        saveBooks();

        displayBooks();


        document
            .getElementById("bookForm")
            .reset();


        alert("Book added successfully!");

    });


// Issue Book

function issueBook(id) {

    const book =
        books.find(book => book.id === id);


    if (book) {

        book.status = "Issued";

        saveBooks();

        displayBooks();

        alert(
            `"${book.title}" has been issued.`
        );

    }

}


// Return Book

function returnBook(id) {

    const book =
        books.find(book => book.id === id);


    if (book) {

        book.status = "Available";

        saveBooks();

        displayBooks();

        alert(
            `"${book.title}" has been returned.`
        );

    }

}


// Delete Book

function deleteBook(id) {

    const book =
        books.find(book => book.id === id);


    if (!book) {
        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${book.title}"?`
        );


    if (confirmDelete) {

        books =
            books.filter(
                book => book.id !== id
            );

        saveBooks();

        displayBooks();

    }

}


// Search Books

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        const searchText =
            this.value.toLowerCase();


        const filteredBooks =
            books.filter(function(book) {

                return (

                    book.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    book.author
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    book.category
                        .toLowerCase()
                        .includes(searchText)

                );

            });


        displayBooks(filteredBooks);

    });


// Load Books when page opens

displayBooks();