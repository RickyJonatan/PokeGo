module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
      pokemonId: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER,
        defaultValue: '0'
      }
    });
  
    return Pokemon;
  };