function photographerTemplate(data) {
   
    const { name,id, portrait,city,country,tagline,price } = data;
    const { photographerId, title,image,likes,date ,video} = data;
     
    const picture = `../../assets/Sample Photos/Photographers ID Photos/${portrait}`;
      

    function getUserCardDOM() {
      
        const article = document.createElement( 'article' );
        const lien=document.createElement(`a`)         
         
        lien.setAttribute("href",`photographer.html?identite=${id}`);
         
        const img = document.createElement( 'img' ); 
        img.setAttribute("src", picture);
        img.setAttribute("alt",`portrait de${name}`);
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
    //const photographHeader=document.querySelector(".photograph-header");


    function getGraphersCartDOM(){        
         const article=document.createElement(`article`);
         const div=document.createElement("div");
         const divGlobal=document.createElement("div");
         divGlobal.setAttribute("class","div-global");
         div.setAttribute("class","info-photograph");
         const divImg=document.createElement("div");
         divImg.setAttribute("class","div-img"); 
         
         //nom
        const nom=document.createElement("h2");
         nom.textContent=name;
         //ville
         const ville=document.createElement("h3");
         ville.textContent=`${city},${country}`;
         
         //tagline
         const taglineTitre=document.createElement("h4");         
         taglineTitre.textContent=tagline;
         //boutton
         const boutton=document.createElement("button");
         boutton.textContent="Contactez moi"
         boutton.setAttribute("class","contact_button");
         boutton.setAttribute("role","button");
         boutton.setAttribute("aria-pressed","true");
         boutton.setAttribute("onclick","displayModal()");
         //image
         const img = document.createElement( 'img' );          
         img.setAttribute("class","img-portrait") 
         img.setAttribute("src", picture);
         img.setAttribute("alt",`portrait de${name}`);
          //titre Trier par
            
           const conteneurTrier=document.createElement("div");           
           conteneurTrier.setAttribute("class","conteneur-trier");
           conteneurTrier.innerHTML+=`<p>Trier par</p><div class="list"><button class="boutton-trier"  >Popularité</button><ol class="ol"><li class="liste">Date</li><li class="liste">Titre</li></ol></div>`;
           
           
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
    function getMediaCartDOM(name){ 
 
 
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
         //creer un article
          const article=document.createElement("article");
          article.setAttribute("class","conteneur-photo");          
 
          if(image){
            const div2=document.createElement("div");

            const img=document.createElement("img");
            img.setAttribute("class","images");
            img.setAttribute("alt","tous les images");
            img.setAttribute("src",images);
             article.appendChild(img);
             //creer un div qui contient titre et like
             const div=document.createElement("div");
             div.setAttribute("class","titre-like"); 
             article.appendChild(div);        
            //creer un element titre
            const titre=document.createElement(`h3`);
            titre.textContent=title;
            div.appendChild(titre);
            //creer un element like
            const like=document.createElement(`h4`);
            
            like.textContent=likes;
             
            div.appendChild(like);
                          
               div.innerHTML+=`<i class="fa-solid fa-heart"></i>`;
             
             
          }else if(video){
           const  video=document.createElement("video");
            video.setAttribute("src",videos);
           article.appendChild(video);
          }
          
          return article
    }
    
    return { name, picture, getUserCardDOM ,getGraphersCartDOM,getMediaCartDOM}
}
