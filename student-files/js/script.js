
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const modalClose = document.querySelector(".modal-close-btn");
const url = 'https://randomuser.me/api/?results=12&nat=us';


let employees = [];


/*   functions   */


function displayEmployees(data) {
    console.log(data);
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
        <div class="card" id=${i}>
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


function displayModal(index) {
    let img = employees[index].picture.large;
    let name = employees[index].name;
    let email = employees[index].email;
    let location = employees[index].location;
    let phone = employees[index].phone;
    let dob = employees[index].dob;
    
    let date = new Date(dob.date);

    const modalHtml = `
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
    

    gallery.insertAdjacentHTML("beforeend", modalHtml);
}


/*   fetch   */


fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err));







/* gallery.addEventListener('click', e => {
    const modal = document.querySelector(".modal-container");
    console.log(modal);
    if (e.target !== gallery && e.target !== modal) {
        if (e.target !== modal.children) {
            console.log(modal.children)
        }
        const card = e.target.closest('.card');
        const index = card.id;
        console.log(index);
        displayModal(index);
    }
})


modalClose.addEventListener("click", () => {
    console.log("yo")
}) */

body.addEventListener("click", e => {
    if (e.target.className.includes("card")) {
        const card = e.target.closest('.card');
        const index = card.id;
        console.log(index);
        displayModal(index);
    }

    if (e.target.className.includes("modal-close-btn")) {
        document.querySelector(".modal-container").remove();
    }

    if (e.target.className === "modal-prev btn") {
        const modal = document.querySelector(".modal-container");
        let index = modal.className.replace('modal-container ', '');
        modal.remove();
        if (index === " 0") {
            console.log(index)
            const newIndex = 11;
            displayModal(newIndex);
        } else {
            index = parseInt(index);
            let newIndex = index - 1;
            displayModal(newIndex);
        }
    }

    if (e.target.className === "modal-next btn") {
        const modal = document.querySelector(".modal-container");
        let index = modal.className.replace('modal-container ', '');
        modal.remove();
        if (index === " 11") {
            console.log(index)
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