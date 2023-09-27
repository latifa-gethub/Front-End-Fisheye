 
//les element du DOM
const modal = document.getElementById("contact_modal");
const modal2=document.getElementById("leightbox_modal");
const contenuLeightbox=document.querySelector('.contnerSlider');
const boutonContacterMoi=document.querySelector(".contacter_moi");
const fermerModale=document.querySelector(".img-fermer"); 
const body=document.getElementById("body");
const mainWrapper=document.getElementById(`main-wrapper`);
  
 
function displayModal1() {
   
	modal.style.display = "block";
    mainWrapper.style.display="none"
    mainWrapper.setAttribute(`aria-hidden`,true);
    modal.setAttribute(`aria-hidden`,false);
      
    fermerModale.focus();      
}

function closeModal() {    
    modal.style.display = "none";
    mainWrapper.style.display="block"
    modal.setAttribute(`aria-hidden`,true);
    
}
function closeLeigthBox(){
    modal2.style.display = "none";
    modal2.setAttribute(`aria-hidden`,true);
    mainWrapper.style.display="block"
}
//les element du DOM pour la moda-contactl
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
     
});

myform.addEventListener(`submit`,function(e){
   e.preventDefault();
   
console.log(`le prenom: ${firstname.value} le nom:${lastname.value} l'email:${email.value}`);
let input=document.querySelector(`.text-control`);
 input.value=""
})


