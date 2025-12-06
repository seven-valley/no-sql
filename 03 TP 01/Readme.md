# Exercices MongoDB (mongosh) -- Avec Corrigés

```js
[
  { name: "Bob", age: 22, grade: "B" },
  { name: "Clara", age: 19, grade: "A" },
  { name: "David", age: 23, grade: "C" }
]
```
## Exercice 1 -- Créer une base et une collection

**Objectif :** Créer la base `school` et la collection `students`, puis
insérer 1 document.


------------------------------------------------------------------------

## Exercice 2 -- Insérer plusieurs documents

**Objectif :** Insérer 3 étudiants : Bob, Clara, David.



------------------------------------------------------------------------

## Exercice 3 -- Afficher tous les documents



``` js
db.students.find()
```

------------------------------------------------------------------------

## Exercice 4 -- Filtrer les étudiants de grade A



``` js
db.students.find({ grade: "A" })
```

------------------------------------------------------------------------

## Exercice 5 -- Projection (name et age)


------------------------------------------------------------------------

## Exercice 6 -- Trier par âge



------------------------------------------------------------------------

## Exercice 7 -- Mettre à jour un étudiant





------------------------------------------------------------------------

## Exercice 8 -- Incrémenter une valeur





------------------------------------------------------------------------

## Exercice 9 -- Ajouter une matière (array)





------------------------------------------------------------------------

## Exercice 10 -- Supprimer un document





------------------------------------------------------------------------
