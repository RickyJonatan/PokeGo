module.exports = app => {
    const pokemons = require("../controllers/pokemon.controller");
  
    var router = require("express").Router();
  
    // Create a new Pokemon
    router.post("/", pokemons.create);
  
    // Retrieve all Pokemon
    router.get("/", pokemons.findAll);
  
    // Updat ePokemon
    router.put("/:id", pokemons.update);
  
    // Delete Pokemon
    router.delete("/:id", pokemons.delete);

    app.use('/api/poke',router);
  

  };