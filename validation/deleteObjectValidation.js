const validateObjectDelete = async (model, id) => {
    const foundInDataBase = await model.findById(id);
    if (!foundInDataBase) {
        throw new Error("object doesn't exist in database")
    }
    if (foundInDataBase.books.length !== 0) {
        throw new Error(`Can not delete ${foundInDataBase.name} with books in it`);
    }
    return true
}

module.exports={validateObjectDelete}
