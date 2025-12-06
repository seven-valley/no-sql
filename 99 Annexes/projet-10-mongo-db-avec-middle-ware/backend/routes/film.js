const express = require("express");
const router = express.Router();
const filmCtrl = require("../controllers/film");

const auth = require('../middleware/auth');

router.post("/",auth, filmCtrl.createFilm);
router.get("/",auth, filmCtrl.getFilm);
router.delete("/:id",auth, filmCtrl.deleteFilm);
router.put("/:id",auth, filmCtrl.modifyFilm);

module.exports = router;
