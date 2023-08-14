const mainWrapper=document.getElementById(`main-wrapper`); 
const modal = document.getElementById("contact_modal");
function displayModal() {    
	modal.style.display = "block";
    mainWrapper.setAttribute(`aria-hidden`,true);
    modal.setAttribute(`aria-hidden`,false);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute(`aria-hidden`,true);
}
//les element du DOM
let firstname=document.getElementById("firstname");
let myform=document.getElementById(`Myform`);
let error=document.querySelector(`.errorF`);
let errorL=document.querySelector(`.errorL`);
let errorE=document.querySelector(`.errorE`);
let lastname=document.getElementById(`last`); 
let email=document.getElementById(`email`);
let titreName=document.querySelector(`h2`);
//titreName.textContent=``; 

let validate=0;
   //verrifier champ firstname
firstname.addEventListener("input", function (e) {
    let RegExp = /^[a-zA-Z-\s]+$/;
    if (RegExp.test(e.target.value) == false || e.target.value.length < 2) {
        error.innerHTML = "Veuillez entrez au moins deux caracteres";
        validate=0;
    } else {
        validate++;
        error.innerHTML = "";
    }
});
//verrifier champ lastname
lastname.addEventListener("input",function(e){
    let RegExp = /^[a-zA-Z-\s]+$/;
    if (RegExp.test(e.target.value) == false || e.target.value.length < 2) {
        errorL.innerHTML = "Veuillez entrez au moins deux caracteres";
        validate--;
    } else {
        validate++;
        errorL.innerHTML = "";
    }
})
//verrifier champ email
email.addEventListener("input", function (e) {
    let RegExp = /^[a-zA-Z0-9._]+[@]{1}[a-zA-Z0-9._]+[.]{1}[a-z]{2,10}$/;
    if (RegExp.test(e.target.value) == false) {
        errorE.innerHTML = "Veuillez entrez un mail valide";
        validate--;
    } else {
        validate++;
        errorE.innerHTML = "";
    }
    /*if(validate=3){
        console.log("tout est bien");
        }*/
});

myform.addEventListener(`submit`,function(e){
   e.preventDefault();
   
console.log(`le prenom: ${firstname.value} le nom:${lastname.value} l'email:${email.value}`);
let input=document.querySelector(`.text-control`);
 input.value=""
})


