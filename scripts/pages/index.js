//recuperer des photographe depuis le fichier json
/**
 * function qui recupere les data
 * @returns tableau d'objet data
 */
async function getPhotographers() {       
    return await fetch("../../data/photographers.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("not ok");
        }
        return response.json();         
    })
    .then((data) => {
        return data;         
    })
    .catch((error) => {
        console.error("error", error);
    });
   
}
//la fonction pour générer la liste des photographes   
async function displayData(photographers) {
   
    const photographersSection = document.querySelector(".photographer_section");
   if(photographersSection!=undefined){
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);          
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
   } 
}
async function init() {
    // Récupère les photographes du data
    const {photographers} = await getPhotographers(); 
        
        displayData(photographers);        
}
init();
 
export {getPhotographers};
 