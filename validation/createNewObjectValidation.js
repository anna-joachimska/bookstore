const validator = require('validator');
const {ValidationError} = require("class-validator");

const validateNewObject = async (body) => {
    if(validator.isEmpty(body.name)) {
        throw new ValidationError('name field cannot be empty');
    }
    if(!validator.isLength(body.name, {min:3, max:50})){
        throw new ValidationError('wrong length of name field');
    }
    if(validator.isEmpty(body.type)) {
        throw new ValidationError('type field cannot be empty')
    }
    if(!validator.isLength(body.type, {min:3, max:50})){
        throw new ValidationError('wrong length of type field');
    }
    const types = ['Kryminał', "Dramat", "Pamiętnik", "Romans",
        "Dla dzieci", "Fantasy", "Horror", "Sci-Fi", "Powieść historyczna",
        "Bibliografia", "Reportaż", "Powieść młodzieżowa", "Poradnik", "Kucharska"];
    const found = types.find(type => type === body.type);
    if(!found){
        throw new ValidationError('invalid type');
    }
    return true
}

module.exports={validateNewObject}
