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
function addInformations(kanapé){               //creation variable des composents produit
    const imageUrl = kanapé.imageUrl
    // console.log(imageUrl)
    const name= kanapé.name
    const price = kanapé.price
    const altTxt= kanapé.altTxt
    const colors = kanapé.colors
    const description = kanapé.description
    
    let image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    let parentImg = document.querySelector (".item__img")
    parentImg.appendChild (image)
    nomKanapé = document.querySelector ("#title .h1")
    title.textContent = name
    prixKanapé = document.getElementById ("price")
    prixKanapé.textContent = price
    descriptionKanapé = document.getElementById ("description")
    descriptionKanapé.textContent = description
    const select = document.getElementById ("colors")
    colors.forEach((color) => {                                 //Pour chaque coueleur selon ID
        const option = document.createElement("option")         //créer une option
        option.value = color                                    // dont les choix sonrt les couleurs renseignées
        option.textContent = color
        // console.log(color)
        select.appendChild(option)
    })
    const validationPanier = document.querySelector("#addToCart")
    validationPanier.addEventListener("click", (e) => {
        e.preventDefault();
    
        const color = document.getElementById("colors").value
        const quantity = Number(document.getElementById("quantity").value)
        
        
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
                price: price,
                description: description,
                name: name,
                imageUrl: imageUrl,
                altTxt: altTxt
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




            }         //document.location.href = "cart.html"
        }


    })

} 
     
// controle si local storage vide 
// si oui rajouter item
// si non controler Id     
//     si nouveau id le rajouter
//     sinon controler couleur 
// si nouvelle couleur le rajouter
// sinon cumuler noyuveau nombre avec ancien