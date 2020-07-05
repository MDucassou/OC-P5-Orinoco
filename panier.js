
let tabCommande = document.getElementById ('tabPanier');
let totalCommande = document.getElementById ('total');
let boutonCommande = document.getElementById ('acheter');
var total = 0;
let etatPanier = document.getElementById ('etat-panier');
let viderPanier = document.getElementById ('vider-panier');
var i=0;
let products = [];

        var panier = JSON.parse(localStorage.getItem('panier'));
        panier.produits.forEach(function(teddy) {
            var ligne = document.createElement('tr');

            var id = document.createElement('td');
            id.textContent = teddy.id;
            ligne.appendChild (id);

            var preview = new Image();
            var image = document.createElement('td');
            preview.src = teddy.image;
            preview.width = 100;
            preview.height = 70;
            image.appendChild(preview);
            ligne.appendChild(image);

            var nom = document.createElement('td');
            nom.textContent = teddy.nom;
            ligne.appendChild (nom);

            var prix = document.createElement('td');
            prix.textContent = teddy.prix;
            ligne.appendChild (prix);

            tabCommande.appendChild(ligne);

            total += teddy.prix;
            i ++;
            products.push(teddy.id);
        });

        totalCommande.innerText += total;

        console.log(products);

        if (i!=1 && i<2){
                etatPanier.textContent = "Votre panier est vide"
        } else {
                viderPanier.classList.add('next__bouton');
                viderPanier.innerHTML = "Vider le panier";
                viderPanier.addEventListener ('click', function(){
                        localStorage.clear();
                        window.location.reload();
                });
                if (i == 1)
                {
                etatPanier.textContent = "Votre panier contient 1 article";
                } else {
                        etatPanier.textContent = "Votre panier contient " + i+ " articles";
                }
        }

let prenom = document.getElementById ('firstname').value;
let nom = document.getElementById ('name').value;
let adresse = document.getElementById ('adress').value;
let ville = document.getElementById ('city').value;
let email = document.getElementById ('mail').value;



var request = new XMLHttpRequest();

        boutonCommande.addEventListener('click', function(){
            var data = {contact:{nom:'nom', prenom:'prenom', adresse:'adresse', ville:'ville', eamil:'email'}, products:products};
            request.open("POST", "http://localhost:3000/api/teddies/order");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.parse(data));

            window.location='confirmation.html';
});

