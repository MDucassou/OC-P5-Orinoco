
// déclaration des variables
let formulaire = document.getElementById('saisieFormulaire');
let tabCommande = document.getElementById('tabPanier');
let totalCommande = document.getElementById('total');
let valid = document.getElementById('validation');
var total = 0;
let etatPanier = document.getElementById('etat-panier');
let viderPanier = document.getElementById('vider-panier');
let nextAchat = document.getElementById('continuer-achat');

//variable permettant de connaître le nombre de produits dans le panier
var i = 0;

// déclaration et initialisation du tableau d'id qui sera envoyé au serveur au moment de la commande
let products = [];

// déclaration de la variable panier qui vaut le contenu du localStorage généré grâce au bouton commande actionné sur les pages produits
var panier = panier();

//création du contenu du panier par une boucle passant sur chaque élément du tableau panier.
//Récupération des informations souhaitées qui sont placées dans un tableau affiché dans la page panier.
panier.produits.forEach(function (teddy) {
        var ligne = document.createElement('tr');

        var id = document.createElement('td');
        id.textContent = teddy.id;
        ligne.appendChild(id);

        var preview = new Image();
        var image = document.createElement('td');
        preview.src = teddy.image;
        preview.width = 100;
        preview.height = 70;
        image.appendChild(preview);
        ligne.appendChild(image);

        var nom = document.createElement('td');
        nom.textContent = teddy.nom;
        ligne.appendChild(nom);

        var prix = document.createElement('td');
        prix.textContent = teddy.prix;
        ligne.appendChild(prix);

        tabCommande.appendChild(ligne);

        //incrémentation du prix total du panier en ajoutant le prix du produit
        total += teddy.prix;

        //incrémentation de 1 de l'indice qui permet de connaître le nombre d'articles dans le panier
        i++;

        //ajout de l'id du produit au tableau products qui sera envoyé au serveur au moment de passer la commande
        products.push(teddy.id);
});

totalCommande.innerText += total;
console.log(panier);

// affichage de l'information sur le nombre d'articles contenu dans le panier
// ajout d'un bouton pour vider le panier si celui-ci n'est pas déjà vide
// actions de ce bouton: vider le localStorage (donc le panier) et recharger la page
if (panier.produits.length == 0) {
        etatPanier.textContent = "Votre panier est vide"
} else {
        viderPanier.classList.add('next__bouton');
        viderPanier.innerHTML = "Vider le panier";
        viderPanier.addEventListener('click', function () {
                localStorage.clear();
                window.location.reload();
        });

        nextAchat.classList.add('next__bouton');
        nextAchat.innerHTML = "Continuer les achats";
        nextAchat.addEventListener('click', function () {
                window.location = 'index.html';
        });


        if (i == 1) {
                etatPanier.textContent = "Votre panier contient 1 article";
        } else {
                etatPanier.textContent = "Votre panier contient " + i + " articles";
        }
}


// action à la soumission du formulaire:
// création et remplissage de la variable data qui est envoyée au serveur
// elle contient la donnée contact avec les valeurs des champs du formulaire
// et la donnée products qui est un tableau des id des produits contenus dans le panier
formulaire.addEventListener('submit', function (event) {
        event.preventDefault();

        let nom = document.getElementById('name').value;
        let prenom = document.getElementById('firstname').value;
        let adresse = document.getElementById('adress').value;
        let ville = document.getElementById('city').value;
        let email = document.getElementById('mail').value;

        event.preventDefault();

        var productId = [];
        panier.produits.forEach(function (produit) {
                productId.push(produit.id);
        });
        var data = { contact: { lastName: nom, firstName: prenom, address: adresse, city: ville, email: email }, products: productId };


        console.log(data);
        console.log(total);


        // définition de la requête POST au serveur
        // et des actions: vide le panier (localStorage), met la valeur du montant total du panier dans le localStorage
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/api/teddies/order', { method: 'POST', body: JSON.stringify(data), headers: headers }).then(response => {

                if (response.status === 201) {
                        return response.json();
                }

        }).then(data => {
                localStorage.clear();
                console.log(data.contact);
                console.log(data.orderId);
                localStorage.setItem('total', JSON.stringify(total));
                console.log(total);

                //si le panier est vide la commande n'est pas envoyée au serveur
                if (total == 0) {
                        valid.textContent = "Votre panier est vide, merci d'ajouter un article";
                }

                // si le panier contient au moins un article, la commande peut être envoyée au serveur (si le formulaire est valide)
                if (total != 0) {
                        window.location = 'confirmation.html?order=' + data.orderId;
                }
        })

});



