const express = require('express');
const router = express.Router();
const book = require('../models/book_model');


//? joten parametri vapaavalintaine kyllä/ei. Jos ei oo niin pakko antaa id.
router.get('/:id?',
 function(request, response) {
     //jos parametri annettu
  if (request.params.id) {
      //book_modelin getAllId rivi 4
      //getById ei varattuja ovat vapaavalintaisia
    book.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  } else {
    book.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

//kutsutaa bookmodelin addiin rivi 10
router.post('/', 
function(request, response) {
  book.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body); //palautta koko bodyn
    }
  });
});


router.delete('/:id', 
function(request, response) {
  book.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  book.update(request.params.id, request.body, function(err, dbResult) { // jos ei vastaa err muuten dbresultti
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;