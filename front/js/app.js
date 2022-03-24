// TODO : Ne générer que les messages d'erreurs ou il y a une erreur lors de l'envoi.


import Validation from './classes/Validation.js';
const validation = new Validation();

const firstnameInput = document.querySelector('input[name="firstname"]');
const lastnameInput = document.querySelector('input[name="lastname"]');
const companyInput = document.querySelector('input[name="company"]');
const mailInput = document.querySelector('input[name="mail"]');
const sectorInput = document.querySelector('input[name="sector"]');
const submitBtn = document.querySelector('#catalogue-form button[type="submit"]');
const btn = document.querySelector('a[id="form-btn"]');
const catalogue = document.querySelector('a[id="link-catalogue"]');
const fill = document.querySelector('#fill');
const form = document.querySelector('form[id="catalogue-form"]');

// Remplissage rapide pour test
fill.addEventListener('click', fillFormsInput);

// Validation du formulaire
btn.addEventListener('click', validateForm);


function validateForm(){
    let err = [];
    if(firstnameInput.value.length < 2 ){
        if(document.querySelector(`.firstnameGroup .validation-text`)) document.querySelector(`.firstnameGroup .validation-text`).remove();
        if(!document.querySelector('.firstnameGroup .validation-text')) validation.formError(firstnameInput, 'Merci de renseigner votre nom');
        err.push('Merci de renseigner votre nom');
    } 
    else {
        if(document.querySelector('.firstnameGroup .validation-text')) document.querySelector('.firstnameGroup .validation-text').remove();
     }
    if(lastnameInput.value.length < 2){
        if(document.querySelector(`.lastnameGroup .validation-text`)) document.querySelector(`lastnameGroup .validation-text`).remove();
        if(!document.querySelector('.lastnameGroup .validation-text')) validation.formError(lastnameInput, 'Merci de renseigner votre prénom');
        err.push('Merci de renseigner votre prénom');
    } 
    else {
        if(document.querySelector('.lastnameGroup .validation-text')) document.querySelector('.lastnameGroup .validation-text').remove();
     }
    if(companyInput.value.length === 0){
        if(document.querySelector(`.companyGroup .validation-text`)) document.querySelector(`companyGroup .validation-text`).remove();
        if(!document.querySelector('.companyGroup .validation-text')) validation.formError(companyInput, 'Merci de renseigner votre entreprise');
        err.push('Merci de renseigner votre entreprise');
    } 
    else {
        if(document.querySelector('.companyGroup .validation-text')) document.querySelector('.companyGroup .validation-text').remove();
     }
    if(validation.validateEmail(mailInput.value) === null ){
        if(document.querySelector(`.mailGroup .validation-text`)) document.querySelector(`mailGroup .validation-text`).remove();
        if(!document.querySelector(`.mailGroup .validation-text`)) validation.formError(mailInput, 'Merci de renseigner une adresse mail valide');
        err.push('Merci de renseigner une adresse mail valide');
    } 
    else {
        if(document.querySelector('.mailGroup .validation-text')) document.querySelector('.mailGroup .validation-text').remove();
     }
    if(parseInt(sectorInput.value)  < 0 || parseInt(sectorInput.value) > 99){
        if(document.querySelector(`.sectorGroup .validation-text`)) document.querySelector(`sectorGroup .validation-text`).remove();
        if(!document.querySelector(`.sectorGroup .validation-text`)) validation.formError(sectorInput, 'Merci de renseigner un département valide');
        err.push('Merci de renseigner un département valide');
    } else if (sectorInput.value.length === 0) { 
        if(document.querySelector(`.sectorGroup .validation-text`)) document.querySelector(`sectorGroup .validation-text`).remove();
        if(!document.querySelector(`.sectorGroup .validation-text`)) validation.formError(sectorInput, 'Merci de renseigner votre département');
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

const inputs = document.querySelectorAll('input');
const inputsTexts = document.querySelectorAll('.form-input .input-text');
const formGroups = document.querySelectorAll('.form-group');

for(let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('input', (e) => {
        inputsTexts[i].innerText = inputs[i].value;
        console.log(inputsTexts[i]);
        console.log(inputsTexts[i].value);
    })
}


formGroups.forEach((group) => {
    group.addEventListener('click', (e) => {
        group.classList.add('focus');
    })
})

function fillFormsInput(){
    validation.fillInput(firstnameInput, 'Deryckx');
    validation.fillInput(lastnameInput, 'Clément');
    validation.fillInput(companyInput, 'C2D');
    validation.fillInput(mailInput, 'deryckxclement@outlook.com');
    validation.fillInput(sectorInput, 59);
}