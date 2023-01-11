RecupLocalStorage(); 

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