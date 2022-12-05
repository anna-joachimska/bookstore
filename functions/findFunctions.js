const findByName = async (model, dataName) => {
    if (!dataName) {
        return null
    }
    const data = await model.findOne({name:dataName});
    if (!data) {
        return null
    }
    const dataId = data._id
    return dataId
}

module.exports = {findByName}