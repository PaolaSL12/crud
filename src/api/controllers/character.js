const Character = require("../models/Character");

const getCharacter = async (req, res, next) => {
 try {
    const allCharacters = await Character.find();
    return res.status(200).JSon(allCharacters)
 } catch (error) {
    return res.status(400).JSon("ha fallado")
 }
}

model.exports = { getCharacter };