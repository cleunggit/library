
const app = {};

app.init = () => {
  app.displayForm();
  app.displayBooks();
  app.addBookToLibrary();
  app.removeBook()
  // toggleRead()
  
};

$(function () {
  // document ready
  app.init();
});

const book1 = {
  title: "Philosopher's Stone",
  author: "J.K. Rowling",
  pages: 200,
  status: "Read",
};

// selectors
app.$title = $("#title");
app.$author = $("#author");
app.$pages = $("#pages");
app.$status = $("option:selected");

app.myLibrary = [book1];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = read;
}

// factory function
app.bookFactory = (title, author, pages, read) => {
  return {title, author, pages, read}
}

function getInput() {
  $("#add").click(() => {
    const title = $("#title").val();
    console.log(title);
  });
}

// clear form
app.clearForm = () => {
  app.$title.val("")
  app.$author.val("")
  app.$pages.val("")
}

// check form
app.checkForm = () => {
  if (app.$title.val() === "" || app.$author.val() === "" || app.$pages.val() === "") {
    alert(`Cannot leave field blank`)
    return false
  } else {
    return true
  }
}


app.addBookToLibrary = () => {
  $("#add").click(() => {
    if (app.checkForm()) {
      const $title = $("#title").val();
      const $author = $("#author").val();
      const $pages = $("#pages").val();
      const $status = $("option:selected").text();
      // const newBook = new Book($title, $author, $pages, $status);
      const newBook = app.bookFactory($title, $author, $pages, $status);
      
      app.myLibrary.push(newBook);
      app.clearForm()
      $(".addBookDetails").toggleClass("hidden");
  
      $(".books").append(`
      <tr>
        <td>${$title}</td>
        <td>${$author}</td>
        <td>${$pages}</td>
        <td><button class="bookRead">${$status}</button></td>
        <td><button class="removeBookBtn">Remove</button></td>
      </tr>
      `);
    }

    console.log(app.myLibrary);
  });
}

// write a function that loops through the array and displays each book on the page
app.displayBooks = () => {
  $(".books").empty()
  app.myLibrary.forEach((book, index) => {
    $(".books").append(`
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><button class="bookRead">${book.status}</button></td>
      <td><button id="${index}" class="removeBookBtn">Remove</button></td>
    </tr>
    `);
  });
}

app.removeBook = () => {
  $('.removeBookBtn').on('click', () => {
    
    app.myLibrary.splice(index, 1)
    console.log(index);
    console.log('removed');
    console.log(app.myLibrary);
    displayBooks()
  })
}

// display form
app.displayForm = () => {
  $(".newBookBtn").on("click", () => {
    $(".addBookDetails").toggleClass("hidden");
  });
}

// toggle read
app.toggleRead = () => {
  $(this).on('click', ".bookRead", () => {
  console.log(this);
  })
};


