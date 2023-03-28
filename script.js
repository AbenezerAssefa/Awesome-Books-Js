
  displayBooks() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    this.books.forEach((book) => {
      const li = document.createElement('li');
      li.classList.add('book');
      li.innerHTML = `<div>"${book.title}" by ${book.author}</div>`;
      const removeButton = document.createElement('button');
      removeButton.innerHTML = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(book);
      });
      li.appendChild(removeButton);
      booksList.appendChild(li);
      li.style.listStyleType = 'none';
      const hr = document.createElement('hr');
      booksList.appendChild(hr);
    });
  }

  addBook(title, author) {
    const book = { title, author };
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(book) {
    const newBooks = this.books.filter((b) => b.title !== book.title || b.author !== book.author);
    localStorage.setItem('books', JSON.stringify(newBooks));
    this.books = newBooks;
    this.displayBooks();
  }
}

const alertMessage = document.querySelector('.alert-message');
document.addEventListener('DOMContentLoaded', () => {
  const books = new Books();
  books.displayBooks();
  const form = document.getElementById('add-book-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // check if the book is already in the list
    const booksArrays = JSON.parse(localStorage.getItem('books')) || [];
    let bookExists = false;
    if (booksArrays.length > 0) {
      for (let i = 0; i < booksArrays.length; i += 1) {
        if (booksArrays[i].title === title && booksArrays[i].author === author) {
          bookExists = true;
        }
        if (bookExists) alertMessage.innerHTML = `The book ${title} by ${author} already exists`;
      }
    }
    if (bookExists === false) {
      books.addBook(title, author);
    }
    // end of the check

    form.reset();
  });
});

const titleInput = document.querySelector('#title');
titleInput.addEventListener('click', () => {
  alertMessage.innerHTML = '';
});
