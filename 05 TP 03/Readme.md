# Exercices MongoDB Avancés -- Avec Corrigés

## Exercice 1 -- Aggregation : Grouper par grade

**Objectif :** Afficher le nombre d'étudiants par grade.





------------------------------------------------------------------------

## Exercice 2 -- Aggregation : Trier et limiter

**Objectif :** Afficher les 2 étudiants les plus âgés.





------------------------------------------------------------------------

## Exercice 3 -- Aggregation : Calculer une moyenne

**Objectif :** Calculer l'âge moyen des étudiants.





------------------------------------------------------------------------

## Exercice 4 -- Lookup (jointure)

**Objectif :** Afficher chaque étudiant avec les cours associés.

### Données :

-   Collection `students`
-   Collection `courses` contenant
    `{ studentName: "...", title: "..." }`





------------------------------------------------------------------------

## Exercice 5 -- Pipeline avec match + group

**Objectif :** Compter seulement les étudiants ayant plus de 20 ans.





------------------------------------------------------------------------

## Exercice 6 -- Mettre à jour plusieurs documents

**Objectif :** Ajouter un champ `active: true` sur tous les étudiants.




------------------------------------------------------------------------

## Exercice 7 -- Supprimer plusieurs documents

**Objectif :** Supprimer tous les étudiants ayant un grade "C".





------------------------------------------------------------------------

## Exercice 8 -- Utiliser `$unwind` pour éclater un tableau

**Objectif :**\
À partir d'un étudiant contenant un tableau
`courses: ["math", "english", "sport"]`,\
afficher un document par cours.




------------------------------------------------------------------------

## Exercice 9 -- Trouver les 3 étudiants les plus jeunes (pipeline)

**Objectif :**\
Utiliser un pipeline avec `$sort` + `$limit`.





------------------------------------------------------------------------

## Exercice 10 -- Pipeline : filtrer → projeter → trier

**Objectif :**\
Afficher seulement `{ name, age }` des étudiants de plus de 21 ans,
triés par age décroissant.





------------------------------------------------------------------------

## Exercice 11 -- Trouver les étudiants sans cours assignés

**Objectif :**\
Sélectionner uniquement ceux où `courses` est vide ou n'existe pas.





------------------------------------------------------------------------

## Exercice 12 -- Trouver les étudiants sans cours assignés

**Objectif :**\
Sélectionner uniquement ceux où `courses` est vide ou n'existe pas.





------------------------------------------------------------------------

## Exercice 13 -- Ajouter plusieurs cours en une fois

**Objectif :**\
Ajouter `["history", "geography"]` dans le tableau courses d'Alice.




------------------------------------------------------------------------

## Exercice 14 -- Compter les étudiants ayant au moins 1 cours

**Objectif :**\
Utiliser `$match` + `$count`.


------------------------------------------------------------------------

## Exercice 15 -- Rechercher des étudiants par plage d'âge

**Objectif :**\
Chercher ceux ayant entre 18 et 25 ans inclus.



------------------------------------------------------------------------

## Exercice 16 -- \$lookup inversé (cours → étudiants)

**Objectif :**\
Afficher pour chaque cours la liste des étudiants inscrits.


------------------------------------------------------------------------


## Exercice 17 -- Nettoyer les documents : supprimer un champ

**Objectif :**\
Supprimer le champ `tempField` sur tous les documents.


------------------------------------------------------------------------

## Exercice 18 -- Pipeline : détecter les valeurs manquantes

**Objectif :**\
Trouver les documents sans champ `email`.


------------------------------------------------------------------------
