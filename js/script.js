const cities = [
    {
        ID: 'il',
        POSTAL_CODE_FORMAT: /^IL-\d{3,9}$/,
        SAMPLE: 'IL-123456789'
    },
    {
        ID: 'lu',
        POSTAL_CODE_FORMAT: /^LU-\d{3,8}(-[A-Z])$/,
        SAMPLE: 'LU-12345-A',
    },
    {
        ID: 'st',
        POSTAL_CODE_FORMAT: /^ST-0{5}1$/,
        SAMPLE: 'ST-000001',
    },
    {
        ID: 'fl',
        POSTAL_CODE_FORMAT: /^(\d{5})-FL(\d{3,5})-[ABC]$/,
        SAMPLE: '12345-FL-1234-C',
    },
    {
        ID: 'um',
        POSTAL_CODE_FORMAT: /^UM-\d{5}$/,
        SAMPLE: 'UM-12345',
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
    PASSWORD: 'password',
}

function init() {
    setUpEventListeners();
}

function setUpEventListeners() {
    const main = document.querySelector(".container");
    main.addEventListener("input", (e) => {
        if (e.target.id === inputElement.EMAIL) {
            checkEmailInput(e.target);
        } else if (e.target.id === inputElement.POSTAL.replace('#', '')) {
            checkPostalInput(e.target);
        } else if (e.target.id === inputElement.PASSWORD.replace('#', '')) {
            checkPasswordInput(e.target);
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
            postalInputElement.placeholder = city.SAMPLE;
        }
    })

    if (postalInputElement.value) {
        checkPostalInput(postalInputElement);
    }
}

function checkCitySelected(select) {
    const errorMsgElement = select.closest(parentElement.INPUT_WRAPPER).querySelector(errorMessage.CLASS);
    if (select.validity.valueMissing) {
        errorMsgElement.textContent = "Please select a city";
    } else {
        errorMsgElement.textContent = '';
    }
}

function checkPostalInput(postal) {
    const errorMsgElement = postal.closest(parentElement.INPUT_WRAPPER).querySelector(errorMessage.CLASS);
    if (postal.validity.valueMissing) {
        errorMsgElement.textContent = 'Please enter your postal code.';
    } else if (!postal.pattern.length) {
        errorMsgElement.textContent = `Select a city first.`;
    } else if (postal.validity.patternMismatch) {
        errorMsgElement.textContent = `Wrong format, the proper format is: ${postal.placeholder}`;
    } else {
        errorMsgElement.textContent = '';
    }
}

function checkPasswordInput(password) {
    const errorMsgElement = password.closest(parentElement.INPUT_WRAPPER).querySelector(errorMessage.CLASS);
    if (password.validity.valueMissing) {
        errorMsgElement.textContent = 'Please enter your password.';
    } else if (password.validity.tooShort) {
        errorMsgElement.textContent = `Your password is too short, password should be at least ${password.minLength} characters`;
    } else {
        errorMsgElement.textContent = '';
    }
}

init();

