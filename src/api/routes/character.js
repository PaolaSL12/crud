// Archivo character.routes.js dentro de la carpeta routes

const Character = require('../models/Character');

const characterRouter = require("express").Router()

characterRouter.get('/', async (req, res, next) => {
	try {
		const characters = await Character.find();
		return res.status(200).json(characters)
	} catch (error) {
		return next(error)
	}
});

characterRouter.get('/alias/:alias', async (req, res) => {
	const {alias} = req.params;

	try {
		const characterByAlias = await Character.find({ alias: alias });
		return res.status(200).json(characterByAlias);
	} catch (err) {
		return res.status(500).json(err);
	}
});


characterRouter.post('/create', async (req, res, next) => {
    try {
      // Crearemos una instancia de character con los datos enviados
      const newCharacter = new Character({
        name: req.body.name,
        age: req.body.age,
        alias: req.body.alias,
        role: req.body.role
      });
  
      // Guardamos el personaje en la DB
      const createdCharacter = await newCharacter.save();
      return res.status(201).json(createdCharacter);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });

  characterRouter.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Character.findByIdAndDelete(id);
        return res.status(200).json('Character deleted!');
    } catch (error) {
        return next(error);
    }
});

characterRouter.put('/edit/:id', async (req, res, next) => {
  try {
      const { id } = req.params //Recuperamos el id de la url
      const characterModify = new Character(req.body) //instanciamos un nuevo Character con la información del body
      characterModify._id = id //añadimos la propiedad _id al personaje creado
      const characterUpdated = await Character.findByIdAndUpdate(id , characterModify)
      return res.status(200).json(characterUpdated)//Este personaje que devolvemos es el anterior a su modificación
  } catch (error) {
      return next(error)
  }
});



module.exports = characterRouter;