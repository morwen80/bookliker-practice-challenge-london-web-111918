function api(){
  return fetch("http://localhost:3000/books").then(res => res.json())
}
const user1 = { "id": 1, "username": "morwen"}

function fetchBooks(){
  api().then(data => data.forEach(bookList))

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
    <input id="${book.id}" type="checkbox"> Like this book?
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
      <b>Users who liked this book:</b> ${book.users.map(u => ` ${u.username}`)}
        </div>
      </div>
    `
    const showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = ""
    showPanel.appendChild(bookShelf);
  }
}

// need a let equal to a user's array?

function editUserList(id) {
  fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then(book => {
      book.users.push(user1)
      fetch(`http://localhost:3000/books/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(book)
    })
    .then(resp => resp.json())
    .then(data => selectABook(data.id))
    })
}


// function editUserList(id) {
//   fetch(`http://localhost:3000/books`, {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   method: 'patch',
//   body: [
//     {"op": "add", "path": `/${id}`, "value": { "id": 1, "username": "morwen"} }
//   ]
// })
// }




fetchBooks()

document.addEventListener("click", (event) => {
  if (event.target.type == "checkbox"){
    console.log("this worked")
    editUserList(event.target.id)
  }
})
