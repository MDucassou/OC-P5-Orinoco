let ref = document.getElementById ('reference');
let montant = document.getElementById ('montant-commande');

console.log(localStorage);

var total = JSON.parse(localStorage.getItem('total'));

const urlParams = new URLSearchParams(window.location.search);
const order = urlParams.get('order');
console.log(order);


ref.textContent = order;
montant.textContent = total+'€';
