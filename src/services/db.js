const mongoose = require("mongoose");
const DB_USER = "caroline";
const DB_PASSWORD = encodeURIComponent("160812");

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apirecipes.yehbs9m.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },

    function(err) {
        if (err) throw err;
        else {
            console.log('sucess connection with db');
        }
    });

module.exports = mongoose;