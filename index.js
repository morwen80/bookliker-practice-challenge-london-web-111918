// document.addEventListener("DOMContentLoaded", fetchBooks());

// const SHELF = []

function fetchBooks(){
  fetch("http://localhost:3000/books")
  .then(response => response.json())
  .then(data => {
    // SHELF =  data
    data.forEach(renderBook)
  })

const renderBook = (book) => {
  const bookEl = document.createElement('li')
    bookEl.innerHTML = `
      <h3>${book.title}</h3>
    `
    document.querySelector("#list").appendChild(bookEl)
}
}
