
let tabCommande = document.getElementById ('tabPanier');
let totalCommande = document.getElementById ('total');
let boutonCommande = document.getElementById ('acheter');
var total = 0;
let etatPanier = document.getElementById ('etat-panier');
let viderPanier = document.getElementById ('vider-panier');
var i=0;
let products = [];

        var panier = JSON.parse(localStorage.getItem('panier'));
        if (panier === null){
                panier={produits:[]};
        }
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

        console.log(panier);


        if (panier.produits.length==0){
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


/*var request = new XMLHttpRequest();*/


        boutonCommande.addEventListener('click', function(event){
                let nom = document.getElementById('name').value;
                let prenom = document.getElementById('firstname').value;
                let adresse = document.getElementById('adress').value;
                let ville = document.getElementById('city').value;
                let email = document.getElementById('mail').value;
                
                event.preventDefault();

                var productId=[];
                panier.produits.forEach(function(produit){
                        productId.push(produit.id);
                });
                var data = {contact:{lastName:nom, firstName:prenom, address:adresse, city:ville, email:email}, products:productId};

            //request.open("POST", "http://localhost:3000/api/teddies/order");
            const headers = new Headers();
            headers.append('Content-Type','application/json');

            fetch('http://localhost:3000/api/teddies/order',{method:'POST',body: JSON.stringify(data),headers:headers}).then(response =>{
                    
                return response.json();
            }).then(data =>{
                    window.location='confirmation.html?order='+ data.orderId;
                    console.log(data);
                });
            //request.setRequestHeader("Content-Type", "application/json");
            //request.send(JSON.stringify(data));

            //window.location='confirmation.html';
});

