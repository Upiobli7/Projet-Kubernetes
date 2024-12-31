const express = require("express");
const app = express();
const PORT = 3002;
const cors = require("cors");

// Activer CORS pour permettre les requêtes cross-origin
app.use(cors());

app.use(express.json());

let orders = [];

app.post("/orders", (req, res) => {
  const { productId } = req.body;
  const newOrder = { id: orders.length + 1, productId };
  orders.push(newOrder);
  res.json(newOrder);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Order service running on http://localhost:${PORT}`);
});

const axios = require('axios'); // Installez Axios avec `npm install axios`

app.post("/orders", async (req, res) => {
    const { productId } = req.body;

    // Vérifier si le produit existe
    try {
        const productResponse = await axios.get(`http://localhost:3001/products`);
        const productExists = productResponse.data.some(product => product.id === productId);

        if (!productExists) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }

        const newOrder = { id: orders.length + 1, productId };
        orders.push(newOrder);
        res.json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la vérification du produit" });
    }
});
