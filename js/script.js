const cities = [
    {
        ID: 'il',
        NAME: 'Illumia',
        POSTAL_CODE_FORMAT: /^IL-\d{3,9}$/,
    },
    {
        ID: 'lu',
        NAME: 'Lunatown',
        POSTAL_CODE_FORMAT: /^LU-\d{3,8}(-[A-Z])?/,
    },
    {
        ID: 'st',
        NAME: 'Starspire',
        POSTAL_CODE_FORMAT: /^ST-0{5}1$/,
    },
    {
        ID: 'fl',
        NAME: 'Florenium',
        POSTAL_CODE_FORMAT: /^(\d{5})-FL(\d{3,5})-[ABC]$/,
    },
    {
        ID: 'um',
        NAME: 'Ume',
        POSTAL_CODE_FORMAT: /^UM-\d{5}$/,
    }
];

const inputWrapper = {
    CLASS: '.form-control',
}

const errorMessage = {
    CLASS: '.error-message',
}

const inputEmailElement = {
    ID: 'email-address',
}

function init() {
    setUpEventListeners();
}

function setUpEventListeners() {
    const main = document.querySelector(".container");
    main.addEventListener("input", (e) => {
        if(e.target.id === inputEmailElement.ID) {
            checkNameInput(e.target);
        }
    });
    main.addEventListener("change", (e) => {
        console.log(e);
    })
}

function checkNameInput(input) {
    const errorMsgElement = input.closest(inputWrapper.CLASS).querySelector(errorMessage.CLASS);
    if (input.validity.valueMissing) {
        errorMsgElement.textContent = "Please enter your email.";
    } else if (input.validity.patternMismatch) {
        errorMsgElement.textContent = 'Please enter a valid Luminary account. eg: (example@luminae.lum).'
    } else {
        errorMsgElement.textContent = '';
    }
}

init();

