# Module 14 Configurer le middleware

Nous extrayons le token du header 
Création du répertoire <code>middleware</code>
Création du fichier <code>auths.js</code>
```js
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
```

## J'installe le middleware dans le fichier des routes
```js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const filmCtrl = require('../controllers/film');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;
```