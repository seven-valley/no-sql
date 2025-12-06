/**
* Démonstration 2
* 
* Comment utiliser ce fichier : 
*
* 1. Assurez-vous que MongoDB est en cours d'exécution (docker-compose up -d)
* 3. Exécutez ces commandes :
* > npm init -y
* > npm install express mongodb
* > node server.js
* 
* Allez sur http://localhost:3000/ pour vérifier que le serveur fonctionne.
*
* Allez sur http://localhost:3000/pokemon pour voir les données Pokémon.
*/

// server.js
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

// URL MongoDB (adapter si tes identifiants diffèrent)
const MONGO_URL = "mongodb://root:example@localhost:27017/?authSource=admin";
const DB_NAME = "pokemon";

// Variable pour stocker la DB
let db;

// Connexion à MongoDB
async function startServer() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();

    console.log("✔ Connecté à MongoDB !");
    db = client.db(DB_NAME);

    // Lancer Express
    app.listen(PORT, () => {
      console.log(`🚀 Serveur Express lancé : http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB :", err);
    process.exit(1);
  }
}

// --- ROUTES ---

// 👉 Récupérer tous les Pokémon
app.get("/pokemon", async (req, res) => {
  try {
    const pokedex = await db.collection("pokedex").find().toArray();
    res.json(pokedex);
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des Pokémon" });
  }
});

// 👉 Route simple de test
app.get("/", (req, res) => {
  res.send("API Pokémon opérationnelle !");
});

// Lancer la connexion + serveur
startServer();
