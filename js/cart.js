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
listenToForm()

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

//*--------------------------------------------------------------
//* Écoute des champs "input" du Formulaire de commande
//*--------------------------------------------------------------
function listenToForm() {
  // Formulaire : Bouton "Commander"
  const orderButton = document.querySelector("#order")
  // => Appel de la fonction "submitForm"
  orderButton.addEventListener("click", (e) => submitForm(e))

  // Déclaration + Pointage de l'élément 
  let firstNameField = document.querySelector('#firstName')
  // Écoute d'évènement au niveau de l'input
  firstNameField.addEventListener('input', checkFirstName)

  let lastNameField = document.querySelector('#lastName')
  lastNameField.addEventListener('input', checkLastName)

  let cityField = document.querySelector('#city')
  cityField.addEventListener('input', checkCity)

  let addressField = document.querySelector('#address')
  addressField.addEventListener('input', checkAddress)

  let emailField = document.querySelector('#email')
  emailField.addEventListener('input', checkEmail)
}

//*--------------------------------------------------------------
//* Envoi du Formulaire de commande
//*--------------------------------------------------------------
function submitForm(e) {
  // Récupération du Formulaire valide
  const form = buildForm(e)
  // Si Formulaire invalide : Envoi annulé
  if (form == null) return

  fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
  })
      .then(res => res.json())
      .then(res => {
          console.log("Formulaire de commande : ", res)
          alert("Votre commande a bien été effectuée !")
          window.location.replace(`./confirmation.html?orderId=${res.orderId}`)
      })
      .catch((err) => {
          alert(err.message)
          console.log(err)
      })
}

//*--------------------------------------------------------------
//* Construction du Formulaire de commande
//*--------------------------------------------------------------
function buildForm(e) {
  // Déclaration et pointage des éléments nécéssaires
  const myCart = JSON.parse(localStorage.getItem("Cart"))
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const address = document.getElementById("address").value
  const city = document.getElementById("city").value
  const email = document.getElementById("email").value
  // Constante : Appel des fonctions de validation
  const formValid = checkEmail() && checkAddress() && checkCity() && checkFirstName() && checkLastName()

  // Conditions nécessaires à la validation finale du formulaire
  if (myCart !== null && [firstName, lastName, address, city, email] !== '' && formValid) {

      // Récupération des id(s) Produits du Panier
      const productsIds = []
      myCart.forEach((purchase) => {
          productsIds.push(purchase.id)
      })

      const form = {
          // Objet respectant les attentes de l'API
          contact: {
              firstName: firstName,
              lastName: lastName,
              address: address,
              city: city,
              email: email
          },
          products: productsIds
      }
      return form

  } else {
      console.error("Champs invalides et/ou Panier vide")
      alert("Formulaire invalide et/ou Panier vide.\nNote : TOUS les champs sont requis !")
      e.preventDefault()
  }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Prénom
//*--------------------------------------------------------------
function checkFirstName() {
  let firstNameInput = document.getElementById("firstName")
  let firstNameValidate = document.getElementById("firstName").value
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
  let order = document.getElementById("order")

  const firstNameRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/
  let firstNameResult = firstNameRGEX.test(firstNameValidate)

  if (firstNameResult == false) {
      firstNameInput.style.backgroundColor = "red"      
      firstNameInput.style.color = "white"
      firstNameErrorMsg.innerHTML = `Champ requis :<br>
                                  - "Prénom" ne doit comporter que des lettres<br>
                                  - Tirets et accents sont autorisés`
      firstNameErrorMsg.style.display = "inherit"
      order.disabled = true
      return false
  }
  else {
      firstNameErrorMsg.style.display = "none"
      firstNameInput.style.backgroundColor = "rgb(0, 205, 0)"
      firstNameInput.style.color = "black"
      order.disabled = false
      return true
  }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Nom
//*--------------------------------------------------------------
function checkLastName() {
  let lastNameInput = document.getElementById("lastName")
  let lastNameValidate = document.getElementById("lastName").value
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

  const lastNameRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
  let lastNameResult = lastNameRGEX.test(lastNameValidate)

  if (lastNameResult == false) {
      lastNameInput.style.backgroundColor = "red"
      lastNameInput.style.color = "white"
      lastNameErrorMsg.innerHTML = `Champ requis :<br>
                                  - "Nom" ne doit comporter que des lettres<br>
                                  - Tirets, apostrophes, et accents sont autorisés`
      lastNameErrorMsg.style.display = "inherit"
      return false
  } else {
      lastNameErrorMsg.style.display = "none"
      lastNameInput.style.backgroundColor = "rgb(0, 205, 0)"
      lastNameInput.style.color = "black"
      return true
  }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Adresse
//*--------------------------------------------------------------
function checkAddress() {
  let addressInput = document.getElementById("address")
  let addressValidate = document.getElementById("address").value
  let addressErrorMsg = document.getElementById("addressErrorMsg")

  const addressRGEX = /^[0-9]{1,3}(?![\s.]+$)[a-zA-Z\s\-'.]+$/
  let addressResult = addressRGEX.test(addressValidate)

  if (addressResult == false) {
      addressInput.style.backgroundColor = "red"
      addressInput.style.color = "white"
      addressErrorMsg.innerHTML = "Champ requis<br>Exemple : 7 rue des Fleurs"
      addressErrorMsg.style.display = "inherit"
      return false
  } else {
      addressErrorMsg.style.display = "none"
      addressInput.style.backgroundColor = "rgb(0, 205, 0)"
      addressInput.style.color = "black"
      return true
  }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Ville
//*--------------------------------------------------------------
function checkCity() {
  let cityInput = document.getElementById("city")
  let cityValidate = document.getElementById("city").value
  let cityErrorMsg = document.getElementById("cityErrorMsg")

  const cityRGEX = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
  let cityResult = cityRGEX.test(cityValidate)

  if (cityResult == false) {
      cityInput.style.backgroundColor = "red"
      cityInput.style.color = "white"
      cityErrorMsg.innerHTML = `Champ requis :<br>
                              - "Ville" ne doit comporter que des lettres<br>
                              - Tirets, apostrophes, et accents sont autorisés`
      cityErrorMsg.style.display = "inherit"
      return false
  } else {
      cityInput.style.backgroundColor = "rgb(0, 205, 0)"
      cityInput.style.color = "black"
      cityErrorMsg.style.display = "none"
      return true
  }
}

//*--------------------------------------------------------------
//* Contrôle du Formulaire : Email
//*--------------------------------------------------------------
function checkEmail() {
  let emailInput = document.getElementById("email")
  let emailValidate = document.getElementById("email").value
  let emailErrorMsg = document.getElementById("emailErrorMsg")

  const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  let emailResult = emailRGEX.test(emailValidate)

  if (emailResult == false) {
      emailInput.style.backgroundColor = "red"
      emailInput.style.color = "white"
      emailErrorMsg.innerHTML = `Champ requis<br>Exemple : moi@kanap.com`
      emailErrorMsg.style.display = "inherit"
      return false
  } else {
      emailInput.style.backgroundColor = "rgb(0, 205, 0)"
      emailInput.style.color = "black"
      emailErrorMsg.style.display = "none"
      return true
  }
}