var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//Get who is to be deleted
	var sn = req.query.sn;
	var fn = req.query.fn;
	//Connect to database
	var database = new sqlite3.Database("Database", function(error){
		if(error){
			return console.error(error.message);
		}
	});

	database.serialize(function(){
		//Query statement
		var statement = database.prepare("DELETE FROM students WHERE surname = ? AND firstname = ?"); 
		statement.run(sn, fn);
		statement.finalize(function(error){
			if(error){
				res.send("Error deleting student");
			}else{
				res.redirect("/viewAll");
			}
		});
		
	});

	//Close the database
	database.close();
});

module.exports = router;
