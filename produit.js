
let detailProduit = document.getElementById ('produitChoisi');
let validation = document.getElementById ('commander');


var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        const teddy = response;

        var pageProduit = document.createElement ('div');
        pageProduit.classList.add('accueil-prev__carte-produit');
        var nomChoisi = document.createElement ('h2');
        nomChoisi.textContent = teddy.name;
        nomChoisi.classList.add('accueil-prev__titre');
        pageProduit.appendChild(nomChoisi);
        var imageChoisi = document.createElement ('img');
        imageChoisi.src = teddy.imageUrl;
        imageChoisi.width = 200;
        imageChoisi.height = 150;
        pageProduit.appendChild(imageChoisi);
        var descriptionChoisi = document.createElement ('p');
        descriptionChoisi.textContent = teddy.description;
        pageProduit.appendChild(descriptionChoisi);
        var priceChoisi = document.createElement ('p');
        priceChoisi.textContent = teddy.price + " €";
        pageProduit.appendChild(priceChoisi);

        /*var couleur = document.createElement ('select');
        var opt = null;
        teddy.colors.forEach(function() {
            opt = couleur.createElement('option'); 
            opt.innerHTML = teddy.colors; 
        } 
        pageProduit.appendChild(couleur);*/

        detailProduit.appendChild(pageProduit);

        validation.addEventListener ('click', function(){
                    localStorage.setItem ('idChoisi', JSON.stringify(teddy.id));
                    window.location='panier.html';
        });
            
  

    }
}
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
request.open("GET", "http://localhost:3000/api/teddies/"+id);
request.send();

