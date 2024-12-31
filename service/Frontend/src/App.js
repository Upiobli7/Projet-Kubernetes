document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const orderInfo = document.getElementById("order-info");

  // Fonction pour afficher les produits
  function fetchProducts() {
    productList.innerHTML = ""; // Nettoie la liste avant de charger les produits
    fetch("http://localhost:3001/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        return response.json();
      })
      .then((products) => {
        products.forEach((product) => {
          const productElement = document.createElement("li");
          productElement.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button class="order-button" data-product-id="${product.id}">Commander</button>
          `;
          productList.appendChild(productElement);
        });

        // Ajouter des gestionnaires d'événements pour les boutons "Commander"
        document.querySelectorAll(".order-button").forEach((button) => {
          button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            placeOrder(productId);
          });
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Une erreur est survenue lors du chargement des produits.");
      });
  }

  // Fonction pour passer une commande
  function placeOrder(productId) {
    fetch("http://localhost:3002/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: parseInt(productId, 10) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la création de la commande");
        }
        return response.json();
      })
      .then((order) => {
        alert(`Commande créée avec succès : ID ${order.id}, Produit ${order.productId}`);
        fetchOrders(); // Met à jour la liste des commandes
      })
      .catch((error) => {
        console.error(error);
        alert("Impossible de créer la commande. Veuillez réessayer.");
      });
  }

  // Fonction pour récupérer et afficher les commandes
  function fetchOrders() {
    const orderListDiv = document.getElementById("order-list");
    orderListDiv.innerHTML = ""; // Efface le contenu précédent
    fetch("http://localhost:3002/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des commandes");
        }
        return response.json();
      })
      .then((orders) => {
        orders.forEach((order) => {
          const orderItem = document.createElement("div");
          orderItem.textContent = `Commande ID: ${order.id}, Produit ID: ${order.productId}`;
          orderListDiv.appendChild(orderItem);
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Une erreur est survenue lors du chargement des commandes.");
      });
  }

  // Appel initial pour charger les produits
  fetchProducts();
});
