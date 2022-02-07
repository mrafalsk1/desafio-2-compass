const mongoose = require("mongoose")
const uri = `mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`

var _db = {}
exports.initDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true
    }).then((res) => {
        console.log(`Mongo connected in ${uri}`);
        _db.db = res
    })
}
exports.database = _db
