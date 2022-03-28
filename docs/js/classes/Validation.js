export default class Validation {

    formError(input, errorValue){
        const validation = document.createElement('span');
        validation.className = "validation-text";
        validation.innerText = errorValue;
        input.parentElement.appendChild(validation);
        
        setTimeout(()=>{validation.classList.add('active');}, 150);

        // Delete on ui dev
        validation.style.color = "red";

    }

    validateEmail (email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    fillInput(input, value){
        input.innerText = value;
        input.value = value;
    }
}