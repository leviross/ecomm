var Journal = require('../models/journal');

exports.CreateEntry = function (req, res) {
    //console.log(req);
    var j = new Journal();
    j.Day = req.body.Day;
    j.Date = req.body.Date;
    j.Entry = req.body.Entry;

    j.save(function (err, product) {
        if (err) {
            console.log("Error saving the new entry:\n", err);
            res.send("Error saving the new entry:\n" + err);
        } else {
            console.log(product);
            res.json(product);
        }

    });

}

exports.GetAllEntries = function(req, res) {

}