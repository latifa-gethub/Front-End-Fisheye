//Mettre le code JavaScript lié à la page photographer.html

import * as index from "./index.js"

 

async function displayDataPhotographer(photographe,media,name){ 
  
    const photographHeader=document.querySelector(".photograph-header");
      
       const photograph=photographerTemplate(photographe);
       const photographCartDOM=photograph.getGraphersCartDOM();
       photographHeader.appendChild(photographCartDOM); 
       
       const bouttonTrier=document.querySelector(".boutton-trier"); 
       const ol=document.querySelector("ol");
       function lunchList(){          
          ol.classList.toggle("show");            
       }
        bouttonTrier.addEventListener("click",lunchList);
 
const dateList=document.querySelectorAll(".liste"); 
 
for(let i=0;i<dateList.length;i++){
dateList[i].addEventListener("click",function (){
    const recupBoutton=bouttonTrier.textContent;
 let choixTri;

  console.log(dateList[i].textContent)
   if(dateList[i].textContent==="Popularité"){
    choixTri=1
    
   }else if(dateList[i].textContent==="Date"){
      choixTri=2
        
   }else{
         choixTri=3;
            
   }
   if(choixTri){
     bouttonTrier.textContent=dateList[i].textContent;
   dateList[i].textContent=recupBoutton;
 ol.classList.toggle("show");
       displayDataMedia(media,name,choixTri)
   }
  
}); 
} 
   }
async function displayDataMedia(mediaTrier,name,choixTri){
     let mediaParChoix=mediaTrier;
     if(choixTri==1){
       mediaParChoix=mediaTrier.sort((a,b)=>b.likes-a.likes);
     }else if(choixTri==2){
        mediaParChoix=mediaTrier.sort((a,b)=>b.date-a.date);
     }else if(choixTri==3){
        mediaParChoix=mediaTrier.sort((a,b)=>a.title.localeCompare(b.title,"fr"));
     }
    const photographHeader=document.querySelector(".photograph-header");
 
       const contneur=document.createElement("div");
       contneur.setAttribute("class","conteneur");
       
             console.log(mediaParChoix);
       mediaParChoix.forEach((element) => { 
       const mediaId=photographerTemplate(element);
       const mediaCartDOM=mediaId.getMediaCartDOM(name);
       contneur.appendChild(mediaCartDOM);
       photographHeader.appendChild(contneur);
    })    

   }
   
   async function init() {
    // Récupère les datas des photographes

    const {photographers,media} = await index.getPhotographers();
    let params = new URLSearchParams(window.location.search);
    let idphotographe = params.get('identite');
   
    const photographe=photographers.find((userphotograph)=>userphotograph.id==parseInt(idphotographe));
    const namephotographer=photographe.name; 
      
     
    // console.log(namephotographer)
     
    const mediaId=media.filter((userphotograph)=>userphotograph.photographerId==parseInt(idphotographe));
    displayDataPhotographer(photographe,mediaId,namephotographer);  
    
    displayDataMedia(mediaId,namephotographer,1);

      
}
init();