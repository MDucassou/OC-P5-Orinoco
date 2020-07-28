function panier() {
    // déclaration de la variable panier qui vaut le contenu du localStorage généré grâce au bouton commande actionné sur les pages produits
    var panier = localStorage.getItem('panier');
    console.log(panier);
    // initialisation du panier comme tableau vide si le localStorage ne contient aucun élément
    if (panier === null){
            panier={produits:[]};
    } else {
        panier = JSON.parse(panier);
    }
    
    return panier;
}

// définition de la fonction ajoutPanier qui ajoute le produit affiché au panier de commande
function ajoutPanier (id, image, nom, prix) {
    panier.produits.push({'id':id, 'image':image, 'nom':nom, 'prix':prix}); 
    localStorage.setItem('panier', JSON.stringify(panier)); 
} 
