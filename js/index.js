const searchBook = () =>{
    toggleSpinner('block')
    toggleBookList('none')
    const searchField = document.getElementById('search-field')
    const searchValue =  searchField.value
    
    fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
    .then(res => res.json())
    .then(data => loadBook(data.docs, data.numFound))

    // {test async Way } 
    // const res = await fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
    // const data = await res.json()
    // loadBook(data.docs)
    // {Test End}
    
    searchField.value = ''
}


// Load Book Method
const loadBook = (books,numFound) => {

    totalBookList(numFound,books.length)

    const searchResult = document.getElementById('search-result')
    searchResult.textContent = ''
    
    const errPops = document.getElementById('error-Message')
    errPops.textContent = ''


    // Validation and Show BookList 
    if(books.length === 0 ){
        const eror = errorMessage()
        errPops.appendChild(eror)
    }else{

        books.forEach( book => {
            
            const div = document.createElement('div')
            
            div.classList.add('col')

            div.innerHTML = `
                <div class="card">
                ${book.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">`: `<h4 class="text-center my-5 border-bottom border-2 py-5 px-2 text-warning fw-bold">Image or Thumnail Not Found for this Book</h4>`}
                    
                    <div class="card-body">
                        <h5 class="card-title">Name: <span class="text-success">${book.title}</span> </h5>
                        <p class="card-text fw-bold">Author:  ${ book.author_name ? book.author_name.map(author=>getBookInfo(author)) : `<span class="text-success border border-1 rounded-pill m-2 px-2">Author Not Found</span>`}
                        </p>
                        <p class="card-text fw-bold">Publisher:  ${ book.publisher ? book.publisher.map(author=>getBookInfo(author)) : `<span class="text-success border border-1 rounded-pill m-2 px-2">Publisher Not Found</span>`}
                        </p>
                        <p class="card-text fw-bold">First-Publish-Date: <span class="text-success">${book.first_publish_year ? book.first_publish_year : 'First Published Date Not Found'}</span> </p>
                    </div>
                </div>
            `
            searchResult.appendChild(div)
        });
    }
    // End If Else 
    toggleSpinner('none')
    toggleBookList('block')
}
// Load Book End


// Show Toggle Spinner Method
const toggleSpinner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle
}

// Show Toggle BookList Method
const toggleBookList = (displayStyle) => {
    document.getElementById('counter-list').style.display = displayStyle
    document.getElementById('book-list').style.display = displayStyle
}


// Total Books List and How many Found Method
const totalBookList = (numFound,bookFound) => {
    
    const bookList = document.getElementById('counter-list')
    bookList.innerHTML = `
        <p class="card-text fw-bold">Total-Book-List: <span class="text-success"> ${numFound} </span><span class="text-info">--></span><span> Show-Book-List: </span> <span class="text-success"> ${bookFound} </span></p>
    `
}
// Total Books List and How many Found End


// Book Author and Publisher Information Method
const getBookInfo = info => {
   
        return `<span class="text-success border border-1 rounded-pill m-2 px-2">${info}</span>`
  
}
// Book Author and Publisher Information Method


// Error Message Method
const errorMessage = () => {
    const errorContainer = document.createElement('div')
        errorContainer.classList.add('text-center')
        errorContainer.innerHTML = `
            <h3 class="fw-bold text-danger"> Sorry..!! Book Not Found. Try Again.... </h3>
        `
        return errorContainer
}

