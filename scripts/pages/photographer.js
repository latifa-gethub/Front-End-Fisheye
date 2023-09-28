//Mettre le code JavaScript lié à la page photographer.html

import * as index from "./index.js"

//les elements du DOM
const mainWrapper=document.getElementById(`main-wrapper`); 
const modal2=document.querySelector(".modal2");
const leigthBoxModal = document.getElementById("leightbox_modal");
const contact_modal = document.getElementById("contact_modal"); 

/**
 * 
 * @param {*} photographe 
 * @param {*} media 
 * @param {nom de photographe} name 
 */
async function displayDataPhotographer(photographe, media, name) {

   const photographHeader = document.querySelector(".photograph-header");
   const photograph = photographerTemplate(photographe);
   const photographCartDOM = photograph.getGraphersCartDOM();
   photographHeader.appendChild(photographCartDOM);

   //pour trier la liste    
   const bouttonTrier = document.querySelector(".boutton-trier");     
   const trier = document.querySelector(".trier");
   const chevron = document.querySelector(".fa-chevron-down");

   const ul = document.querySelector("ul");
   function lunchList() {
      ul.classList.toggle("show");
      chevron.style.transform = "rotate(180deg)";
   }
   trier.addEventListener("click", lunchList);
   const dateList = document.querySelectorAll(".liste");

   for (let i = 0; i < dateList.length; i++) {
      dateList[i].addEventListener("click", function () {
         const recupBoutton = bouttonTrier.textContent;
         let choixTri;

         if (dateList[i].textContent === "Popularité") {
            choixTri = 1

         } else if (dateList[i].textContent === "Date") {
            choixTri = 2;
         } else {
            choixTri = 3;
         }
         if (choixTri) {
            bouttonTrier.textContent = dateList[i].textContent;
            dateList[i].textContent = recupBoutton;
            ul.classList.toggle("show");
            displayDataMedia(media, name, choixTri)
         }
      });
   }
}
async function displayDataMedia(mediaTrier, name, choixTri, price) {

   //trier par choix
   let mediaParChoix = mediaTrier;

   if (choixTri == 1) {
      mediaParChoix = mediaTrier.sort((a, b) => b.likes - a.likes);
   } else if (choixTri == 2) {
      mediaParChoix = mediaTrier.sort((a, b) => new Date(b.date) - new Date(a.date));
   } else if (choixTri == 3) {
      mediaParChoix = mediaTrier.sort((a, b) => a.title.localeCompare(b.title, "fr"));
   }
   const photographHeader = document.querySelector(".photograph-header");
   const contneur = document.createElement("div");
   contneur.setAttribute("class", "conteneur");

   mediaParChoix.forEach((element,index) => {
      const mediaId = photographerTemplate(element);
      const mediaCartDOM = mediaId.getMediaCartDOM(name,index);
       
      mediaCartDOM.setAttribute("tabindex",0)
      contneur.appendChild(mediaCartDOM);
      photographHeader.appendChild(contneur);

   })

   //au click sur une photographie la leightbox s'affiche
   const photographie = document.querySelectorAll(".affichage");

   for (let i = 0; i < photographie.length; i++) {
      photographie[i].addEventListener(`click`, function () {     
                     
        leigthBoxModal.style.display = "block";
        modal2.style.backgroundColor = "beige";
         mainWrapper.style.display="none"  
         showSlides(i)
      });
   }
}
//la fonction qui fait appelle au template pour creer les element du Dom de Modal
async function displayModal(photographe, name) {

   const headerContact = document.querySelector(".Contactez-moi");
 
   const photograph = photographerTemplate(photographe);
   const headerNameCartDOM = photograph.getModalCartDOM(name);
   headerContact.appendChild(headerNameCartDOM);
}
//la fonction pour creer les elements du Leitgbox
async function displayleightbox(mediaid, namephotographer) {

   if (document.querySelector(".contnerSlider")) {
      modal2.removeChild(document.querySelector(".contnerSlider"))
   }
   const contnerSlider = document.createElement("div");
   contnerSlider.setAttribute("class", "contnerSlider");
    
   mediaid.forEach((media) => {
      const templateBox = photographerTemplate(media);
      const leightboxCarteDOM = templateBox.getLeightboxDOM(media, namephotographer);
      contnerSlider.appendChild(leightboxCarteDOM);
   })
   modal2.innerHTML += '<button class="btn btn_precedent" ><</button><button class="btn btn_next" >></button>';

   modal2.appendChild(contnerSlider);

   //evenement au click sur le bouton next precedent
   const buttonPrecedent = document.querySelector(".btn_precedent");
   const buttonNext = document.querySelector(".btn_next");
   const sliders = Array.from(document.querySelectorAll(".slider"));
   buttonPrecedent.addEventListener("click", function (e) {
      let slide = document.querySelector(".active-slider");
      showSlides(sliders.indexOf(slide) - 1);
   });
   buttonNext.addEventListener("click", function () {
      let slide = document.querySelector(".active-slider");
      showSlides(sliders.indexOf(slide) + 1);
   });     

}
//la fonction qui gére le défilement sur la Leightbox
function showSlides(n) {
    
   const sliders = document.querySelectorAll(`.slider`);

   if (n < 0) { n = sliders.length - 1 }
   else if (n == sliders.length) { n = 0 }
   for (let i = 0; i < sliders.length; i++) {
      sliders[i].classList.remove('active-slider');
      sliders[i].classList.add('unactive-slider');
   }
   sliders[n].classList.remove('unactive-slider');
   sliders[n].classList.add('active-slider');
}
//la fonction ou on calcule la somme des likes et appelle
// template pour les elements du Dom de likes
async function displayLikes(price) {
   const contnerLikes = document.createElement("article");
   const contneur = document.querySelector(".conteneur");
  
   contnerLikes.setAttribute("class", "contener-likes");
   
   const allLikes = document.querySelectorAll(".like");
   let sommeLikes = 0;
   for (let i = 0; i < allLikes.length; i++) {
      let premierLike = parseInt(allLikes[i].innerHTML);
      sommeLikes = sommeLikes + premierLike;
   }
   
   const likesTemplate = photographerTemplate(sommeLikes);
   const likeCarteDOM = likesTemplate.getLikesCarteDOM(sommeLikes, price);
   contnerLikes.appendChild(likeCarteDOM);
   contneur.appendChild(contnerLikes);

   //event au click sur les icon-like
   const iconHeart = document.querySelectorAll(".fa-heart");

   for (let i = 0; i < iconHeart.length; i++) {
      let compteur = 0;
      iconHeart[i].addEventListener("click", function () {
         let likeI = parseInt(allLikes[i].innerHTML);
         let newLike;
         if (compteur == 0) {
            newLike = likeI + 1;
            compteur++;

         } else {
            newLike = likeI - 1;
            compteur--;
         }
         allLikes[i].innerHTML = newLike;
         const newLikes1 = document.querySelectorAll(".like");
         let sommeLikes = 0;
         for (let i = 0; i < newLikes1.length; i++) {
            let likeIncrementer = parseInt(newLikes1[i].innerHTML);
            sommeLikes = sommeLikes + likeIncrementer;
         }
         const sommelikesInitiale = document.querySelector(".all-likes");
         sommelikesInitiale.innerHTML = sommeLikes
     
      })
   }
}
 function getChildNodesModal() {
   return contact_modal.childNodes;
 }
   
 if (window.location.href.includes("photographer.html")) {
   document.addEventListener("keydown", function (event) {
     //verifier si dans le style modal la proprieté display a la valeur block
     if (getComputedStyle(contact_modal).getPropertyValue("display") !== "none") {
       const isTabPressed = event.key === "Tab" || event.key === 9;
       const isArrowPressed =
         event.key === "ArrowRight" ||
         event.key === 39 ||
         event.key===27||
         event.key==="Escape"||
         event.key === "ArrowLeft";
       // si keydown est "ArrowRight" ou "ArrowLeft" envoie "event" au function "navigateWithArrows" sur modal
       if (isArrowPressed) {
         navigateWithArrows(event);
       }
        
       if (!isTabPressed) {
         return;
       }
       // Number of Nodes when Tab is pressed
       const focusableElementsCount = getChildNodesModal().length;
       let focusableElementsSelector;
       // Nodes focusables : Contact Form & LightBox without Video
       if (focusableElementsCount === 3) {
         // Elements that can be focusable
         focusableElementsSelector =
           'button,input,textarea,[tabindex]:not([tabindex="-1"])';
       }
       // Nodes focusables : LightBox with Video
       else if (focusableElementsCount === 4) {
         focusableElementsSelector = '[tabindex="0"]:not(h1,img,.hidden)';
       }
       // First focusable Element from the list of node
       const firstFocusableElement = contact_modal.querySelectorAll(focusableElementsSelector)[0];
       // NodeList of all elements
       const focusableContent = contact_modal.querySelectorAll(
         focusableElementsSelector
       );
       // Last focusable Element
       const lastFocusableElement =
         focusableContent[focusableContent.length - 1];
 
       // Send "event" and "first - last" Focusable elements
       navigateFocusableElements(event,firstFocusableElement,lastFocusableElement);
     } else {
       // When modal is display none, navigate with keyboard arrows on photographer page
       navigateWithArrows(event);
     }
   });
   // The first focusable element of each modal
   const firstFocusableElement =
   contact_modal.querySelectorAll('[tabindex="0"]')[0];
   // Focus on first element
   if (firstFocusableElement) {
     firstFocusableElement.focus();
   }
 } 
 /**
  * la fonction qui met des focus sur les elements
  * with TAB
  * @param {object} event
  * @param {object} firstFocusableElement
  * @param {object} lastFocusableElement
  */
 function navigateFocusableElements(event,firstFocusableElement,lastFocusableElement) {
   // if shift + tab pressed
   if (event.shiftKey) {
     if (document.activeElement === firstFocusableElement) {
       // add focus for the last focusable element
       lastFocusableElement.focus();
       // empécher l'evenement par defaut qui peut se produire par tab
       event.preventDefault();
     }
   } else {
     // if tab key is pressed
     if (document.activeElement === lastFocusableElement) {
       // si le focus a accé à last focusable element alors focus first focusable element aprés est pressing tab
       firstFocusableElement.focus();
       event.preventDefault();
     }
   }
 }
 //variable qui incremente et decremente sur toute la page photographer 
 let focusIndex = -1;
 /**
  * fonction pour naviguer dans photographer page avec le clavier
  * @param {object} event
  */
 function navigateWithArrows(event) {
   let focusableElements;
   if (getComputedStyle(contact_modal).getPropertyValue("display") === "none" && getComputedStyle(leigthBoxModal).getPropertyValue("display") === "none") {
     // Naviguer sur photographer page avec keyboard arrows
     const bodyElementPhotographer = document.getElementsByTagName("body")[0];
     
     //creer le tableau de html element pour realiser la condition      
     focusableElements = Array.from(bodyElementPhotographer.querySelectorAll('[tabindex="0"]:not(#contact_modal [tabindex="0"])'));
         
   } else if(getComputedStyle(contact_modal).getPropertyValue("display") === "block") {
     focusableElements = Array.from(contact_modal.querySelectorAll('img,button,input,textarea,[tabindex]:not([tabindex="-1"])'));
     
    }else if(getComputedStyle(leigthBoxModal).getPropertyValue("display") === "block"){
      focusableElements = Array.from(leigthBoxModal.querySelectorAll('img,button,[tabindex]:not([tabindex="-1"])'));
      
    }     
        if (event.key === "ArrowRight" || event.key === 39) {          
          focusIndex++;
          focusIndex =
            ((focusIndex % focusableElements.length) + focusableElements.length) %
            focusableElements.length;
          focusableElements[focusIndex].focus();
        }
          if (event.key === "ArrowLeft" || event.key === 37) {
            focusIndex--;
            focusIndex =
              ((focusIndex % focusableElements.length) + focusableElements.length) %
              focusableElements.length;
            focusableElements[focusIndex].focus();
          }
     if (event.key==="Enter" || event.key === 13) {       
        let focusableElements
       if(event.target.classList.contains("conteneur-photo")){
        focusableElements=Array.from(document.querySelectorAll(".conteneur-photo"))
        const X= focusableElements.indexOf(event.target)
          
        leigthBoxModal.style.display = "block";
        modal2.style.backgroundColor = "beige";
         mainWrapper.style.display="none"         
            showSlides(X)    
       } else if(event.target.classList.contains("contacter_moi")){        
         displayModal1() 
           
       }
                
  }
    if (event.key==="Escape" || event.key === 27) {    
        if(event.target.classList.contains("img-fermer")){                     
          closeModal()
          closeLeigthBox()
      }
      }   
 }
//la fonction qui initialise les données et récupere les data
async function init() {
   // Récupère les datas des photographes et les medias

   const { photographers, media } = await index.getPhotographers();
  
   let params = new URLSearchParams(window.location.search);
   let idphotographe = params.get('identite');
   const photographe = photographers.find((userphotograph) => userphotograph.id == parseInt(idphotographe));

   const namephotographer = photographe.name;
   const pricePhotogragher = photographe.price;
   const mediaId = media.filter((userphotograph) => userphotograph.photographerId == parseInt(idphotographe));

   displayDataPhotographer(photographe, mediaId, namephotographer);

   displayDataMedia(mediaId, namephotographer, 1, pricePhotogragher);

   displayModal(mediaId, namephotographer);
   displayLikes(pricePhotogragher);
   displayleightbox(mediaId, namephotographer);

}
init();