const db = require("../models");
const Pokemon= db.pokemons;

// Create and Save a new Tutorial
exports.create = (req, res) => {


  // Create Model
  const pokemon = {
    pokemonId: req.body.pokemonId,
    image: req.body.image,
    name: req.body.name,
  };

  // Save Pokemon
  Pokemon.create(pokemon)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all pokemons
exports.findAll = (req, res) => {

    Pokemon.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "You don't have any Pokemon"
        });
      });
  };

// Find Pokemon
exports.findOne = (req, res) => {
    const id = req.params.id
    Pokemon.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({
                    message: `Cannot find Pokemon with id = ${id}.`
                });
            }
        })
        .catch(err =>   
            {
                res.status(500).send({
                    message : `Error retrieving Pokemon with id= ${id}`
                });
            }); 
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pokemon.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pokemon.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pokemon was removed successfully!"
          });
        } else {
          res.send({
            message: `Cannot remove Pokemon with id=${id}. Maybe Pokemon was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not remove Pokemon with id=" + id
        });
      });
  };
