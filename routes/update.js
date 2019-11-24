var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//Get who is to be updated
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
		query = "SELECT * FROM Students WHERE surname='" + sn + "' AND firstname='" + fn +"'"; 
		//Get all students
		database.each(query, function(error, rows){
			if(error){
				console.log("ERROR: " + error.message);
				res.render("update", { message : "Error"});
			}else{
				res.render("update", { message : rows});
			}
		})
	});

	//Close the database
	database.close();
});

router.post('/', function(req, res, next){
	//Get submitted details
	var Hsurname = req.body.Hsurname;
	var Hfirstname = req.body.Hfirstname;

	var surname = req.body.surname;
	var firstname = req.body.firstname;
	var middlename = req.body.middlename;
	var sex = req.body.sex;
	var level = req.body.level;
	var department = req.body.department;
	var faculty = req.body.faculty;

	//Connect to database
	var database = new sqlite3.Database("Database", function(error){
		if(error){
			return console.error(error.message);
		}
	});

	//Perform query
	database.serialize(function(){
		//Update the students
		var query = "UPDATE students " +
					"SET surname = ?, firstname = ?, middlename = ?, sex = ?, level = ?, department = ?, faculty = ? " +
					"WHERE surname = ? AND firstname = ?";
		var data = [surname, firstname, middlename, sex, level, department, faculty, Hsurname, Hfirstname];
		database.run(query, data, function(error){
			if(error){
				res.send("Could not update");
			}else{
				res.redirect("viewAll");
			}
		});
	});

	//Close database connection
	database.close();
});

module.exports = router;
