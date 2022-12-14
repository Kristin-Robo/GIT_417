"use strict";
// add dark and light buttons 
function darkMode() {
    var element = document.body;
    element.className = "dark-mode";
    }
    function lightMode() {
    var element = document.body;
    element.className = "light-mode";
    }


// setting event handlers for each product input checkbox
document.getElementById("check1").onclick = updateSelectedProduct;
document.getElementById("check2").onclick = updateSelectedProduct;
document.getElementById("check3").onclick = updateSelectedProduct;
document.getElementById("check4").onclick = updateSelectedProduct;
document.getElementById("check5").onclick = updateSelectedProduct;
document.getElementById("check6").onclick = updateSelectedProduct;

// updateSelectedProduct() function is called
function updateSelectedProduct() {
    // checkbox.check is stored in a variable
    const checkBoxIsChecked = this.checked;
    // checkbox.id is stored as a variable
    const checkBoxId = this.id;
    // checkbox.value is stored as a variable
    const checkBoxValue = this.value;
    //concatenate checkbox.id + "Active" and save as selectedProductId
    const selectedProductId = checkBoxId + "Active";
    //call getPrice() function that isolates price from checkbox.value and returns productPrice:int
    const productPrice = getPrice(checkBoxValue);
    // if checkbox.checked is true
    //call updateCart() function which takes checkbox.value:string, selectedProductId, checkbox.checked:bool
    updateCart(checkBoxValue, selectedProductId, checkBoxIsChecked);
    // call updateTotal() function passing in productPrice:int and checkbox.checked:bool
    updateTotal(productPrice, checkBoxIsChecked)
}

function getPrice(checkBoxValue) {
    //param(checkBoxValue:string) returns productPrice:number
    const productPrice = checkBoxValue.match(/\d+\.*\d*/g);
    return parseFloat(productPrice);
}

function updateCart(checkBoxValue, selectedProductId, checkBoxIsChecked){
    //param(checkBoxValue:string, selectedProductId:string, checkBoxIsChecked:bool) returns Null
    if(checkBoxIsChecked){
        //...updateCart() creates new shoppingList <li></li> element with innerHtml == checkbox.value
        const shoppingListElement = document.createElement("li");
        //...updateCart() setAttribute id == selectedProductId (checkbox.id+"Active")
        shoppingListElement.setAttribute("id", selectedProductId);
        shoppingListElement.innerHTML = checkBoxValue;
        //...updateCart() appends the new child element to the id="shoppingList"
        const shoppingList = document.getElementById("shoppingList");
        shoppingList.appendChild(shoppingListElement);

    } else {
        //...updateCart() is passed a checkbox.value == false
        //...updateCart() uses selectedProductId to delete the selected element from the DOM
        const elementForRemoval = document.getElementById(selectedProductId);
        elementForRemoval.remove();
    }
}

function updateTotal(productPrice, checkBoxIsChecked) {
    //...updateTotal() also multiplies by sales tax and adds shipping
    const newAdjustedPrice = 5 + (productPrice * 1.08);
    const totalAmtElement = document.getElementById("totalAmount");
    //...updateTotal() selected the Total by id, converts to int
    const currentTotal = getPrice(totalAmtElement.innerHTML);
    if(checkBoxIsChecked) {
        //adds/subtracts productPrice (based on true/false)
        const addedTotal = parseFloat(currentTotal + newAdjustedPrice).toFixed(2);
        //...updateTotal() assigns value to new variable an updates Total innerHtml accordingly
        totalAmtElement.innerHTML = "$" + addedTotal;
    } else {
        //...updateTotal() is passed a checkbox.checked == false
        //......subtracts the productPrice param (included the adjusted sales tax and shipping
        const subtractedTotal = parseFloat(currentTotal - newAdjustedPrice).toFixed(2);
        //...updateTotal() updates totalAmount innerHtml with updated value
        totalAmtElement.innerHTML = "$" + subtractedTotal;
    }

}

//checkOutAlert() function is called
function checkOutAlert() {
    const totalAmount = document.getElementById("totalAmount");
    //...if the id totalAmount == "$0.00" || totalAmount == "" and alert message will tell the user
      //......they need to add an item to their cart
    if(totalAmount.innerHTML == "$0.00" || totalAmount.innerHTML == "-$0.00") {
        alert("Please place at least one item in your cart to check out");
    //...else an alert message string will be built that includes the total from id = totalAmount along with
    //......a thank you
    } else {
        //customer is notified that their transaction was successful
        alert("You have been charged " + totalAmount.innerHTML + "." + " Thank you for shopping with us!");
        // clearCart() function is called
        clearCart();
    }

}

function clearCart() {
    deSelectCheckboxes();
    //set the Total to $0.00
    document.getElementById("totalAmount").innerHTML = "$0.00";
    //remove product names from cart
    removeChildren(document.getElementById("shoppingList"));
}

function removeChildren(parentElement) {
    //removes child elements from parent node
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function deSelectCheckboxes() {
    //build loop to iterate through checkboxes and set them to false
    for (let i = 1; i < 7; i++) {
        document.getElementById("check" + i).checked = false;
    }
}


// .................This is as far as I was able to complete on form validation with the time I had available before submittal....... 

const contactForm = document.getElementById("mySubmit");
contactForm.addEventListener("click", validateForm, false);

function validateForm(event) {
    //tracking form field validity
    const formElementValidityObj = {};
    const fullFirstLastRegx = /[a-zA-Z]+\s[a-zA-z]+/
    //phone validated with regex
    const validPhoneRegx = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
    //Email validated with regex
    const validEmailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //First and Last name are required
    formElementValidity["fullName"] = validateWithRegex(fullFirstLastRegx, "fullName");
    //Valid email is required
    formElementValidity["email"] = validateWithRegex(validEmailRegx, "email");
    //Valid phone number is required
    formElementValidity["phone"] = validateWithRegex(validPhoneRegx, "phone");
    console.log(formElementValidityObj);
    //temporarily preventing the form from being submitted
    event.preventDefault();
}

function validateWithRegex(regex, ElementId) {
    const elementValue = document.getElementById(ElementId).value;
    const testRegex = regex;
    const testResult = testRegex.test(elementValue);
    return testResult;
}

//one radio button must be selected
//There needs to be a message in the message box
//errors need to be next to the input and noticeable
//if valid, the form is allowed to be submitted
//once submitted, an alert message is presented thanking the customer and providing an info summation
//post submittal, the form must be cleared
