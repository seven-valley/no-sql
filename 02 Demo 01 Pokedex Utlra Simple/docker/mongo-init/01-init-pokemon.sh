# Le fichier utilise des fins de ligne UNIX (LF) et non Windows (CRLF)
# Dans VS Code : en bas à droite, clique sur CRLF → choisis LF si tu utilises Windows.

#!/bin/bash
set -e

echo "=== Restauration de la base pokemon à partir de /dump ==="

# On restaure la base "pokemon" à partir des fichiers BSON
mongorestore -d pokemon /dump

echo "=== Restauration terminée, renommage de la collection samples_pokemon -> pokedex ==="

mongosh --eval '
  use pokemon;
  const cols = db.getCollectionNames();
  if (cols.includes("samples_pokemon")) {
    db.samples_pokemon.renameCollection("pokedex");
    print("Collection renommée en pokedex");
  } else {
    print("Collection samples_pokemon introuvable, rien à renommer");
  }
'

echo "=== Initialisation Mongo terminée ==="


