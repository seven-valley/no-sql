const express = require('express');

const Film = require('../models/Film.js');
exports.createFilm = (req, res, next) => {
    // delete req.body._id;
    console.log(req.body);
     const film = new Film({
       ...req.body
     });
     film.save()
       .then(() => res.status(201).json({ message: 'Film saved !'}))
       .catch(error => res.status(400).json({ error }));
   }


   exports.getFilm =   (req, res, next) => {
    Film.find()
      .then(films => res.status(200).json(films))
      .catch(error => res.status(400).json({ error }));
  }

  exports.deleteFilm =  (req, res, next) => {
    Film.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.modifyFilm =  (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }