const app = {};

app.init = () => {
  app.displayForm()
  app.renderTable()
  app.addBook()
};

$(function() {
  app.init();  
});

// selectors
app.$title = $("#title");
app.$author = $("#author");
app.$pages = $("#pages");
app.$status = $("option:selected");
app.$table = $(".library");

const book1 = {
  title: "Philosopher's Stone",
  author: "J.K. Rowling",
  pages: 200,
  status: "Read",
};

const book2 = {
  title: "Chamber of Secrets",
  author: "J.K. Rowling",
  pages: 300,
  status: "Not Read",
};

app.myLibrary = [book1, book2];


// book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = read;
};


// add new book to library
app.addBookToLibrary = () => {
  const $title = $("#title").val();
  const $author = $("#author").val();
  const $pages = $("#pages").val();
  const $status = $("option:selected").text();
  const newBook = new Book($title, $author, $pages, $status);
  app.myLibrary.push(newBook);
};

// display form
app.displayForm = () => {
  $(".newBookBtn").on("click", () => {
    $(".addBookDetails").toggleClass("hidden");
  });
};
// clear form
app.clearForm = () => {
  app.$title.val("")
  app.$author.val("")
  app.$pages.val("")
}

// check form
app.checkForm = () => {
  if (app.$title.val() === "" || app.$author.val() === "" || app.$pages.val() === "") {
    return false
  } else {
    return true
  }
}
// add book to table
app.addBook = () => {
  $('#add').on('click', () => {
    if (app.checkForm()) {
      app.addBookToLibrary()
      $(".addBookDetails").toggleClass("hidden");
      app.renderTable()
      app.clearForm()
    } 
  });
};

// event listeners
app.addListenerToDelete = (index) => {
  // console.log('listener added');
  $('.deleteBtn').on('click', () => {
    app.myLibrary.splice(index, 1);
    app.renderTable();
    // console.log(index);
  });
};

app.addListenerToRead = (index) => {
  $('.readBtn').on('click', ()  => {
    app.toggleRead(index)
  })
}

app.createDeleteButton = function(index) {
  const deleteBtn = `<td><button class="deleteBtn">Remove</button></td>`
  app.addListenerToDelete(index)
  return deleteBtn;
};

// create read button
app.createReadButton = function(index) {
  const readBtn = `<td><button class="readBtn">Change Status</button></td>`
  app.addListenerToRead(index)
  return readBtn;
};

app.toggleRead = (index) => {
  app.myLibrary[index].status === 'Read' ? app.myLibrary[index].status = 'Not Read' : app.myLibrary[index].status = 'Read'
  app.renderTable()
}

// render table
app.headers = ['Title', 'Author', 'Pages', 'Status', '', ''];

app.renderTable = () => {
  $('.header').empty();
  $('.books').empty()

  app.headers.forEach(header => {
    $('.header').append(`
      <th>${header}</th>
    `);
  });

  app.myLibrary.forEach((book, index) => {
    $('.books').append(`
    <tr>
      <td id=${index} class="title">${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status}</td>
      ${app.createReadButton(index)}
      ${app.createDeleteButton(index)})
    </tr>
    `);
    app.addListenerToRead(index)
    app.addListenerToDelete(index)
  });

  console.log('rendered table');
};
