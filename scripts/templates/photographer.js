function photographerTemplate(data) {
  
    const { name,id, portrait,city,country,tagline,price } = data;
    const { photographerId, title,image,likes,date ,video} = data;
    
    const picture = `./assets/Sample Photos/Photographers ID Photos/${portrait}`;
      //const images= `./assets/Sample Photos/Photographers ID Photos/${image}`;

    function getUserCardDOM() {
      
        const article = document.createElement( 'article' );
        const lien=document.createElement(`a`)         
         
        lien.setAttribute("href",`photographer.html?identite=${id}`);
        lien.setAttribute("class","lien-photograph")
        lien.setAttribute("aria-label","lien vers page de photographe");
        lien.setAttribute("tabindex","0"); 
        const img = document.createElement( 'img' ); 
        img.setAttribute("src", picture);
        img.setAttribute("role","link-image");
        img.setAttribute("alt",`portrait de${name}`);
        img.setAttribute("aria-label","image lien vers portrait photographe");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3=document.createElement("h3");
        h3.className="city";
        h3.textContent= `${city}, ${country}`;
       const h3Tagline=document.createElement("h3");
       h3Tagline.className="h3tagline";

       h3Tagline.textContent=tagline;
      
       const h4=document.createElement("h4");
       h4.textContent=`${price}€/jour`        
       
        lien.appendChild(img);
        article.appendChild(lien);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h3Tagline);
        article.appendChild(h4); 
        return (article);
       
    }    
    /**
     * function qui crée les element de Dom de header
     * @returns article qui contient tous les element de header
     */ 
    function getGraphersCartDOM(){
             
         const article=document.createElement(`article`);
         const div=document.createElement("div");
         const divGlobal=document.createElement("div");
         divGlobal.setAttribute("class","div-global");
         divGlobal.setAttribute("aria-label","information photographe et contact");
         div.setAttribute("class","info-photograph");
         const divImg=document.createElement("div");
         divImg.setAttribute("class","div-img"); 
         
         //nom
        const nom=document.createElement("h1");
        nom.setAttribute("tabindex","0");
         nom.textContent=name;
         //ville
         const ville=document.createElement("h2");
         ville.setAttribute("tabindex","0");
         ville.textContent=`${city},${country}`;         
         //tagline
         const taglineTitre=document.createElement("h3"); 
         taglineTitre.setAttribute("tabindex","0");                
         taglineTitre.textContent=tagline;
         //boutton
         const boutton=document.createElement("button");
         boutton.textContent="Contactez moi"
         boutton.setAttribute("class","contact_button contacter_moi");
         boutton.setAttribute("type","button");
         boutton.setAttribute("role","bouton-ouvre le formulaire de contact");
         boutton.setAttribute("aria-label","contactez moi,remplire le formulaire");
         boutton.setAttribute("tabindex","0");

         //boutton.setAttribute("aria-pressed","true");
         boutton.setAttribute("onclick","displayModal()");
         //span pour le boutton
         boutton.innerHTML+=`<span class="sp-boutton">ouvrir et remplir le formulaire</span>`;
         //image
         const img = document.createElement( 'img' );
         img.setAttribute("tabindex","0");          
         img.setAttribute("class","img-portrait") 
         img.setAttribute("src", picture);
         img.setAttribute("alt",`portrait de ${name}`);
          //titre Trier par            
           const conteneurTrier=document.createElement("div");           
           conteneurTrier.setAttribute("class","conteneur-trier");
           conteneurTrier.setAttribute("aria-label","trier les media");
           conteneurTrier.innerHTML+=`<p>Trier par</p><div class="list" aria-haspopup="true" aria-expanded="false"><div class="trier" tabindex="0" aria-label="trier les medias"><button class="boutton-trier">Popularité</button><i class="fa-solid fa-chevron-down"></i></div><ul class="date_titre" role="menutrier" aria-label="trier les medias"><li class="liste"  role="trier" aria-label="trier par date" tabindex="0">Date</li><li class="liste" role="trier" aria-label="trier par titre" tabindex="0">Titre</li></ul></div>`;
                      
         div.appendChild(nom);         
        div.appendChild(ville);
        div.appendChild(taglineTitre);
        divGlobal.appendChild(div);
        divGlobal.appendChild(boutton);
        divImg.appendChild(img);
        divGlobal.appendChild(divImg);
        article.appendChild(divGlobal);
        article.appendChild(conteneurTrier);
         
        return (article);
    }
    /**
     * 
     * @param {name photographe} name 
     * @param {index de l'attribut tabindex} index 
     * @returns article qui content tous les media du photographe
     */
    function getMediaCartDOM(name,index){
      
        const firstname=name.split(" ");         
        const first=firstname[0].replace("-"," ");          
        let namefolder=firstname[0];
            if(first){
                namefolder=first;
            }       
         const images = `../../assets/Sample Photos/${namefolder}/${image}`;
         const videos = `../../assets/Sample Photos/${namefolder}/${video}`;
       
        const verifierArticle=document.querySelector(".conteneur-photo");
        const divParent=document.querySelector(".conteneur");
        if(verifierArticle){
          divParent.remove(verifierArticle);  
        }
         //creer un article pour tous les photo
          const article=document.createElement("article");
          article.setAttribute("class","conteneur-photo");         
            
          if(image){
            const divImg=document.createElement("div");
            const img=document.createElement("img");
            img.setAttribute("class","affichage images");
            img.setAttribute("data-id",id);
            const nameImage=image.replace("."," ");
            const nameI=nameImage.split(" ");
             
                img.setAttribute("alt",`image de ${nameI[0]} qui ouvre une leightbox`);
            img.setAttribute("src",images);
             divImg.appendChild(img);
             divImg.setAttribute("class","div-img-media");
             article.appendChild(divImg);
             //creer un div qui contient titre, like et icone
             const div=document.createElement("div");
             const divLikeIcone=document.createElement(`div`);
             divLikeIcone.setAttribute("class","div-like-icon");
             div.setAttribute("class","titre-like"); 
             article.appendChild(div);        
            //creer un element titre
            const titre=document.createElement(`h3`);
            titre.textContent=title;
            div.appendChild(titre);
            //creer un element like
            const like=document.createElement(`h4`);            
            like.textContent=likes;
            like.setAttribute("class","like");  
            divLikeIcone.appendChild(like);                          
            divLikeIcone.innerHTML+=`<i class="fa-solid fa-heart" title="pour mettre un like sur l'image" tabindex=0></i>`;
            div.appendChild(divLikeIcone);
             
          }else if(video){
           const  video=document.createElement("video");
           //video.controls=true;
            video.setAttribute("src",videos);
            video.innerHTML=`<source src=${videos} type="video/mp4"/><track kind="subtitles" srclang="fr" />`;
            video.setAttribute("class","affichage video_photographie");
            const lienVideo=document.createElement(`a`);
             
            lienVideo.setAttribute("href",videos);
            //span hidden
            lienVideo.innerHTML+=`<span class="sp-video">lien pour la video<span>"`;
            //video.appendChild(track);
            video.appendChild(lienVideo);
           article.appendChild(video);
           //creer un div qui contient titre, like et icone
           const div=document.createElement("div");
           const divLikeIcone=document.createElement(`div`);
           divLikeIcone.setAttribute("class","div-like-icon");
           div.setAttribute("class","titre-like"); 
           article.appendChild(div);        
          //creer un element titre
          const titre=document.createElement(`h3`);
          titre.textContent=title;
          div.appendChild(titre);
          //creer un element like
          const like=document.createElement(`h4`);
          
          like.setAttribute("class","like");            
          like.textContent=likes;
          
          divLikeIcone.appendChild(like);                          
          divLikeIcone.innerHTML+=`<i class="fa-solid fa-heart" tabindex=0></i>`;
          div.appendChild(divLikeIcone);
          }          
          return article
    }
    /**
     * 
     * @param {name photographe} name 
     * @returns la div qui contient tous les element du Modal
     */
     function getModalCartDOM(name){
      const contactName=document.createElement("div");
        contactName.setAttribute("class","contenerTitleName");
        const tContact=document.querySelector(".title-contact");      
       const namePh=document.createElement("h3");
       namePh.setAttribute("class","name-photographe");
       namePh.textContent=name ; 
        
        contactName.appendChild(tContact);
        contactName.appendChild(namePh);
       return (contactName);
    } 
    function getLeightboxDOM(media,name){     
      const firstname=name.split(" ");
      const first=firstname[0].replace("-"," ");          
      let namefolder=firstname[0];
          if(first){
              namefolder=first;
          }   
       const images = `../../assets/Sample Photos/${namefolder}/${image}`;
         const videos = `../../assets/Sample Photos/${namefolder}/${video}`;         
       
        const divSlide=document.createElement("div");
        divSlide.setAttribute("class",`slider`);
         
        const imgSlider=document.createElement("img");
        const videoSlider=document.createElement("video");
         if(media.image){
              imgSlider.setAttribute("class","hidden");
              imgSlider.setAttribute("src",images);              
              imgSlider.setAttribute("alt","image carrousel");
              divSlide.appendChild(imgSlider);
         }else if(media.video){
              videoSlider.setAttribute("class","video_leightbox");
              videoSlider.setAttribute("src",videos);
              videoSlider.setAttribute("width","300");
              videoSlider.controls=true;
              videoSlider.setAttribute("alt","image carrousel");
              divSlide.appendChild(videoSlider);
         }
         const titleImage=document.createElement("h2");
         titleImage.textContent=title;
         divSlide.appendChild(titleImage);

                 
        return (divSlide)
    }
    //All likes
    function getLikesCarteDOM(sommeLikes,price){
      const likesPrice=document.createElement("div");      
       likesPrice.setAttribute("class","likes-price");
      likesPrice.innerHTML+=`<div class="likes-icon" role="somme" aria-label="somme likes"><h3 class="all-likes">${sommeLikes}</h3><i class="fa-solid fa-heart" aria-hidden="true"></i></div><h4>${price}€/jour</h4>`
        
       return (likesPrice);
      }
    
    return { name, picture, getUserCardDOM ,getGraphersCartDOM,getMediaCartDOM,getModalCartDOM,getLeightboxDOM,getLikesCarteDOM}
}
