var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//Connect to database
	var database = new sqlite3.Database("Database", function(error){
		if(error){
			return console.error(error.message);
		}
	});

	database.serialize(function(){
		//Query statement
		query = "SELECT * FROM Students"; 
		//Get all students
		database.all(query, function(error, rows){
			if(error){
				console.log("ERROR: " + error.message)
				res.render("viewAll", { message : "Error"});
			}else{
				res.render("viewAll", { message : rows});
			}
		})
	});

	//Close the database
	database.close();

  	//res.render("viewAll", { title: "All Students"});
});

module.exports = router;
