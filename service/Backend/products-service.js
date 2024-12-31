const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Activer CORS pour permettre les requêtes cross-origin
app.use(cors());

// Liste des produits
const products = [
  { id: 1, name: "Laptop A", price: 1000 },
  { id: 2, name: "Laptop B", price: 1200 },
  { id: 3, name: "Laptop C", price: 1500 },
];

// Route pour récupérer la liste des produits
app.get("/products", (req, res) => {
  res.json(products);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Product service running on http://localhost:${PORT}`);
});
