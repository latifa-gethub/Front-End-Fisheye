//Mettre le code JavaScript lié à la page photographer.html

import * as index from "./index.js" 

//les elements de DOM
const modal=document.querySelector(".modal"); 
const contactModal = document.getElementById("contact_modal");
const fermerModal=document.querySelector(".img-fermer");
           
async function displayDataPhotographer(photographe,media,name){ 
      
    const photographHeader=document.querySelector(".photograph-header");
      
       const photograph=photographerTemplate(photographe);
       const photographCartDOM=photograph.getGraphersCartDOM();
       photographHeader.appendChild(photographCartDOM); 
   //pour trier la liste    
       const bouttonTrier=document.querySelector(".boutton-trier");
       const trier=document.querySelector(".trier");
       const chevron=document.querySelector(".fa-chevron-down"); 
           
       const ul=document.querySelector("ul");
       function lunchList(){          
          ul.classList.toggle("show");           
          chevron.style.transform="rotate(180deg)";
       }
        trier.addEventListener("click",lunchList); 
const dateList=document.querySelectorAll(".liste"); 
 
for(let i=0;i<dateList.length;i++){
dateList[i].addEventListener("click",function (){
    const recupBoutton=bouttonTrier.textContent;
 let choixTri;
   
   if(dateList[i].textContent==="Popularité"){
    choixTri=1
    
   }else if(dateList[i].textContent==="Date"){
      choixTri=2;        
   }else{
         choixTri=3;            
   }
   if(choixTri){
     bouttonTrier.textContent=dateList[i].textContent;
     dateList[i].textContent=recupBoutton;
      ul.classList.toggle("show");
       displayDataMedia(media,name,choixTri)
   }
  
}); 
} 
   }
async function displayDataMedia(mediaTrier,name,choixTri,price){  
   
    //trier par choix
     let mediaParChoix=mediaTrier;
      
     if(choixTri==1){
       mediaParChoix=mediaTrier.sort((a,b)=>b.likes-a.likes);
     }else if(choixTri==2){
        mediaParChoix=mediaTrier.sort((a,b)=>new Date(b.date)-new Date(a.date));
     }else if(choixTri==3){
        mediaParChoix=mediaTrier.sort((a,b)=>a.title.localeCompare(b.title,"fr"));
     }
    const photographHeader=document.querySelector(".photograph-header"); 
       const contneur=document.createElement("div");
       contneur.setAttribute("class","conteneur");       
              
       mediaParChoix.forEach((element) => { 
       const mediaId=photographerTemplate(element);
       const mediaCartDOM=mediaId.getMediaCartDOM(name,price);
       contneur.appendChild(mediaCartDOM);
       photographHeader.appendChild(contneur);
        
    })    
    
    //leightbox
    const photographie=document.querySelectorAll(".conteneur-photo"); 
     
        for(let i=0;i<photographie.length;i++){         
        photographie[i].addEventListener(`click`,function(){              
             //const photographieId=photographie[i].dataset.id;              
                contactModal.style.display = "block";                
                modal.style.backgroundColor="beige";
                fermerModal.style.Color="#901C1C";
                const myform=document.querySelector("#Myform");             
                myform.style.display="none";
                const div=document.querySelector(".contenerTitleName");
                div.style.display="none";
                
                displayleightbox(mediaTrier,name);                              
        });            
        }             
      }
   async function displayModal(photographe,name){ 
  
    const headerContact=document.querySelector(".Contactez-moi");
      
       const photograph=photographerTemplate(photographe);
       const headerNameCartDOM=photograph.getModalCartDOM(name);       
       headerContact.appendChild(headerNameCartDOM);     
   }
   async function displayleightbox(mediaid,namephotographer){       
           
         if(document.querySelector(".contnerSlider")){
           modal.removeChild(document.querySelector(".contnerSlider"))
         }
          const contnerSlider=document.createElement("div");       
          contnerSlider.setAttribute("class","contnerSlider");         
       
            mediaid.forEach((media)=>{
            const templateBox=photographerTemplate(media);     
            const leightboxCarteDOM=templateBox.getLeightboxDOM(media,namephotographer);      
            contnerSlider.appendChild(leightboxCarteDOM);    
            })
            modal.innerHTML+='<button class="btn btn_precedent" ><</button><button class="btn btn_next" >></button>';
               
            modal.appendChild(contnerSlider);
            
               //evenement au click sur le bouton
            const buttonPrecedent=document.querySelector(".btn_precedent");
            const buttonNext=document.querySelector(".btn_next");
            let slideIndex=1;
            //showSlides(slideIndex);
            //let n=1;
            buttonPrecedent.addEventListener("click",function(){
                  showSlides(slideIndex--);
            });
            buttonNext.addEventListener("click",function(){
               showSlides(slideIndex++);
         }); 
         //au click sur courrent image 
         const photographie=document.querySelectorAll(".affichage");  
            
               for(let i=0;i<photographie.length;i++){                  
               photographie[i].addEventListener(`click`,function(){
                  console.log(i);         
                  
                  showSlides(i);
               })}     
          
            function showSlides(n){
                  console.log(n);
               const sliders=document.querySelectorAll(`.slider`);
                  
               if(n<1){slideIndex=sliders.length+1}
               if(n>=sliders.length){slideIndex=1}
               for(let i=0;i<sliders.length;i++){
               sliders[i].style.display="none";
               }
               sliders[slideIndex].style.display = "block";  
            }      
   }
   async function displayLikes(price){
   const contnerLikes=document.createElement("article");
   const contneur=document.querySelector(".conteneur");
   console.log(contneur);
   contnerLikes.setAttribute("class","contener-likes");
   console.log(contnerLikes);       
         const allLikes=document.querySelectorAll(".like");       
         let sommeLikes=0;
         for(let i=0;i<allLikes.length;i++){
           let premierLike=parseInt(allLikes[i].innerHTML);
           sommeLikes=sommeLikes+premierLike;        
         }
         console.log(sommeLikes);
      const likesTemplate=photographerTemplate(sommeLikes);
      const likeCarteDOM=likesTemplate.getLikesCarteDOM(sommeLikes,price);
      contnerLikes.appendChild(likeCarteDOM);
contneur.appendChild(contnerLikes);
 
      //event au click sur les icon-like
      const iconHeart=document.querySelectorAll(".fa-heart");      

       for(let i=0;i<iconHeart.length;i++){
         let compteur=0;
          iconHeart[i].addEventListener("click",function(){            
              let likeI=parseInt(allLikes[i].innerHTML);
              let newLike;
              if(compteur==0){
                   newLike=likeI+1;
                   compteur++;                 
                  
              } else{
               newLike=likeI-1;
               compteur--;               
              }              
            allLikes[i].innerHTML=newLike;           
              const newLikes1=document.querySelectorAll(".like");       
              let sommeLikes=0;
              for(let i=0;i<newLikes1.length;i++){
                let likeIncrementer=parseInt(newLikes1[i].innerHTML);
                sommeLikes=sommeLikes+likeIncrementer;                      
              } 
              const sommelikesInitiale=document.querySelector(".all-likes");
              sommelikesInitiale.innerHTML=sommeLikes
              console.log(sommeLikes);  
       })
       }    
    }
   async function init() {
    // Récupère les datas des photographes

    const {photographers,media} = await index.getPhotographers();
    let params = new URLSearchParams(window.location.search);
    let idphotographe = params.get('identite');    
    const photographe=photographers.find((userphotograph)=>userphotograph.id==parseInt(idphotographe));

    const namephotographer=photographe.name;        
    const pricePhotogragher=photographe.price; 
    const mediaId=media.filter((userphotograph)=>userphotograph.photographerId==parseInt(idphotographe));
     
    displayDataPhotographer(photographe,mediaId,namephotographer);  
    
    displayDataMedia(mediaId,namephotographer,1,pricePhotogragher);

    displayModal(mediaId,namephotographer);
    displayLikes(pricePhotogragher);
    
     
}
init();