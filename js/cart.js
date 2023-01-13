RecupLocalStorage(); 
const cart = []
function RecupLocalStorage() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    let item = localStorage.getItem(localStorage.key(i));
    // console.log("objet a la position " , i, "est", item) //donnes les items de JSON
     const objetitem = JSON.parse(item); //transforme JSON en Objet  (inverse JSON.stringify)
     console.log(objetitem)
    addProducts(objetitem)
    
  }
}


function addProducts(donnees){

  donnees.map((canap) => {
    // incorporation du HTML

    document.querySelector("#cart__items").innerHTML += `
        <article class="cart__item" data-id="${canap.id}" data-color="${canap.color} data-quantity="${canap.quantity}" data-price="${canap.price}">
        <div class="cart__item__img">
          <img src="${canap.imageUrl}" alt="${canap.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${canap.name}</h2>
            <p>${canap.color}</p>
            <p>${canap.price}  € </p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${canap.id}" data-color="${canap.color}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>      
            `
  });

  
}


///////////////////////// calcul quantité et prix total   /////////////////////////

// totalCart()


// function totalCart() {
//   // Déclaration des variables
//   let totalProducts = 0
//   let totalPrice = 0
  
//   const purchases = document.querySelectorAll(".cart__item")
//  console.log(purchases);
 
//   purchases.forEach((value) => {
      
//       totalProducts += Number(document.querySelector(".itemQuantity").value)
      
    
//   });
//   // Affichage des résultats dans le HTML
//   document.getElementById("totalQuantity").textContent = totalProducts
//   document.getElementById("totalPrice").textContent = totalPrice
//   console.log(typeof totalProducts);
// }



// function totalCart() {
//   // Déclaration des variables
//   let totalProducts = 0
//   let totalPrice = 0
//   petittotal = document.getElementsByClassName("itemQuantity")
//   console.log(petittotal);
//   const purchases = document.querySelectorAll(".cart__item")
  
 
//   for (let i=0; i < purchases.length; i++){
      
//     totalProducts += petittotal[i]
      
//   };
//   // Affichage des résultats dans le HTML
//   document.getElementById("totalQuantity").textContent = totalProducts
//   document.getElementById("totalPrice").textContent = totalPrice
//   console.log(typeof totalProducts);
// }


///////////////////////// calcul quantité et prix total   /////////////////////////


///////////////////////// Formulaire /////////////////////////

//    Indications emplacement formulaire et codes Rgex//

const ValidationFormulaire = document.querySelector(".cart__order__form")
ValidationFormulaire.addEventListener("submit", function(e){
  
  

let erreur;

let inputPrenom = document.querySelector('#firstName');
const prenomRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/

let inputNom = document.querySelector('#lastName');
const nomRgex= /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/

let inputAdresse = document.querySelector('#address');
const adresseRgex = /^[0-9]{1,3}(?![\s.]+$)[a-zA-Z\s\-'.]+$/

let inputVille = document.querySelector('#city');
const VilleRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/

let inputEmail = document.querySelector('#email');
// const emailRgex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$;

if (!inputPrenom.value){
  erreur = "Veuillez rentrer votre prénom !";
}

if (!inputNom.value){
  erreur = "Veuillez rentrer votre Nom de Famille !";
}

if (!inputAdresse.value){
  erreur = "Veuillez rentrer votre Adresse Postale !";
}

if (!inputVille.value){
  erreur = "Veuillez rentrer votre Ville !";
}

if (!inputEmail.value){
  erreur = "Veuillez rentrer votre Email !";
}

if (erreur){
  e.preventDefault();
  document.getElementById("firstNameErrorMsg").innerHTML = erreur
}else{
  alert("Formulaire envoyé !")
} 











})