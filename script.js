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

Book.prototype.toggleRead = function() {
    this.readOrNot = this.readOrNot === 'No' ? 'Yes' : 'No';
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
        container.appendChild(newDiv);
        newDiv.setAttribute('data-index', i);
        container.querySelectorAll('div')[i].textContent = '';
        createBookInfo(i);
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

function toggleReadStatus(e) {
    pressedBook = e.currentTarget.parentNode.dataset.index
    e.currentTarget.textContent = e.currentTarget.textContent === 'Read' ? 'Not read' : 'Read';
    myLibrary[pressedBook].toggleRead();
}

function createBookInfo(i) {
    const title = document.createElement('h2');
    const author = document.createElement('h2');
    const pages = document.createElement('h2');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    readButton.textContent = myLibrary[i].readOrNot === 'Yes' ? 'Read' : 'Not read';
    removeButton.textContent = 'Remove';

    container.querySelectorAll('div')[i].appendChild(title);
    container.querySelectorAll('div')[i].appendChild(author);
    container.querySelectorAll('div')[i].appendChild(pages);
    container.querySelectorAll('div')[i].appendChild(readButton);
    container.querySelectorAll('div')[i].appendChild(removeButton);

    readButton.addEventListener('click', e => { toggleReadStatus(e) });
    removeButton.addEventListener('click', e => { removeBookAndUpdateIndex(e); });
}