
//TODO: ta funkcja jest zbędna, mozna uzyc po prostu Model.findOne tam gdzie trzeba i wziac potem _id
const findByName = async (model, dataName) => {
    console.log(dataName);
    if (!dataName) {
        return null
    }
    const data = await model.findOne({name:dataName});
    if (!data) {
        return null
    }
    return  data._id
}

module.exports = {findByName}