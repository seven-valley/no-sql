/*
Démonstration 1

Pour tester, dans le terminal : 

>docker exec -it mongo-pokemon mongosh

>use admin

>db.auth("root", "example")

>use pokemon

>show collections

>db.samples_pokemon.renameCollection("pokedex")

//Utilisez les différentes commandes à la mano

>db.pokedex.find().limit(3).toArray()

*/

print("\n==== TEST MongoDB : POKEDEX ====\n");

print("---- 1. Requêtes simples ----\n");

print("Tous les éléments :");
printjson(db.pokedex.find().limit(3).toArray());

/*print("\nNombre total d'éléments :");
print(db.pokedex.countDocuments());

print("\nRecherche id = 150 :");
printjson(db.pokedex.find({ id: 150 }).toArray());

print("\nAttention aux types ! (id = \"150\") :");
printjson(db.pokedex.find({ id: "150" }).toArray());


print("\n---- 2. Projection ----\n");

print("Projection sur le champ 'name' :");
printjson(db.pokedex.find({}, { name: 1 }).limit(3).toArray());

print("\nProjection avec _id désactivé :");
printjson(db.pokedex.find({}, { name: 1, _id: 0 }).limit(3).toArray());


print("\n---- 3. Valeurs incluses dans array / nested ----\n");

print("Type contient 'Dragon' :");
printjson(db.pokedex.find({ type: "Dragon" }, { name: 1 }).toArray());

print("\nRecherche dans un sous-document d'un array ('prev_evolution.name' = Eevee) :");
printjson(db.pokedex.find({ "prev_evolution.name": "Eevee" }, { name: 1 }).toArray());


print("\n---- 4. Modificateurs ----\n");

print("spawn_chance >= 2 :");
printjson(db.pokedex.find({ spawn_chance: { $gte: 2 } }, { name: 1 }).toArray());

print("\nspawn_chance <= 2 :");
printjson(db.pokedex.find({ spawn_chance: { $lte: 2 } }, { name: 1 }).toArray());

print("\nType parmi ['Dragon', 'Ice'] :");
printjson(db.pokedex.find({ type: { $in: ["Dragon", "Ice"] } }, { name: 1 }).toArray());

print("\nType pas dans ['Water', 'Fire'] :");
printjson(db.pokedex.find({ type: { $nin: ["Water", "Fire"] } }, { name: 1 }).toArray());

print("\nType = Flying ET != Normal :");
printjson(db.pokedex.find({ type: { $eq: "Flying", $ne: "Normal" } }, { name: 1, type: 1 }).toArray());

print("\nRegexp sur le name (/ard/gi) :");
printjson(db.pokedex.find({ name: /ard/i }, { name: 1 }).toArray());


print("\n---- 5. Tri et limite ----\n");

print("Tri simple sur name (asc) :");
printjson(db.pokedex.find({}, { name: 1 }).sort({ name: 1 }).limit(5).toArray());

print("\nTri multiple : type asc, name desc :");
printjson(db.pokedex.find({}, { name: 1, type: 1 }).sort({ type: 1, name: -1 }).limit(5).toArray());

print("\nLimite à 4 résultats :");
printjson(db.pokedex.find().limit(4).toArray());


print("\n---- 6. Insertion ----\n");

print("Insertion d’un document bizarre :");
db.pokedex.insertOne({ nom: "JaiRienAFaireLa" });

print("Résultat de l’insertion :");
printjson(db.pokedex.find({ nom: "JaiRienAFaireLa" }).toArray());


print("\n---- 7. Mise à jour ----\n");

print("updateOne sur nom = 'JaiRienAFaireLa' → ajout champ test='truc' :");
db.pokedex.updateOne(
  { nom: "JaiRienAFaireLa" },
  { $set: { test: "truc" } }
);

print("Document modifié :");
printjson(db.pokedex.find({ nom: "JaiRienAFaireLa" }).toArray());


print("\n---- 8. Suppression ----\n");

db.pokedex.deleteOne({ nom: "JaiRienAFaireLa" });

print("Vérification de la suppression :");
printjson(db.pokedex.find({ nom: "JaiRienAFaireLa" }).toArray());


print("\n==== FIN DES TESTS ====\n");*/
