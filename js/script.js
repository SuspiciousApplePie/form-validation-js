const cities = [
    {
        ID: 'il',
        POSTAL_CODE_FORMAT: /^IL-\d{3,9}$/,
    },
    {
        ID: 'lu',
        POSTAL_CODE_FORMAT: /^LU-\d{3,8}(-[A-Z])?/,
    },
    {
        ID: 'st',
        POSTAL_CODE_FORMAT: /^ST-0{5}1$/,
    },
    {
        ID: 'fl',
        POSTAL_CODE_FORMAT: /^(\d{5})-FL(\d{3,5})-[ABC]$/,
    },
    {
        ID: 'um',
        POSTAL_CODE_FORMAT: /^UM-\d{5}$/,
    }
];

const parentElement = {
    INPUT_WRAPPER: '.form-control',
}

const errorMessage = {
    CLASS: '.error-message',
}

const inputElement = {
    EMAIL: 'email-address',
    POSTAL: '#postal',
    CITY: 'cities',
}

function init() {
    setUpEventListeners();
}

function setUpEventListeners() {
    const main = document.querySelector(".container");
    main.addEventListener("input", (e) => {
        if (e.target.id === inputElement.EMAIL) {
            checkEmailInput(e.target);
        }
    });
    main.addEventListener("change", (e) => {
        if (e.target.id === inputElement.CITY) {
            changeRegexPattern(e.target);
            checkCitySelected(e.target);
        }
    })
}

function checkEmailInput(input) {
    const errorMsgElement = input.closest(parentElement.INPUT_WRAPPER).querySelector(errorMessage.CLASS);
    if (input.validity.valueMissing) {
        errorMsgElement.textContent = "Please enter your email.";
    } else if (input.validity.patternMismatch) {
        errorMsgElement.textContent = 'Please enter a valid Luminary account. eg: (example@luminae.lum).'
    } else {
        errorMsgElement.textContent = '';
    }
}

function changeRegexPattern(input) {
    const postalInputElement = input.closest("form").querySelector(inputElement.POSTAL);
    postalInputElement.removeAttribute('pattern');
    cities.forEach(city => {
        if (city.ID === input.value) {
            postalInputElement.setAttribute('pattern', city.POSTAL_CODE_FORMAT.source);
        }
    })
}

function checkCitySelected(select) {
    const errorMsgElement = select.closest(parentElement.INPUT_WRAPPER).querySelector(errorMessage.CLASS);
    if (select.validity.valueMissing) {
        errorMsgElement.textContent = "Please select a city";
    } else {
        errorMsgElement.textContent = '';
    }
}

init();

