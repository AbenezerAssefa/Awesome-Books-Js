const addedBooks = document.querySelector('.added-books'); // In this div the html wil be created dinamically
let books = []; // In this array all the new books will be added
let removeButton = [];

// add new book to books array and delete input fields for new input
function add() {
  const newTitle = document.querySelector('.add-title'); // User input
  const newAuthor = document.querySelector('.add-author'); // User input
  if (newTitle.value !== '' && newAuthor.value !== '') {
    books.push({
      title: newTitle.value,
      author: newAuthor.value,
    });
    localStorage.setItem('storedBooks', JSON.stringify(books));
    newTitle.value = '';
    newAuthor.value = '';
  }
}

// remove a book from books array
function remove(index) {
  books.splice(index, 1);
  localStorage.setItem('storedBooks', JSON.stringify(books));
}

// print on the HTML if a book is added or removed
function print() {
  addedBooks.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const html = `
      <div class="book">
        <div class="book-details">
          <div class="title">${books[i].title}</div>
          <div class="author">${books[i].author}</div>
        </div>
        <div class="remove-container">
          <button class="remove-number">Remove</button>
        </div>
      </div>
    `;
    addedBooks.innerHTML += html;
  }

  // before using removeButton we need to create it with this: addedBooks.innerHTML += html;
  removeButton = document.querySelectorAll('.remove-number');
  for (let i = 0; i < books.length; i += 1) {
    removeButton[i].addEventListener('click', () => {
      remove(i);
      print();
    });
  }
}

// when the window loads the local storage will be printed
window.addEventListener('load', () => {
  if (localStorage.getItem('storedBooks')) {
    books = JSON.parse(localStorage.getItem('storedBooks'));
  }
  print();
});

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
  add();
  print();
});
