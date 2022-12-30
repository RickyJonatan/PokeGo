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

  function fibonacci(num){
    if( num < 2) {
      return num;
    }
    else{
      return fibonacci(num-2) + fibonacci(num-1);
    }
  }

  function fibonacciWithLooping(num){
  var x=0 ,y=1, temp;
    while(num >=0 ){  //3
        temp  = x;    //0 1 1 2
        x     = x+y;  //1 1 2 3
        y     = temp; //0 1 1 2
        num--;
    }
    return y;
  }

// Update a Pokemon by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    let fibo = 0;
    let poke = '';
    let result = 0;


    Pokemon.findByPk(id).then(
        data =>{
          if(data){
            poke = JSON.stringify(data.name).slice(1, -1);
            console.log("poke:" + poke);
            fibo = parseInt(data.number);
            console.log("counter" + fibo)

            result = fibonacciWithLooping(fibo);
            
            console.log("result fibo:"+ result);
            if (poke.includes("-")) {
              poke = poke.substring(0, poke.indexOf("-"));
            }
            poke = poke.concat('-' + result);
            console.log(poke);
          }
            else{
              res.status(404).send({
                message: `Cannot find Pokemon with id=${id}.`
            });
          }
          let body ={
            name : poke,
            number : data.number + 1
          }
          Pokemon.update(body, {
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Pokemon was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Pokemon with id=${id}. Maybe Pokemon was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Pokemon with id=" + id
              });
            });
      })
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    var randNumber = Math.floor(Math.random()*100);
    var flag = 0;

    console.log(randNumber);
    if(randNumber < 2){
      flag=1;
    }
    else{
      for(i=2 ; i<randNumber / 2 ;i++){
        if(randNumber % i ==0){
          flag = 1;
          break;
        }
      }
    }

    if(flag==0){
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
    }
  };
