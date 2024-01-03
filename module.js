'use strict';
// Get elements
const formBday = document.querySelector('.form-bday');
const formField = document.querySelector('.form-field');
const inputsAll = document.querySelectorAll('.date');
const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const errorText = document.querySelectorAll('.error-text');
const btnCalculate = document.querySelector('.btn-calculate');
const numberText = document.querySelectorAll('.number-text');

const checkForNumber = function(e) {
    if(isNaN(e.data)) {
        this.value = '';
    }
}

const isEmpty = function(e) {
    const input = e.target;
    const errorLabel = e.target.closest('.form-field').querySelector('.error-text');
    if(input.value.trim() === '') {
        errorLabel.textContent = 'This field is required';
        input.parentNode.parentNode.classList.add('error');
        input.parentNode.parentNode.classList.remove('active')
        // input.parentNode.parentNode.classList.remove('active')
    } else {
        input.value = input.value.padStart(2, '0');
        input.parentNode.parentNode.classList.remove('error');
        errorLabel.textContent = '';
    }
}

const checkRange = function(field, min, max) {
    return +field.value < min || +field.value > max ? false : true;
}


// Event handlers
inputsAll.forEach(input => input.addEventListener('input', checkForNumber))
inputsAll.forEach(input => input.addEventListener('focus', () => input.parentNode.parentNode.classList.add('active')))
inputsAll.forEach(input => input.addEventListener('blur', isEmpty))

const numberSetter = function(el, end, seconds) {
    let count = 0;
    const counter = setInterval(() => {
        el.textContent = count+=1;
        if(count >= end) {
            clearInterval(counter)
            count = 0;
        } 
        // console.log(start+=increment);
    }, seconds)
}

btnCalculate.addEventListener('click', function(e) {
    e.preventDefault();
    let validated = false;
if(!checkRange(inputDay, 1, 31)) {
    errorText.item(0).textContent = 'Invalid day';
    validated = false;
} else {
    numberText.item(0).textContent = `--`;
    errorText.item(0).textContent = '';
    validated = true;
}
if(!checkRange(inputMonth, 1, 12)) {
    errorText.item(1).textContent = 'Invalid Month';
    validated = false;
} else {
    numberText.item(1).textContent = `--`;
    errorText.item(1).textContent = '';
    validated = true;
}

if(!checkRange(inputYear, 0, 2023) || inputYear.value.length < 3) {
    errorText.item(2).textContent = 'Must be in the past';
    validated = false;
    inputYear.value = '';
} else {
    errorText.item(2).textContent = '';
    numberText.item(2).textContent = `--`;
    validated = true;
}

if(validated) {
        const dayValue = +inputDay.value.trim();
        const monthValue = +inputMonth.value.trim();
        const yearValue = +inputYear.value.trim();
        const currentDate = new Date().getTime();
        
        const thisYear = +new Date().getFullYear();
        const thisMonth = +new Date().getMonth();
        const thisDay = +new Date().getDate();
        const inputDate = new Date(yearValue, monthValue-1, dayValue).getTime();

        const outputDate = currentDate - inputDate;
        // console.log(new Date(outputDate).getFullYear() - 1970);

        const totalYears = new Date(outputDate).getFullYear() - 1970;
        const totalMonths = new Date(outputDate).getMonth();
        const totalDays = new Date(outputDate).getDate();
        
        numberSetter(numberText.item(0), totalYears, 1);
        numberSetter(numberText.item(1), totalMonths, 2);
        numberSetter(numberText.item(2), totalDays, 2);
    }
})