const firstnameInput = document.querySelector('input[name="firstname"]');
const lastnameInput = document.querySelector('input[name="lastname"]');
const companyInput = document.querySelector('input[name="company"]');
const mailInput = document.querySelector('input[name="mail"]');
const sectorInput = document.querySelector('input[name="sector"]');
const submitBtn = document.querySelector('#catalogue-form button[type="submit"]');
const btn = document.querySelector('a[id="form-btn"]');
const catalogue = document.querySelector('a[id="link-catalogue"]');
const finput = document.querySelector('#fill');
const form = document.querySelector('form[id="catalogue-form"]')

// Remplissage rapide pour test
fill.addEventListener('click', fillFormsInput);

// Validation du formulaire
btn.addEventListener('click', validateForm);


function validateForm(){
    let err = [];
    if(firstnameInput.value.length < 2 ){
        if(document.querySelector(`.firstnameGroup .validation-text`)) document.querySelector(`.firstnameGroup .validation-text`).remove();
        if(!document.querySelector('.firstnameGroup .validation-text')) formError(firstnameInput, 'Merci de renseigner votre nom');
        err.push('Merci de renseigner votre nom');
    } 
    else {
        if(document.querySelector('.firstnameGroup .validation-text')) document.querySelector('.firstnameGroup .validation-text').remove();
     }
    if(lastnameInput.value.length < 2){
        if(document.querySelector(`.lastnameGroup .validation-text`)) document.querySelector(`lastnameGroup .validation-text`).remove();
        if(!document.querySelector('.lastnameGroup .validation-text')) formError(lastnameInput, 'Merci de renseigner votre prénom');
        err.push('Merci de renseigner votre prénom');
    } 
    else {
        if(document.querySelector('.lastnameGroup .validation-text')) document.querySelector('.lastnameGroup .validation-text').remove();
     }
    if(companyInput.value.length === 0){
        if(document.querySelector(`.companyGroup .validation-text`)) document.querySelector(`companyGroup .validation-text`).remove();
        if(!document.querySelector('.companyGroup .validation-text')) formError(companyInput, 'Merci de renseigner votre entreprise');
        err.push('Merci de renseigner votre entreprise');
    } 
    else {
        if(document.querySelector('.companyGroup .validation-text')) document.querySelector('.companyGroup .validation-text').remove();
     }
    if(validateEmail(mailInput.value) === null ){
        if(document.querySelector(`.mailGroup .validation-text`)) document.querySelector(`mailGroup .validation-text`).remove();
        if(!document.querySelector(`.mailGroup .validation-text`)) formError(mailInput, 'Merci de renseigner une adresse mail valide');
        err.push('Merci de renseigner une adresse mail valide');
    } 
    else {
        if(document.querySelector('.mailGroup .validation-text')) document.querySelector('.mailGroup .validation-text').remove();
     }
    if(parseInt(sectorInput.value)  < 0 || parseInt(sectorInput.value) > 99){
        if(document.querySelector(`.sectorGroup .validation-text`)) document.querySelector(`sectorGroup .validation-text`).remove();
        if(!document.querySelector(`.sectorGroup .validation-text`)) formError(sectorInput, 'Merci de renseigner un département valide');
        err.push('Merci de renseigner un département valide');
    } else if (sectorInput.value.length === 0) { 
        if(document.querySelector(`.sectorGroup .validation-text`)) document.querySelector(`sectorGroup .validation-text`).remove();
        if(!document.querySelector(`.sectorGroup .validation-text`)) formError(sectorInput, 'Merci de renseigner votre département');
        err.push('Merci de renseigner votre département');
     } else {
        if(document.querySelector('.sectorGroup .validation-text')) document.querySelector('.sectorGroup .validation-text').remove();
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


// Module de remplisagge express
function fillInput(input, value){
    input.innerText = value;
    input.value = value;
}
function fillFormsInput(){
    fillInput(firstnameInput, 'Deryckx');
    fillInput(lastnameInput, 'Clément');
    fillInput(companyInput, 'C2D');
    fillInput(mailInput, 'deryckxclement@outlook.com');
    fillInput(sectorInput, 59);
}