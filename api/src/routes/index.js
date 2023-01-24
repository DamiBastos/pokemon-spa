const { Router } = require('express');
require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getAll = async () => {
    const apiInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=99')
    const mapUrl = await apiInfo.data.results.map(pokemon => {return pokemon.url})
    var pokemones = []
    for (var i = 0; i < mapUrl.length; i++){
      const url = await axios(mapUrl[i])
      pokemones.push({
        id: url.data.id,
        name: url.data.name,
        height: url.data.height,
        weight: url.data.weight,
        hp: url.data.stats.find(e => e.stat.name === 'hp').base_stat,
        attack: url.data.stats.find(e => e.stat.name === 'attack').base_stat,
        defense: url.data.stats.find(e => e.stat.name === 'defense').base_stat,
        speed: url.data.stats.find(e => e.stat.name === 'speed').base_stat,
        types: url.data.types.map(e => e = { name: e.type.name }),
        img: url.data.sprites.other["official-artwork"].front_default,
      })
    }
    return pokemones
};

const getTypes = async () => {
  const infoTotal = await axios.get('https://pokeapi.co/api/v2/type')
  let i = 0
  const info = infoTotal.data.results.map(pokemon => {
      return{
        id: i++,
        name: pokemon.name
      }
      
  }
  )
  return info;
};



const getDbInfo = async () => {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };

  const getAllPokemon = async () => {
    const apiInfo = await getAll();
    const dbInfo = await getDbInfo();
    const totalInfo = dbInfo.concat(apiInfo);
    return totalInfo;
  };
  
  router.get('/pokemons', async (req, res) => {
    const { name } = req.query
    let pokemonTotal = await getAllPokemon();
    console.log(pokemonTotal)
    if (name) {
      let filterName = await pokemonTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
      filterName.length ?
        res.status(200).send(filterName) :
        res.status(400).send("This pokemon doesn't exist");
      // res.status(200).send(pokemonTotal)
    } else {
      res.status(200).send(pokemonTotal)

      // res.status(400).send("This pokemon doesn't exist");
    }
  })

  router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params
    const poke = await getAllPokemon();
    if(poke){
      const pokeId = poke.filter(poke => poke.id == id)
      pokeId.length ? 
      res.status(200).json(pokeId) :
      res.status(400).send("This pokemon doesn't exist");
  } 
  })

  router.get('/types', async (req, res) => {
    const typesTotal = await getTypes();
    if(typesTotal){
        res.status(200).json(typesTotal)
    } else {
        res.status(400).send("This pokemon doesn't exist");
    }
  })

  router.post('/pokemons', async (req, res) => {
    const { name, life, attack, defense, speed, height, weight, image, flagId, types } = req.body;
    const createPoke = await Pokemon.create(
        {
          name, life, attack, defense, speed, height, weight, image, flagId, types
        }
      )
      const newType = await Type.findAll({
        where:{
          name: types
        }
      })
      createPoke.addType(newType);
      res.status(200).send(' Race created successfully ')
  }
);

module.exports = router;