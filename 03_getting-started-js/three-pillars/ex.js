// * NOTE:
// * These are my answers.
// * The README and `ex.fixed.js` files in this directory where provided by the instructor.

class Bookshelf {
  constructor() {
    this.favoriteBooks = [];
  }
  addFavoriteBook(bookName) {
    if (!bookName.includes("Great")) {
      this.favoriteBooks.push(bookName);
    }
  }

  printFavoriteBooks() {
    console.log(`Favorite Books: ${String(this.favoriteBooks.length)}`);
    for (let bookName of this.favoriteBooks) {
      console.log(bookName);
    }
  }
}

var bookshelf = new Bookshelf();

function loadBooks(bookshelf) {
  fakeAjax(BOOK_API, function handleBooks(bookNames) {
    for (let bookName of bookNames) {
      bookshelf.addFavoriteBook(bookName);
    }

    bookshelf.printFavoriteBooks();
  });
}

loadBooks(bookshelf);

var BOOK_API = "https://some.url/api";

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
  setTimeout(function fakeLoadingDelay() {
    cb([
      "A Song of Ice and Fire",
      "The Great Gatsby",
      "Crime & Punishment",
      "Great Expectations",
      "You Don't Know JS",
    ]);
  }, 500);
}
