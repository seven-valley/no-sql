# Introduction à MongoDB

## Un poil de vocabulaire

- _Document_ : un enregistrement. Dans une BDD SQL, cela correspondrait plus ou moins à une ligne dans une table.
- _Collection_ : presque équivalent à une table. C'est un ensemble non structuré de documents (c'est-à-dire qu'ils n'ont pas forcément tous le même format).
- _BSON_ : _Binary JSON_. Un format développé par et pour MongoDB, basé sur la notation JSON.

## Lancer votre serveur mongodb

Idéalement avec docker pour vous simplier la vie.
 créer <code>docker-compose.yml</code>
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo_data:/data/db
    networks:
      - mongo_net

  mongosh:
    image: mongo:7
    container_name: mongosh
    depends_on:
      - mongodb
    entrypoint: ["sleep", "infinity"]
    networks:
      - mongo_net

networks:
  mongo_net:

volumes:
  mongo_data:
```
```
docker compose up -d
```

## Lancer le client (CLI) mongosh

Idéalement avec docker pour vous simplier la vie.  
Entrer dans le conteneur mongosh  
```
docker exec -it mongodb bash
```

Lancer mongosh  
```
mongosh "mongodb://root:password@mongodb:27017/?authSource=admin"
```
ou bien
```
mongosh --username=root --password=password
```
## Quelques commandes

- lister les bases existantes : `show dbs`
- sélectionner une base (crée la base à la volée si elle n'existe pas) : `use maBase`
- lister les collections : `show collections`
- quitter la console : `exit` ( ou ctrl+D )

## Pokedex

### Restaurer les données

Depuis le dossier racine de ce repo : 
```
docker cp .\samples_pokemon.bson mongodb:/home/samples_pokemon.bson
```
```
docker exec -it mongodb bash
```

```
mongorestore --username=root --password=password --authenticationDatabase=admin --db samples_pokemon /home/samples_pokemon.bson
```


Pas besoin de créer la base, `mongorestore` va le faire pour nous.

### Analyser les données

1. On se reconnecte : `mongosh`
2. `show dbs` : tiens, pokemon est apparu
3. `use pokemon` pour sélectionner la base
4. `show collections` : une seule collection, "samples_pokemon"
5. c'est nul ce nom de collection ! Allez on la renomme : `db.samples_pokemon.renameCollection("pokedex")`
6. pour effacer une base `db.dropDatabase()`  
     
On remarque que les commandes ressemblent à du JS, comme si les collections étaient des objets. C'est normal, c'est le cas !! Toute la CLI de MongoDB est écrite en Javascript :heart: !!



### Premières requêtes

#### Requetes "valeur exacte"

1. `db.pokedex.find()` : "trouve les éléments de la collection pokedex, sans filtre"
2. `db.pokedex.countDocuments()` : "compte tous les éléments...."
3. `db.pokedex.find({id: 150})` : "trouve les éléments..., dont la propriété `id` est égale à 150"
4. Attention: `db.pokedex.find({id: "150"})`, paf ça renvoie rien !! MongoDB est stricte sur les types de données.
5. Bien sur, c'est combinable : `db.pokedex.find({name:"Mewtwo", id: 150})`. C'est un ET, pas un OU !

#### Projection

Lorsqu'on ne veut que certaines propriétés des documents, on passe un objet en 2ème paramètre de find() :

`db.pokedex.find({}, {name: 1})`

Par défaut, l'id sera toujours inclus. On peut le désactiver :

`db.pokedex.find({}, {name: 1, _id:0})`

#### Valeurs incluses

Quand le document contient un array, on peut tester si l'array en question CONTIENT une valeur :

`db.pokedex.find({type: "Dragon"})`

Quand le document contient un objet, on peut tester les valeurs de cet objet, avec la dot-notation habituelle :

(pas d'exemple direct dans la base)
`db.example.find({objet.value: "valeur"})`

Et le must du must : on peut combiner les deux ! Quand un document contient un array de sous-document, ça fonctionne tout pareil :

`db.pokedex.find({"prev_evolution.name":"Eevee"});`

#### Modificateurs

- plus grand que : `find({"spawn_chance": {$gte: 2}});`
- plus petit que : `find({"spawn_chance": {$lte: 2}});`
- parmi (sert de OU logique!) : `find({"type": {$in: ["Dragon", "Ice"] } }, {name:1});`
- pas dans : `find({"type": {$nin: ["Water", "Fire"] } }, {name:1});`
- "ET" sur même prop : `find({ "type": {$eq:"Flying", $ne:"Normal"} },{name:1,type:1});`
- regexp ! : `find({"name": /ard/gi})`

#### Tri et limite

- tri simple : `db.pokedex.find({}, {name:1}).sort({name:1})` (1 pour ascendant, -1 pour descendant)
- tri à paramètres multiples: `db.pokedex.find().sort({type:1, name:-1})`. L'ordre de priorité est égal à l'ordre de déclaration (ici, "type ascendant" en premier, puis "name descendant" )
- un exemple plus lisible (avec une projection) : `db.pokedex.find({},{name:1, type:1}).sort({type:1, name:-1})`

- limite : `db.pokedex.find().limit(4)`

#### Insertion

`db.pokedex.insert({nom: "JaiRienAFaireLa"})`

On remarque que le nouvel objet n'a aucune propriété en commun avec les autres. Et pourtant, mongo l'a inséré sans broncher dans la collection...

#### Modification

Modifier un seul document :

`db.pokedex.updateOne({nom: "JaiRienAFaireLa"},{"$set": {test: "truc"}});`

L'opérateur "$set" est nécessaire. Il en existe un paquet : https://docs.mongodb.com/manual/reference/operator/update/#id1

Modifier plusieurs document :

`db.collection.updateMany(...)` sur le même format que updateOne

#### Suppression

Supprimer un seul document :

`db.pokedex.deleteOne({nom: "JaiRienAFaireLa"});`

Supprimer plusieurs document : `db.collection.deleteMany(...)`, sur le même format.

## Aggregate

Techniquement parlant, `aggregate` est _juste_ une méthode des collections de mongo.

Mais ses capacités sont tellement gigantesques qu'on parle souvent du _framework_ aggregate.

Direction [le markdown aggregate](./aggregate.md) pour la suite !

Attention, la syntaxe est pour le moins velue (voire piquante!), et difficile à prendre en main, ce qui vaut à aggregate une réputation de "monstre efficace mais indomptable".

## Express

Pour dialoguer avec une base Mongo, 2 solutions :

- Faire des requêtes "à la main" avec le package [mongodb](https://www.npmjs.com/package/mongodb).
- Utiliser un ~ORM~ ODM (D pour Document :wink:) comme [mongoose](https://www.npmjs.com/package/mongoose)
