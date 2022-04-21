
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const modalClose = document.querySelector(".modal-close-btn");
const searchDiv = document.querySelector(".search-container");

const url = 'https://randomuser.me/api/?results=12&nat=us';


let employees = [];


/*   functions   */


/** 
  * Creates a search bar and adds it to the HTML
  */
function displaySearchBar() {
    const searchBarHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;

    searchDiv.insertAdjacentHTML("beforeend", searchBarHTML);
}

displaySearchBar();

const search = document.querySelector(".search-input");


/** 
  * Takes an array and creates the HTML for all employees
  * @param  {array}  data - array of random users
  */
function displayEmployees(data) {
    employees = data;
    let employeesHTML = '';
    for (let i = 0; i < employees.length; i++) {
        let firstName = employees[i].name.first;
        let lastName = employees[i].name.last;
        let email = employees[i].email;
        let city = employees[i].location.city;
        let state = employees[i].location.state;
        let img = employees[i].picture.large;

        employeesHTML += `
        <div class="card ${firstName} ${lastName}" id=${i}>
            <div class="card-img-container">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>`;
    };

    gallery.insertAdjacentHTML('beforeend', employeesHTML);
}


/** 
  * Creates the modal window
  * @param  {integer}  index - index of the clicked card
  */
function displayModal(index) {
    let img = employees[index].picture.large;
    let name = employees[index].name;
    let email = employees[index].email;
    let location = employees[index].location;
    let phone = employees[index].phone;
    let dob = employees[index].dob;
    
    let date = new Date(dob.date);

    const modalHTML = `
        <div class="modal-container  ${index}">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class="modal-close-btn-x">X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${img}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${location.city}</p>
                    <hr>
                    <p class="modal-text">${phone}</p>
                    <p class="modal-text">${location.street.number} ${location.street.name}, ${location.state} ${location.postcode}</p>
                    <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
    

    gallery.insertAdjacentHTML("beforeend", modalHTML);
}


/** 
  * Hides or shows the cards depending on the search
  * @param  {string}  searchValue - value of the search input
  */
function handleSearch(searchValue) {
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        let className = cards[i].className.toLocaleLowerCase();
        className = className.replace("card", "");
        if (className.includes(searchValue)) {
            cards[i].style.display = "flex";
        } else {
            cards[i].style.display = "none";
        }
    }
}


/*   fetch   */


// fetch the data and calls the displayEmployee function giving the data as argument

fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err));



/*   event listeners   */


body.addEventListener("click", e => {

    // calls displayModal
    if (e.target.className.includes("card")) {
        const card = e.target.closest('.card');
        const index = card.id;
        displayModal(index);
    }

    // closes modal window
    if (e.target.className.includes("modal-close-btn")) {
        document.querySelector(".modal-container").remove();
    }

    // prev button
    if (e.target.className === "modal-prev btn") {
        const modal = document.querySelector(".modal-container");
        let index = modal.className.replace('modal-container ', '');
        modal.remove();
        if (index === " 0") {
            const newIndex = 11;
            displayModal(newIndex);
        } else {
            index = parseInt(index);
            let newIndex = index - 1;
            displayModal(newIndex);
        }
    }

    // next button
    if (e.target.className === "modal-next btn") {
        const modal = document.querySelector(".modal-container");
        let index = modal.className.replace('modal-container ', '');
        modal.remove();
        if (index === " 11") {
            const newIndex = 0;
            modal.remove();
            displayModal(newIndex);
        } else {
            index = parseInt(index);
            let newIndex = index + 1;
            modal.remove();
            displayModal(newIndex);
        }
    }
})


search.addEventListener("keyup", e => {
    handleSearch(e.target.value.toLowerCase());
})