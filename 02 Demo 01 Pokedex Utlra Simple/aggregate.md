# Aggregate

Faire de la data avec de la data. Et vice et versa.

## Le principe

Aggregate fonctionne sur un principe de _steps_. Chaque _step_ ne connait que ce que le _step_ précédent lui a donné.

Dans les steps, le caractère `$` représente l'objet en traitement (un peu comme `this`). Ainsi pour atteindre la propriété "name" de l'objet, on donnera le paramètre "$name".

## Quelques opérateurs

- `$project` fait une projection (fonctionne comme le 2ème paramètre de find)
- `$size` renvoie la taille d'une liste.
- `$unwind` "déroule" une liste, en dupliquant le reste du document au besoin.
  - Ainsi `{name: "Dracaufeu", types: ["Feu", "Vol"]}` devient `[{name: "Dracaufeu", types: "Feu"}, {name:"Dracaufeu", types: "Vol"}]`.
- `$group` est l'équivalent du "GROUP BY" de SQL. C'est un peu comme l'inverse de "unwind", mais on doit définir comment les valeurs sont regroupées (liste, addition/concaténation, moyenne, comptage, ...). A noter que les groupes doivent forcément possèder une propriété "_id", qui sera le discriminant, et qui peut lui aussi être un objet.
- `$sort` fait un tri, de la même manière que la méthode `sort()` dans les requêtes simple.
- `$lookup` permet d'aller chercher une info dans une autre collection (bonjour, associations !)

La (longue) liste complète des opérateurs : https://docs.mongodb.com/manual/reference/operator/aggregation/

## Exemples sur le pokedex

### Classer et compter les pokémons par type

```js
db.pokedex.aggregate([
    {$unwind: "$type"},
    {$project: {
        _id:0,
        name:1,
        type:1
    }},
    {$group: {
        _id: "$type",
        total: {
            $sum:1
        },
        list: {
            $push: "$name"
        }
    }},
    {$sort:{
        total:-1
    }}
]);
```

Explications du pipeline : 
- étape 1, $unwind : on "déroule" la liste "type".
- étape 2, $project : on ne garde que "name" et "type"
- étape 3, $group : on crée des groupes selon le discriminant "type". Chaque groupe possède une propriété "total" (incrémenté de 1 par document dans le groupe), et une propriété "list" (dans laquelle on a "push" le nom de chaque document du groupe - et qui sera donc automatiquement un array)
- étape 4, on tri les groupes par "total" decroissant.

### Classer les pokémons par nombre d'évolutions

```js
db.pokedex.aggregate([
  {$project: {
    _id: 0,
    name: 1,
    nbEvol: {
      $cond: {
        if: {$isArray: ["$next_evolution"] },
        then: {$size: "$next_evolution"},
        else: 0
      }
    }
  }},
  {
    $sort: {nbEvol: -1}
  }
]);
```

Explications : 
- etape 1: projection. On garde "name", et on définit une propriété "nbEvol"
  - on rajoute une condition, si "next_evolution" existe et est un array ($isArray), alors on renvoie la taille de la liste
  - sinon, on renvoie 0
- étape 2 : on trie par "nbEvol" décroissant.

### Grouper les pokemon par tranches de poids

Le traitement est compliqué à cause du fait que les poids sont au format string. On est obligé de commencer par une transformation (on supprime " kg", et on cast en `double` - un nombre à virgule)

```js
db.pokedex.aggregate([
  {
    "$project": {
      _id: 0,
      name: 1,
      poids: {
        $toDouble: {
          $rtrim: {
            input: "$weight",
            chars: " kg"
          }
        }
      }
    } 
  },
  {
    $bucket: {
      groupBy: "$poids",
      boundaries: [0,10,25,50,100,150,200,300,1000],
      default: -1,
      output: {
        total: {$sum: 1},
        list: {$push: "$name"}
      }
    }
  }
]);
```
