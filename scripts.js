// Input elements
const form = document.querySelector("form");
const bill = document.getElementById("bill");
const tipButtons = document.querySelectorAll("#tip");
const custom = document.getElementById("custom");
const people = document.getElementById("people");
const reset = document.querySelector("#reset");

// Output elements
const amount = document.getElementById("amount");
const total = document.getElementById("person");

// Error elements
const errorbill = document.getElementById("error-bill");
const errorperson = document.getElementById("error-people");

// Input variable
let billAmount = 0;
let tipAmount = 0;
let peopleNumber = 1;

// Output variable
let tipSum = 0;
let totalSum = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Initial output value
    amount.textContent = "0.00";
    total.textContent = "0.00";
});

// Prevent form refresh
form.addEventListener("submit", (event) => {
    event.preventDefault();
});


// Bill validation
bill.addEventListener("input", () => {
    let isValid = true;
    if (!/^\d*\.?\d*$/.test(bill.value)) {
        bill.classList.add("error-input");
        errorbill.textContent = "Numbers only";
        isValid = false;
    }
    if(isValid) {
        errorbill.textContent = "";
        billAmount = parseFloat(bill.value) || 0;
        updateCalculation();
    }
});

// Tip amount selection
tipButtons.forEach(button => {
    button.addEventListener("click", function () {
        tipButtons.forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        tipAmount = parseFloat(this.getAttribute("value")) || 0;
        updateCalculation();
    });
});
custom.addEventListener("input", () => {
    tipButtons.forEach(btn => btn.classList.remove("selected"));
    // Custom amount validation
    if (!/^\d+$/.test(custom.value)) {
        custom.classList.add("error-input");
        isValid = false;
    } else if (value < 1) {
        custom.classList.add("error-input");
        isValid = false;
    }
    tipAmount = parseFloat(custom.value) || 0;
    updateCalculation();
});

// Number of people validation
people.addEventListener("input", () => {
    let value = parseInt(people.value, 10);
    let isValid = true;

    if (!/^\d+$/.test(people.value)) {
        people.classList.add("error-input");
        errorperson.textContent = "Numbers only";
        isValid = false;
    } else if (value < 1) {
        people.classList.add("error-input");
        errorperson.textContent = "Can't be zero";
        isValid = false;
    }

    if (isValid) {
        errorperson.textContent = "";
        peopleNumber = value;
        updateCalculation();
    }
});


// Calculation
function updateCalculation() {
    console.log("billAmount = " + billAmount);
    console.log("tipAmount = " + tipAmount);
    console.log("peopleNumber = " + peopleNumber);

    if (billAmount > 0 && peopleNumber > 0) {
        tipSum = billAmount * (tipAmount / 100);
        tipPerPerson =  tipSum / peopleNumber;
        tipPerPerson = tipPerPerson.toFixed(2);
        console.log("tipSum = " + tipSum);
        console.log("tipPerPerson = " + tipPerPerson);

        totalSum = billAmount + tipSum;
        totalPerPerson = totalSum / 5;
        totalPerPerson = totalPerPerson.toFixed(2);
        console.log("totalSum = " + totalSum);
        console.log("totalPerPerson = " + totalPerPerson);

        amount.textContent = tipPerPerson;
        total.textContent = totalPerPerson;
    }
}

// Reset form and result
reset.addEventListener("click", () => {
    form.reset();

    billAmount = 0;
    tipAmount = 0;
    peopleNumber = 1;

    amount.textContent = "0.00";
    total.textContent = "0.00";

    tipButtons.forEach(btn => btn.classList.remove("selected"));

    custom.value = "Custom";
});

