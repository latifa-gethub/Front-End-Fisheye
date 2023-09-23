//Mettre le code JavaScript lié à la page photographer.html

import * as index from "./index.js"

//les elements de DOM
const modal = document.querySelector(".modal");
const modal2=document.querySelector(".modal2");
const contactModal = document.getElementById("leightbox_modal");

const fermerModal = document.querySelector(".img-fermer");

const boutonContacterMoi=document.querySelector(".contacter_moi");

/**
 * 
 * @param {*} photographe 
 * @param {*} media 
 * @param {*} name 
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
      console.log(mediaCartDOM)
      mediaCartDOM.setAttribute("tabindex",0)
      contneur.appendChild(mediaCartDOM);
      photographHeader.appendChild(contneur);

   })

   //leightbox
   const photographie = document.querySelectorAll(".conteneur-photo");

   for (let i = 0; i < photographie.length; i++) {
      photographie[i].addEventListener(`click`, function () {
         //const photographieId=photographie[i].dataset.id; 
         console.log(contactModal);             
         contactModal.style.display = "block";
         modal.style.backgroundColor = "beige";
         modal2.style.backgroundColor = "beige";
        // const myform = document.querySelector("#Myform");
         //myform.style.display = "none";
        // const div = document.querySelector(".contenerTitleName");
        // div.style.display = "none";
         //displayleightbox(mediaTrier, name);
         showSlides(i)
      });
   }
}
async function displayModal(photographe, name) {

   const headerContact = document.querySelector(".Contactez-moi");

   const photograph = photographerTemplate(photographe);
   const headerNameCartDOM = photograph.getModalCartDOM(name);
   headerContact.appendChild(headerNameCartDOM);
}
async function displayleightbox(mediaid, namephotographer) {

   if (document.querySelector(".contnerSlider")) {
      modal.removeChild(document.querySelector(".contnerSlider"))
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

   //evenement au click sur le bouton
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
   //au click sur courrent image 
   const photographie = document.querySelectorAll(".affichage");
   const listPopularite=document.querySelector(".list")
   console.log(listPopularite)
   for (let i = 0; i < photographie.length; i++) {
      photographie[i].addEventListener(`click`, function () {
         showSlides(i);
        listPopularite.style.zIndex=0;
      })
   }

}

function showSlides(n) {
   console.log(n);
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
async function displayLikes(price) {
   const contnerLikes = document.createElement("article");
   const contneur = document.querySelector(".conteneur");
   console.log(contneur);
   contnerLikes.setAttribute("class", "contener-likes");
   console.log(contnerLikes);
   const allLikes = document.querySelectorAll(".like");
   let sommeLikes = 0;
   for (let i = 0; i < allLikes.length; i++) {
      let premierLike = parseInt(allLikes[i].innerHTML);
      sommeLikes = sommeLikes + premierLike;
   }
   console.log(sommeLikes);
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
         console.log(sommeLikes);
      })
   }
}

/*document.addEventListener("keydown",(event) => {
     const nomTouche = event.key;

     if (nomTouche === 39) {
       // Pas d'alerte si seule la touche Control est pressée.
       return;
     }
     if (event.ctrlKey) {
       // Même si event.key n'est pas 'Control' (par ex., 'a' is pressed),
       // event.ctrlKey peut être true si la touche Ctrl est pressée dans le même temps.
       alert(`Combinaison de ctrlKey + ${nomTouche}`);
     } else {
       alert(`Touche pressée ${nomTouche}`);
     }
   },
   false,
 );*/

 function getChildNodesModal() {
   return contactModal.childNodes;
 }
   
 if (window.location.href.includes("photographer.html")) {
   document.addEventListener("keydown", function (event) {
     // Verify if in the list of style modal a property display have value block on page
     if (getComputedStyle(contactModal).getPropertyValue("display") !== "none") {
       const isTabPressed = event.key === "Tab" || event.key === 9;
       const isArrowPressed =
         event.key === "ArrowRight" ||
         event.key === 39 ||
         event.key === "ArrowLeft";
       // If a keydown is "ArrowRight" or "ArrowLeft" send "event" to the function "navigateWithArrows" in modal
       if (isArrowPressed) {
         navigateWithArrows(event);
       }
       // if tab not pressed go out
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
       const firstFocusableElement = contactModal.querySelectorAll(
         focusableElementsSelector
       )[0];
       // NodeList of all elements
       const focusableContent = contactModal.querySelectorAll(
         focusableElementsSelector
       );
       // Last focusable Element
       const lastFocusableElement =
         focusableContent[focusableContent.length - 1];
 
       // Send "event" and "first - last" Focusable elements
       navigateFocusableElements(
         event,
         firstFocusableElement,
         lastFocusableElement
       );
     } else {
       // When modal is display none, navigate with keyboard arrows on photographer page
       navigateWithArrows(event);
     }
   });
   // The first focusable element of each modal
   const firstFocusableElement =
     contactModal.querySelectorAll('[tabindex="0"]')[0];
   // Focus on first element
   if (firstFocusableElement) {
     firstFocusableElement.focus();
   }
 }
 
 /**
  * Function to get focus on the elements
  * with TAB
  * @param {object} event
  * @param {object} firstFocusableElement
  * @param {object} lastFocusableElement
  */
 function navigateFocusableElements(
   event,
   firstFocusableElement,
   lastFocusableElement
 ) {
   // if shift + tab pressed
   if (event.shiftKey) {
     if (document.activeElement === firstFocusableElement) {
       // add focus for the last focusable element
       lastFocusableElement.focus();
       // Prevent the default behavior of Tab, scrolling down in the page
       event.preventDefault();
     }
   } else {
     // if tab key is pressed
     if (document.activeElement === lastFocusableElement) {
       // if focused has reached to last focusable element then focus first focusable element after pressing tab
       firstFocusableElement.focus();
       event.preventDefault();
     }
   }
 }
 
 // Variable to increment or decrement focus for all page photographer
 let focusIndex = -1;
 /**
  * Function to navigate on photographer page with keyboard arrows
  * @param {object} event
  */
 function navigateWithArrows(event) {
   let focusableElements;
   if (getComputedStyle(contactModal).getPropertyValue("display") === "none") {
     // Navigation on photographer page with keyboard arrows
     const bodyElementPhotographer = document.getElementsByTagName("body")[0];
     // Creer array of HTML Element which fulfills the condition
     focusableElements = Array.from(
       bodyElementPhotographer.querySelectorAll(
         '[tabindex="0"]:not(#contact_modal [tabindex="0"])'
       )
     );
   } else {
     focusableElements = Array.from(
       contactModal.querySelectorAll(
         'button,input,textarea,[tabindex]:not([tabindex="-1"])'
       )
     );
   }
   const liImage = document
     .getElementById("contact_modal")
     .querySelectorAll(".conteneur-photo");
 
   if (liImage.length === 0) {
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
        focusableElements=Array.from(document.querySelectorAll(".conteneur-photo"))
         
        const X= focusableElements.indexOf(event.target)
          
          contactModal.style.display = "block";
           
            fermerModal.style.Color = "#901C1C";
            const myform = document.querySelector("#Myform");
            myform.style.display = "none";
            const div = document.querySelector(".contenerTitleName");
            div.style.display = "none";
            
            showSlides(X)       
          /** */   
         
    }
   }
 }


async function init() {
   // Récupère les datas des photographes

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