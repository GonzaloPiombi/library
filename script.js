let myLibrary = [];
const container = document.querySelector('.container');
const addBookButton = document.querySelector('#add-book');
const submitButton = document.querySelector('form button');
const data = document.querySelector('form');

addBookButton.addEventListener('click', () => {
    document.querySelector('form').style = 'display: flex';
})
submitButton.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, readOrNot) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readOrNot = readOrNot
}

function addBookToLibrary() {
    let getData = new FormData(data);
    const title = getData.get('title');
    const author = getData.get('author');
    const pages = getData.get('pages');
    let readOrNot = getData.get('read');
    readOrNot = readOrNot === null ? 'No' : 'Yes'
    myLibrary.push(new Book(title, author, pages, readOrNot)); 
    displayBook();
}


function displayBook() {
    newDiv = document.createElement('div');
    for (let i = 0; i < myLibrary.length; i++) {
        removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        container.appendChild(newDiv);
        newDiv.setAttribute('data-index', i);
        container.querySelectorAll('div')[i].textContent = myLibrary[i].title + ' ' + myLibrary[i].author + ' ' + myLibrary[i].pages + ' ' + myLibrary[i].readOrNot;
        container.querySelectorAll('div')[i].appendChild(removeButton);
        removeButton.addEventListener('click', (e) => { removeBookAndUpdateIndex(e); });
    }
}

function removeBookAndUpdateIndex(e) {
    deletedBookIndex = e.currentTarget.parentNode.dataset.index;
    e.currentTarget.parentNode.remove();
    myLibrary.splice(deletedBookIndex, 1);
    for (let j = 0; j < container.querySelectorAll('div').length; j++) {
        container.querySelectorAll('div')[j].setAttribute('data-index', j);
    }
}