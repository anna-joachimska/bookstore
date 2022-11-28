const findByName = async (model, dataName) => {
    const data = await model.findOne(dataName)
    if (!data) {
        return null
    }
    const dataId = data._id
    return dataId
}

module.exports = {findByName}