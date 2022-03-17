const firstnameInput = document.querySelector('input[name="firstname"]');
const lastnameInput = document.querySelector('input[name="lastname"]');
const companyInput = document.querySelector('input[name="company"]');
const mailInput = document.querySelector('input[name="mail"]');
const submitBtn = document.querySelector('#catalogue-form button[type="submit"]');
const btn = document.querySelector('a[id="form-btn"]');
const catalogue = document.querySelector('a[id="link-catalogue"]');
const finput = document.querySelector('#fill');
const form = document.querySelector('form[id="catalogue-form"]')

// Remplissage rapide pour test
fill.addEventListener('click', fillFormsInput);

// Validation du formulaire
btn.addEventListener('click', validateForm);

function formError(input, errorValue){
    const validation = document.createElement('span');
    validation.className = "validation-text";
    validation.innerText = errorValue;
    input.parentElement.appendChild(validation); 
    
    // Delete on ui dev
    validation.style.color = "red";

}

function validateEmail (email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

function fillInput(input, value){
    input.innerText = value;
    input.value = value;
}

function validateForm(){
    let err = [];
    if(firstnameInput.value.length < 2 ){
        if(!document.querySelector('.firstnameGroup .validation-text')) formError(firstnameInput, 'Merci de renseigner votre nom');
        err.push('Merci de renseigner votre nom');
    } 
    if(lastnameInput.value.length < 2){
        if(!document.querySelector('.lastnameGroup .validation-text')) formError(lastnameInput, 'Merci de renseigner votre prénom');
        err.push('Merci de renseigner votre prénom');
    } 
    if(companyInput.value.length === 0){
        if(!document.querySelector('.companyGroup .validation-text')) formError(companyInput, 'Merci de renseigner votre entreprise');
        err.push('Merci de renseigner votre entreprise');
    } 
    if(validateEmail(mailInput.value) === null ){
        if(!document.querySelector('.mailGroup .validation-text')) formError(mailInput, 'Merci de renseigner une adresse mail valide');
        err.push('Merci de renseigner une adresse mail valide');
    } 


    if(err.length === 0){
        const vspans = form.querySelectorAll('.validation-text');
        vspans.forEach(span => span.remove());
        catalogue.click();
        setTimeout(() => {
            submitBtn.click();
        },1000);
    }
}

function fillFormsInput(){
    fillInput(firstnameInput, 'Deryckx');
    fillInput(lastnameInput, 'Clément');
    fillInput(companyInput, 'C2D');
    fillInput(mailInput, 'deryckxclement@outlook.com');
}