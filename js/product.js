const queryString = window.location.search;    //https://blog.arcoptimizer.com/obtenir-les-parametres-durl-avec-javascript-2
//console.log (queryString);
const urlParams = new URLSearchParams (queryString);
//console.log (urlParams);
const id = urlParams.get("id")
//console.log (id)
fetch(`http://localhost:3000/api/products/${id}`)   //https://www.youtube.com/watch?v=SJ2oWKEmCoE    /   
    .then((response) => response.json())            //https://stackoverflow.com/questions/35835362/what-does-dollar-sign-and-curly-braces-mean-in-a-string-in-javascript
    .then((json) => {
        // console.log(json)
        return addInformations(json)
    })  
function addInformations(kanape){               //creation variable des composents produit
    document.querySelector(
        ".item__img"
      ).innerHTML = `<img src="${kanape.imageUrl}" alt="${kanape.altTxt}"></img>`;
      document.getElementById("title").textContent = kanape.name;
      document.getElementById("price").textContent = kanape.price;
      document.getElementById("description").textContent = kanape.description;
      kanape.colors.forEach(
        (color) =>
          (document.getElementById(
            "colors"
          ).innerHTML += `<option value="${color}">${color}</option>`)
      );
    
      document.querySelector("#addToCart").addEventListener("click", (e) => {
         e.preventDefault();
    
        const color = document.getElementById("colors").value;
        const quantity = Number(document.getElementById("quantity").value);
        
        
        if (!color  || color === "" || !quantity || quantity < 0 || quantity > 100){
            //Si les conditions ne sont pas correctes emssage erreur:
            alert("Veuillez selectionner une couleur parmis le choix proposé ainsi qu'une quantité comprise entre 1 et 100")
            return
        }else{
            
            // alert("Super choix !")
            
            const key = `${id}-${color}`    //Ici Key prend en compte id ET la Couleur sinon un acheter un meme canapé d'une couleur diff supprimerai la saisie precedente! 
            console.log(key);
            const item = {
                id: id,
                color: color,
                quantity: quantity,
                price: kanape.price,
                description: kanape.description,
                name: kanape.name,
                imageUrl: kanape.imageUrl,
                altTxt: kanape.altTxt
            }
            console.log(`Préparation de ${item.name}:`, item)
            addProductLocalStorage(key)
        
            //Creation de la fontion d'ajout selon le panier:
            
            function addProductLocalStorage(key) {
                
                let myCart = JSON.parse(localStorage.getItem(key))
                console.log(myCart)
                console.log(key)
                if (myCart == null) {     //Si Local storage est vide de données :
                    myCart = []            // creation tableau
                    console.log(myCart)
                    myCart.push(item)       // donnée poussée dans le tableau
                    localStorage.setItem(key, JSON.stringify(myCart))    //local storage avec stingation de l'objet "Item"
                    console.log(myCart); // Confirmation de l'ajout au panier
                    // alert("c'est ajouté")
                    confirmationAdditionPannier ()
                }else if (myCart != null)  {

                    for (i = 0; i < myCart.length; i++) {      //Scan local storage
                        if ((myCart[i].id == item.id) && (myCart[i].color == item.color)) {  // si id produit demandé  ET couleur produit demandé sont presents dans le local storage
                            return (            //alors on renvoi:   

                                // myCart[i].quantity = (myCart[i].quantity + item.quantity), ne se limite pas a 100 donc a oublier
                                myCart[i].quantity = Math.min(myCart[i].quantity + item.quantity,100), 
                                // Math.min permet d'afficher le nbre le plus petit entre 2 valeur donc ici on additionne local storage + le produit choisi pour avoir la quantité total 
                                //et ceci jusqu'a 100, ensuite 100 sera tjs le plus petit donc la valeur max affichée !
                                localStorage.setItem(key, JSON.stringify(myCart)),
                                confirmationAdditionPannier ()
                            )
                        }else{
                            myCart.push(item)       // donnée poussée dans le tableau
                            localStorage.setItem(key, JSON.stringify(myCart))
                            console.log("C");
                        }    
                    }
                    
                } 

                function confirmationAdditionPannier (){
                    alert (`${item.quantity} ${item.name} placé(s) dans votre panier`, item)
                }
            }         document.location.href = "cart.html"
        }


    })

} 
 