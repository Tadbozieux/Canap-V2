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
  e.preventDefault()
})
  
  
let inputPrenom = document.querySelector('#firstName'); //declaration emplacement input
inputPrenom.addEventListener('change', function() {   // ecoute de l'input
  const prenomRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/    // caracteres limitation par Regex
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")  //
  let controlePrenom = prenomRgex.test(inputPrenom.value);
  if (controlePrenom) {           // si test regex OK =>
      firstNameErrorMsg.innerText = '';  // pas de message d'erreur
      errorFormulairePrenom = false;
  } 
  else {   // Si test Regex negatif  on stop l'envoi formulaire et message d'erreur apparait sous champs problematique
      firstNameErrorMsg.innerText = 'Veuillez indiquer un Prenom, Lettres uniquement !.';
      errorFormulairePrenom = true;
      firstNameErrorMsg.style.color = "red"
      firstNameErrorMsg.style.fontSize = "x-large"
  }
});

let inputNom = document.querySelector('#lastName');
inputNom.addEventListener('change', function() {
  const nomRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
  let nomErrorMsg = document.getElementById("lastNameErrorMsg")
  let controlenom = nomRgex.test(inputNom.value);
  if (controlenom) {
      nomErrorMsg.innerText = '';
      errorFormulaireNom = false;
  } 
  else {
      nomErrorMsg.innerText = 'Veuillez indiquer un Nom, Lettres uniquement !.';
      errorFormulaireNom = true;
      nomErrorMsg.style.color = "red"
      nomErrorMsg.style.fontSize = "x-large"
  }
});




let inputAdresse = document.querySelector('#address');
inputAdresse.addEventListener('change', function() {
  const adresseRgex = /^[0-9]{1,3}(?![\s.]+$)[a-zA-Z\s\-'.]+$/
  let adresseErrorMsg = document.getElementById("addressErrorMsg")
  let controleadresse = adresseRgex.test(inputAdresse.value);
  if (controleadresse) {
    adresseErrorMsg.innerText = '';
    errorFormulaireadresse = false;
    
  } 
  else {
    adresseErrorMsg.innerText = 'Veuillez sair un numéro et un nom de voie !.';
    errorFormulaireadresse = true;
    adresseErrorMsg.style.color = "red"
    adresseErrorMsg.style.fontSize = "x-large"
  }
});



let inputVille = document.querySelector('#city');
inputVille.addEventListener('change', function() {
const villeRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/
let villeErrorMsg = document.getElementById("cityErrorMsg")
  let controleVille = villeRgex.test(inputVille.value);
  if (controleVille) {
    villeErrorMsg.innerText = '';
    errorFormulaireVille = false;
  } 
  else {
    villeErrorMsg.innerText = 'Veuillez sair votre localité !';
    errorFormulaireVille = true;
    villeErrorMsg.style.color = "red"
    villeErrorMsg.style.fontSize = "x-large"
  }
})


let inputEmail = document.querySelector('#email');
inputEmail.addEventListener('change', function() {
const emailRgex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
let emailErrorMsg = document.getElementById("emailErrorMsg")
  let controleEmail = emailRgex.test(inputEmail.value);
  if (controleEmail) {
    emailErrorMsg.innerText = '';
    errorFormulaireEmail = false;
  } 
  else {
    emailErrorMsg.innerText = 'Veuillez sair votre email (doit contenir "@").';
    errorFormulaireEmail = true;
    emailErrorMsg.style.color = "red"
    emailErrorMsg.style.fontSize = "x-large"
  }
})







// if (!inputNom.value){
//   erreur = "Veuillez rentrer votre Nom de Famille !";
// }

// if (!inputAdresse.value){
//   erreur = "Veuillez rentrer votre Adresse Postale !";
// }

// if (!inputVille.value){
//   erreur = "Veuillez rentrer votre Ville !";
// }

// if (!inputEmail.value){
//   erreur = "Veuillez rentrer votre Email !";
// }

// if (erreur){
//   e.preventDefault();
//   document.getElementById("firstNameErrorMsg").innerHTML = erreur
// }else{
//   alert("Formulaire envoyé !")
// } 









