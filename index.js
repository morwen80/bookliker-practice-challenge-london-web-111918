// document.addEventListener("DOMContentLoaded", fetchBooks());

function api(){
  return fetch("http://localhost:3000/books").then(res => res.json())
}

const bookFansArray = []

function fetchBooks(){
  api().then(data => {data.forEach(bookList)
})

const bookList = (book) => {
  const bookEl = document.createElement('li')
    bookEl.setAttribute("onclick", `selectABook(${book.id})`);
    bookEl.innerHTML = `
      <h3>${book.title}</h3> <input id="liked" type="checkbox"> Like this book?
    `
    document.querySelector("#list").appendChild(bookEl)
  }
}


function selectABook(id) {
  let bookShelf = document.createElement('div');
  api().then(data => {
  let book = data.find(book => book.id === id)
    bookShelf.innerHTML = `
      <img src="${book.img_url}">

      <br>
      ${book.description}
      <hr>
      <b>Users who liked this book: </b>${book.users}
    `
    document.querySelector("#show-panel").appendChild(bookShelf)
})
}


fetchBooks()
