const validator = require('validator');
const Book = require('../models/book');

const validateObjectUpdate = async (model, id, body) => {
    const foundNameInDataBase = await model.findById(id);
    if (!foundNameInDataBase) {
        throw new Error("object doesn't exist in database")
    }
    if(validator.isEmpty(body.name)) {
        throw new Error('name field cannot be empty');
    }
    if(!validator.isLength(body.name, {min:3, max:50})){
        throw new Error('wrong length of name field');
    }
    if (model === Book) {
        if (validator.isEmpty(body.type)) {
            throw new Error('type field cannot be empty')
        }
        if (!validator.isLength(body.type, {min: 3, max: 50})) {
            throw new Error('wrong length of type field');
        }
        const types = ['Kryminał', "Dramat", "Pamiętnik", "Romans",
            "Dla dzieci", "Fantasy", "Horror", "Sci-Fi", "Powieść historyczna",
            "Bibliografia", "Reportaż", "Powieść młodzieżowa", "Poradnik", "Kucharska"];
        const foundType = types.find(type => type === body.type);
        if (!foundType) {
            throw new Error('invalid type');
        }
    }
    return true
}

module.exports={validateObjectUpdate}
