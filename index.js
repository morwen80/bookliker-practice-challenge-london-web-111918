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
  const checkMe = document.createElement('div')
  // create a separate div or something for the checkbox
  //otherwise selectABook will get triggered when it's clicked.
    bookEl.setAttribute("onclick", `selectABook(${book.id})`);
    bookEl.innerHTML = `
      <h3>${book.title}</h3>
      <!-- <input id="liked" type="checkbox"> Like this book? -->
    `
    checkMe.innerHTML = `
    <input id="liked" type="checkbox">Like this book?
    `

    document.querySelector("#list").appendChild(bookEl)
    document.querySelector("#list").appendChild(checkMe)
  }
}

function selectABook(id) {
  let bookShelf = document.createElement('div');
    api().then(data => {
    book = data.find(book => book.id === id)
    renderBook(book);
  })


const renderBook = (book) => {
  bookShelf.innerHTML = `
    <div class="singleBook">
      <img src="${book.img_url}">
      <p class="desc">${book.description}</p>
      <div class="users">
      <b>Users who liked this book:</b>${book.users}
        </div>
      </div>
    `
    document.querySelector("#show-panel").appendChild(bookShelf);
  }

}


fetchBooks()

// every element in list has a onclick element that triggers the selectABook function
// with EVENT id as param
