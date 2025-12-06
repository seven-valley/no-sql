# Contexte
Vous travaillez sur une application de gestion de parc d’attractions en ligne. Vous devez créer et manipuler une base de données MongoDB pour gérer les informations sur les attractions et les tickets.

# Tâches
- Créer la base de données amusementPark.
- Créer les collections attractions et tickets.
- Insérer les documents suivants dans la collection attractions :
  
Nom : "Roller Coaster", Type : "Thrill Ride", Capacité : 24, Durée (minutes) : 3 
 
Nom : "Ferris Wheel", Type : "Family Ride", Capacité : 60, Durée (minutes) : 10  
  
Nom : "Haunted House", Type : "Dark Ride", Capacité : 15, Durée (minutes) : 5  

- Insérer les documents suivants dans la collection tickets :  
  
attractionId correspondant à "Roller Coaster", userId : "user1", Date de visite : "2024-06-01", Utilisé : false  
  
attractionId correspondant à "Ferris Wheel", userId : "user2", Date de visite : "2024-06-05", Utilisé : true  

## Effectuer les opérations suivantes :

- Récupérer toutes les attractions disponibles dans la collection attractions.
- Récupérer tous les tickets non utilisés (où la propriété utilisé est false).
- Mettre à jour la capacité de l’attraction "Roller Coaster" pour corriger une erreur.
- Marquer le ticket de "user1" comme utilisé.
- Supprimer l’attraction "Haunted House" de la collection attractions.
- Supprimer tous les tickets de user2.
  
Utiliser un opérateur logique pour trouver les attractions avec une capacité inférieure à 20 ou une durée supérieure à 8 minutes.  

Utiliser un opérateur de mise à jour pour augmenter la capacité d’une attraction.  