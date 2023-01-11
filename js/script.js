fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((json) => {
        console.log(json)
        return addProducts(json)
    })    //une fois les données du fetch reçues, envoyer vers la fonction AddProduct
    

    function addProducts(donnees){
        
        // const title = document.querySelector('#items');
        // console.log('azazaza/'+id+'/rez');
        // console.log(`azazaza/${id}/rez`);
       
        donnees.map(canap => {
            document.querySelector('#items').innerHTML += `
           <a href="./product.html?id=${canap._id}">
                <article>
                    <h3 class="productName">${canap.name}</h3>
                    <img src="${canap.imageUrl}"/>
                    <p>${canap.description}</p>
                </article>
            </a>`;
        })

        // for (let i = 0;i < donnees.length; i++){
        //     console.log("Kanap number" , i , donnees[i])


           

        //     const items = document.getElementById('items')  //Creation variable de l'ID "items"
        //     const id = donnees[i]._id         //recherche de l'element 0 de l'array
        //     const anchor = document.createElement("a")      //Creation du lien "card"
        //     items.appendChild(anchor)                       //affiliation anchor
        //     anchor.href = "./product.html?id=" + id                    //Liens vers l'objet ciblé
            
                
            
        
    
        //     const article = document.createElement("article")       //creation article
        //     anchor.appendChild(article) 
        //     console.log(article)
    
    
    
        //     const image = document.createElement("img")             //creation /img
        //     article.appendChild(image)
        //     console.log(image)
        //     const imageUrl = donnees[i].imageUrl
        //     const imageAlt = donnees[i].altTxt
        //     image.src = imageUrl
        //     image.alt = imageAlt
    
    
    
            
    
    
        //     const h3 = document.createElement("h3")                     //creation h3
        //     article.appendChild(h3)
        //     console.log(h3)
        //     const name = donnees[i].name
        //     h3.classList.add("productName")
        //     h3.textContent = name
            
    
    
    
        //     const p = document.createElement("p")               //creation p
        //     article.appendChild(p)
        //     console.log(p)
        //     const description = donnees[i].description
        //     p.textContent = description
        // }
        
       

        
    }
    

   
    