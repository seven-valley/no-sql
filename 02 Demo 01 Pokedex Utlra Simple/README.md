## Lancer avec Docker

1. Installer Docker et Docker Compose.
2. Cloner ce dépôt et se placer à la racine.
3. Vérifier que le dossier `data/` contient :
   - `samples_pokemon.bson`
   - `samples_pokemon.metadata.json`
4. Lancer les services :

```bash
docker compose up -d
```

Ouvrir mongo-express : http://localhost:8081

Utilisateur : admin
Mot de passe : admin

La base pokemon et la collection pokedex sont automatiquement créées et alimentées à partir du dump BSON.