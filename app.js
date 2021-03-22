const app = {};

app.init = () => {
  app.renderTable()
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
  status: "Read",
};

app.myLibrary = [book1, book2];


// book constructor
app.Book = (title, author, pages, read) => {
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
  const newBook = new app.Book($title, $author, $pages, $status);
  app.myLibrary.push(newBook);
};


// event listeners
app.addListenerToDelete = (index) => {
  // console.log('listener added');
  $('.deleteBtn').on('click', () => {
    app.myLibrary.splice(index, 1);
    app.renderTable();
    // console.log(index);
  })
}

app.createDeleteButton = function(index) {
  const deleteBtn = `<td><button class="deleteBtn">Remove</button></td>`
  app.addListenerToDelete(index)
  return deleteBtn;
};

// render table
app.headers = ['Title', 'Author', 'Pages', 'Status', ''];

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
      <td id=${index}>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status}</td>
      ${app.createDeleteButton(index)})
    </tr>
    `);
    app.addListenerToDelete(index)
  });

  console.log('rendered table');
};
