let myLibrary = [];
const container = document.querySelector('.container');
const addBookButton = document.querySelector('#add-book');
const data = document.querySelector('form');
const modal = document.querySelector('.modal')

window.onload = function() {
    getStorage();
}

addBookButton.addEventListener('click', () => {
    modal.style = 'display: block';
    data.style = 'display: flex';
})

data.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    document.querySelector('.modal').style = 'display: none';
    data.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === modal || e.target === data) {
        modal.style = 'display: none';
    }
});

class Book {
    constructor(title, author, pages, readOrNot) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readOrNot = readOrNot;
    }

    toggleRead() {
        this.readOrNot = this.readOrNot === 'No' ? 'Yes' : 'No';
    }
}

function addBookToLibrary() {
    let getData = new FormData(data);
    const title = getData.get('title');
    const author = getData.get('author');
    const pages = getData.get('pages');
    let readOrNot = getData.get('read');
    readOrNot = readOrNot === null ? 'No' : 'Yes'
    myLibrary.push(new Book(title, author, pages, readOrNot)); 
    setStorage();
    displayBook();
}


function displayBook() {
    newDiv = document.createElement('div');
    for (let i = 0; i < myLibrary.length; i++) {
        container.appendChild(newDiv);
        newDiv.classList.add('book-card');
        newDiv.setAttribute('data-index', i);
        container.querySelectorAll('div')[i].textContent = '';
        createBookInfo(i);
    }
}

function removeBookAndUpdateIndex(e) {
    deletedBookIndex = e.currentTarget.parentNode.dataset.index;
    e.currentTarget.parentNode.remove();
    myLibrary.splice(deletedBookIndex, 1);
    setStorage();
    for (let j = 0; j < container.querySelectorAll('div').length; j++) {
        container.querySelectorAll('div')[j].setAttribute('data-index', j);
    }
}

function toggleReadStatus(e) {
    pressedBook = e.currentTarget.parentNode.dataset.index
    e.currentTarget.textContent = e.currentTarget.textContent === 'Read' ? 'Not read' : 'Read';
    if (e.currentTarget.classList.contains('read-button')) {
        e.currentTarget.classList.add('not-read-button');
        e.currentTarget.classList.remove('read-button');
    } else {
        e.currentTarget.classList.add('read-button');
        e.currentTarget.classList.remove('not-read-button');
    }
    myLibrary[pressedBook].toggleRead();
}

function createBookInfo(i) {
    const title = document.createElement('h2');
    const author = document.createElement('h3');
    const pages = document.createElement('h4');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    title.textContent = `"${myLibrary[i].title}"`;
    author.textContent = myLibrary[i].author;
    pages.textContent = `${myLibrary[i].pages} pages`;
    readButton.textContent = myLibrary[i].readOrNot === 'Yes' ? 'Read' : 'Not read';
    removeButton.textContent = 'Remove';

    container.querySelectorAll('div')[i].appendChild(title);
    container.querySelectorAll('div')[i].appendChild(author);
    container.querySelectorAll('div')[i].appendChild(pages);
    container.querySelectorAll('div')[i].appendChild(readButton);
    container.querySelectorAll('div')[i].appendChild(removeButton);

    if (myLibrary[i].readOrNot === 'Yes') {
        readButton.classList.add('read-button');
    } else {
        readButton.classList.add('not-read-button');
    }
    removeButton.setAttribute('id', 'remove-button');

    readButton.addEventListener('click', e => { toggleReadStatus(e) });
    removeButton.addEventListener('click', e => { removeBookAndUpdateIndex(e); });
}

function setStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getStorage() {
    let library = localStorage.getItem('myLibrary');
    library = JSON.parse(library);
    for (let i = 0; i < library.length; i++) {
        const title = library[i].title;
        const author = library[i].author;
        const pages = library[i].pages;
        const readOrNot = library[i].readOrNot;
        myLibrary.push(new Book(title, author, pages, readOrNot)); 
        displayBook();
    }
}