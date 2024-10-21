var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next){
    res.send("API is working properly");
});

router.post("/destinations", function (req, res, next){

    const{ street, city, state, zipCode, country } = req.body;
    res.send(state);
});

module.exports = router;